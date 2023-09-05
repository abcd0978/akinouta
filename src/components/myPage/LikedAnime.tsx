import { useAtomValue } from 'jotai';
import { fetchAllAnimeMyLikes } from '../../api/likeApi';
import { getAnimeById } from '../../api/laftel';
import * as userStore from '../../store/userStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { AnimeG } from '../../types/anime';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Pagination from '../Pagenation';
import viewDetail from '../../assets/viewdetail.svg';
import useViewport from '../../hooks/useViewPort';
import LikeSvg from '../anime-recommend/LikeSvg';
import LikedSkeleton from './LikedSkeleton';

const itemsPerPage = 9;
const LikedAnime = () => {
  const [page, setPage] = useState<number>(1);
  const { width, height, isMobile, isLoaded } = useViewport();
  const [currentPage, setCurrentPage] = useState(1);
  const [likedAnimeIds, setLikedAnimeIds] = useState<string[]>([]);
  const [animeTitles, setAnimeTitles] = useState<Record<string, AnimeG>>({});
  const [isHovered, setIsHovered] = useState(false);
  const user = useAtomValue(userStore.user);
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: liked,
  } = useQuery(
    ['likedAnime', user?.id],
    async () => {
      if (!user?.id) return [];
      const result = await fetchAllAnimeMyLikes(user.id);
      return result;
    },
    { enabled: !!user?.id },
  );

  useEffect(() => {
    if (liked && liked.length > 0) {
      const fetchAnimeDetails = async () => {
        const animePromises = liked.map((like) => getAnimeById(like.anime_id));

        try {
          const animeDataList = await Promise.all(animePromises);

          const newAnimeTitles: Record<string, AnimeG> = {};
          for (let i = 0; i < liked.length; i++) {
            newAnimeTitles[liked[i].anime_id] = animeDataList[i];
          }

          setAnimeTitles(newAnimeTitles);
        } catch (error) {
          console.error('Error fetching anime details:', error);
        }
      };

      fetchAnimeDetails();
    }
  }, [liked]);
  const skeletonWidth = width > 1200 ? 100 : width > 800 ? 50 : 25;
  if (isLoading) {
    return (
      <div>
        <LikedSkeleton width={skeletonWidth} />
      </div>
    );
  }

  if (isError) {
    return <div>좋아요 목록을 불러오지 못했어요</div>;
  }
  const totalPages = Math.ceil(liked.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAnime = liked.slice(startIndex, endIndex);
  const handlePageChange = (selected: number | string) => {
    if (typeof selected === 'number') {
      setCurrentPage(selected);
    } else if (selected === 'prev') {
      setCurrentPage((current) => Math.max(1, current - 1));
    } else if (selected === 'next') {
      setCurrentPage((current) => Math.min(totalPages, current + 1));
    }
  };
  console.log(animeTitles);
  const likedList = Array.isArray(liked) ? (
    <GridContainer>
      {displayedAnime.map((like, index) => (
        <div key={index}>
          <Liked.Container
            onClick={() => navigate(`/recommend/${like.anime_id}`)}
          >
            <PosterImage
              src={
                animeTitles[like.anime_id] && animeTitles[like.anime_id].images!
                  ? animeTitles[like.anime_id].images!.length > 1
                    ? animeTitles[like.anime_id].images![1].img_url
                    : animeTitles[like.anime_id].images!.length > 0
                    ? animeTitles[like.anime_id].images![0].img_url
                    : animeTitles[like.anime_id]?.img
                  : undefined
              }
            />
            <AnimeTitle>
              {animeTitles[like.anime_id] && animeTitles[like.anime_id].name}
            </AnimeTitle>
            <HoverContent>
              <HoverViewDetail>
                <p>자세히 보기</p>
                <img className="viewDetail" src={viewDetail} alt="viewdetail" />
              </HoverViewDetail>
              <LikedInfoTitle>
                {animeTitles[like.anime_id] && animeTitles[like.anime_id].name}
              </LikedInfoTitle>
              <HoveredAnimeGenre>
                {animeTitles[like.anime_id] &&
                  animeTitles[like.anime_id]?.genres
                    ?.slice(0, 1)
                    .map((genre, index) => (
                      <HoveredAnimeGenreTag key={index}>
                        {genre}
                      </HoveredAnimeGenreTag>
                    ))}
              </HoveredAnimeGenre>
              <LikedAnimeGenre>
                {animeTitles[like.anime_id] &&
                  animeTitles[like.anime_id]?.genres
                    ?.slice(0, 2)
                    .map((genre, index) => (
                      <GenreTag key={index}>#{genre}</GenreTag>
                    ))}
              </LikedAnimeGenre>
            </HoverContent>
          </Liked.Container>
        </div>
      ))}
    </GridContainer>
  ) : (
    '좋아요를 누른 애니메이션이 없어요'
  );
  return (
    <div>
      <DecoTitle>찜한 목록</DecoTitle>
      <div>{likedList}</div>
      <Page $mediawidth={width}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage >= totalPages}
        />
      </Page>
    </div>
  );
};
export default LikedAnime;
const Page = styled.div<{ $mediawidth: number }>`
  height: 10vh;
  ${(props) => `width:${250 * (props.$mediawidth / 1920)}px;`}
  margin-bottom: -100px;
  margin-left: 600px;
`;
const DecoTitle = styled.div`
  position: absolute;
  margin-left: 140px;
  margin-top: -40px;
  width: 200px;
  height: 32px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.36px;
`;
const GridContainer = styled.div`
  display: grid;
  gap: 10px 30px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: -300px;
  margin-left: 150px;
`;
const AnimeTitle = styled.div`
  width: 220px;
  height: 19px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 10px;
`;
const HoverContent = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  margin-left: 110px;
`;
const HoverViewDetail = styled.div`
  visibility: hidden;
  display: flex;
  margin-top: -250px;
  align-items: center;
  position: absolute;
  padding: 6px 12px;
  border-radius: 999px;
  border: none;
  background-color: #8200ff;
  color: white;
  cursor: pointer;
  p {
    margin-left: 12px;
  }
