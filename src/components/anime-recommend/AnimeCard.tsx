import React from 'react';
import { S } from './styled.AnimeCard';
import { HoverInfo } from './styled.AnimeCard';
import { AnimeG } from '../../types/anime';
import { useNavigate } from 'react-router-dom';

import LikeSvg from './LikeSvg';
import { ReactComponent as ViewDetail } from '../../assets/viewdetail.svg';
import { ReactComponent as Review } from '../../assets/review.svg';
interface Props {
  anime: AnimeG;
  likesCount: (animeId: string) => number;
  commentsCount: (animeId: string) => number;
  isLike: (animeId: string) => boolean;
  handleLike: (animeId: string) => void;
}

const AnimeCard = ({
  anime,
  likesCount,
  commentsCount,
  isLike,
  handleLike,
}: Props) => {
  const navigate = useNavigate();

  return (
    <S.CardDiv>
      <S.CardInfo onClick={() => navigate(`/recommend/${anime.id}`)}>
        <S.HoverDiv>
          <S.CardThumbnail
            src={
              anime.images?.length !== 0 ? anime.images![0].img_url : anime.img
            }
            alt={anime.name}
          />
          <HoverInfo>
            <S.HoverGenre key={anime.id}>
              <S.GenreText>{anime.genres![0]}</S.GenreText>
            </S.HoverGenre>
            <S.HoverTitleAndDetail>
              <S.HoverTitle>{anime.name}</S.HoverTitle>
              <S.HoverViewDetail>
                <p>자세히 보기</p>
                <ViewDetail />
              </S.HoverViewDetail>
            </S.HoverTitleAndDetail>

            <S.HoverLikeBox>
              <S.HoverCountDisplay>
                <LikeSvg
                  onClick={() => handleLike(String(anime.id))}
                  is_like={isLike(String(anime.id))}
                />
                {likesCount(String(anime.id))}
              </S.HoverCountDisplay>
              <S.HoverCountDisplay>
                <Review />
                {commentsCount(String(anime.id))}
              </S.HoverCountDisplay>
            </S.HoverLikeBox>
          </HoverInfo>
        </S.HoverDiv>
      </S.CardInfo>
      <S.AnimeInfo>
        <S.CardTitle>{anime.name}</S.CardTitle>
        <S.CardGenres>
          {anime.genres?.slice(0, 2).map((genre, index) => {
            return (
              <S.Genre key={index}>
                <S.GenreText># {genre}</S.GenreText>
              </S.Genre>
            );
          })}
        </S.CardGenres>
      </S.AnimeInfo>
    </S.CardDiv>
  );
};

export default AnimeCard;