`;
const LikedAnimeGenre = styled.div`
  height: 16px;
  display: flex;
  align-items: flex-start;
  margin-left: -110px;
  margin-bottom: 10px;
  padding: 5px;
  gap: 4px;
`;
const GenreTag = styled.div`
  color: #333;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  padding: 7px;
  border-radius: 3px;
  width: 80px;
  height: auto;
  border-radius: 50px;
  text-align: center;
`;
const HoveredAnimeGenre = styled.div`
  visibility: hidden;
  display: flex;
  align-items: flex-start;
  margin-left: -110px;
  padding: 5px;
  position: absolute;
  top: 0;
  left: 50;
`;
const HoveredAnimeGenreTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 16px;
  background: #f3e7ff;
  padding: 7px;
  border-radius: 3px;
  width: 80px;
  height: auto;
  border-radius: 50px;
  text-align: center;
`;
const PosterImage = styled.img`
  width: 300px;
  height: 175px;
  border-radius: 10px;
`;
const LikedInfoTitle = styled.div`
  visibility: hidden;
  width: 100%;
  color: white;
  height: 100px;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  white-space: normal;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: translate(-45%, -90%);
  overflow: hidden;
`;

const Liked = {
  Poster: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 220px;
    height: 350px;
    cursor: pointer;

    @media (max-width: 540px) {
      width: 100%;
      height: 100%;
    }
  `,

  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 100%;

    cursor: pointer;
    &:hover ${HoverViewDetail} {
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;
    }
    &:hover ${PosterImage} {
      filter: brightness(0.3);
      transition: 0.3s ease-in-out;
    }
    &:hover ${LikedInfoTitle} {
      visibility: visible;
    }
    &:hover ${HoveredAnimeGenre} {
      visibility: visible;
    }
    / @media (max-width: 540px) {
      width: 100%;
      height: 100%;
    }

    @media (max-width: 1600px) {
      /* 화면 크기가 1600px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 1280px) {
      /* 화면 크기가 1280px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 1024px) {
      /* 화면 크기가 1024px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 3개의 컬럼으로 변경 */
    }

    @media (max-width: 800px) {
      /* 화면 크기가 800px 이하인 경우 */
      grid-template-columns: repeat(3, 1fr); /* 2개의 컬럼으로 변경 */
    }

    @media (max-width: 480px) {
      /* 화면 크기가 800px 이하인 경우 */
      grid-template-columns: repeat(1, 1fr); /* 2개의 컬럼으로 변경 */
    }
  `,
};
