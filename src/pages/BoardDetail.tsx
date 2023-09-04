import React, { useEffect, useMemo } from 'react';
import Comments from '../components/Board/Comments';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Database } from '../types/supabase';
import EditorComponent from '../components/editor/EditorComponent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deletePost,
  updatePost,
  getPost,
  getLikesForPost,
  createLike,
  deleteLike,
  getLikeForPost,
} from '../api/boardapi';
import { useState } from 'react';
import { S } from '../pages/BoardDetail.style';
import * as userStore from '../store/userStore';
import filledLike from '../assets/filledLike.svg';
import borderLike from '../assets/borderLike.svg';
import { toast } from 'react-toastify';
import pencil from '../assets/pencil.svg';
import search from '../assets/search.svg';
import ProfileWithBorder, {
  processItem,
} from '../components/ProfileWithBorder';

import type { PostType, UpdatePost, Like } from '../types/post';

const BoardDetail = () => {
  const user = useAtomValue(userStore.user);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 수정 여부 및 수정 입력값 받기
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('');
  const [existingLike, setExistingLike] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleWriteClick = () => {
    if (!user) {
      toast.warning('로그인 후에 작성할 수 있습니다! 로그인 해주세요😳', {
        autoClose: 1000,
      });
    } else {
      navigate('/board/write');
    }
  };

  const handleAllClick = () => {
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/board/${postId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSelectedCategory(null);
    queryClient.invalidateQueries(['post', null, searchKeyword]);
  };

  // Post id 가져오기
  const { post_id } = useParams<{ post_id: string }>();

  // Likes 상태 추가
  const [likes, setLikes] = useState<Like[]>([]);

  const postQueryOptions = {
    queryKey: ['post'],
    queryFn: () => getPost(post_id!),
    refetchOnFocus: false,
  };
  // Post 상세조회
  const { data: post, refetch: refetchPost } = useQuery(postQueryOptions);

  useEffect(() => {
    if (post) {
      // 해당 게시물의 카테고리에 따라 선택한 카테고리 업데이트
      setSelectedCategory(post.category);
    }
  }, [post]);

  //전에 좋아요를 눌렀는지 확인
  const { data: like } = useQuery(
    ['like', user],
    () => getLikeForPost({ post_id, user_id: user?.id }),
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    },
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (post && !isEdit) {
      // 수정 중이 아닐 때만 게시물 정보 업데이트
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      setEditCategory(post.category);
    }
  }, [isEdit, post]);

  // Post 삭제
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });

  const deleteButton = async (id: string) => {
    // 삭제 확인
    const confirm = window.confirm('게시물을 삭제하시겠습니까?!');

    if (confirm) {
      try {
        // DB에서 게시물 삭제
        await deleteMutation.mutateAsync(id);

        // 페이지 이동
        toast.warning('삭제되었습니다!', {
          autoClose: 1000,
        });
        navigate('/board');
      } catch (error) {
        console.error('게시물 삭제 중 오류 발생:', error);
      }
    }
  };

  // Post 수정
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      refetchPost();
      setIsEdit(false);
    },
  });

  const editButton = (post: UpdatePost) => {
    if (!isEdit) {
      setTitle(post.title);
      setContent(post.content);
      setEditCategory(post.category || '');
    } else {
      const editPost = {
        ...post,
        title,
        content,
        category: editCategory,
      };
      updateMutation.mutate(editPost);
    }
    setIsEdit(!isEdit);
  };

  const insertLikeMutation = useMutation(createLike, {
    onSuccess: () => queryClient.invalidateQueries(['like']),
  });

  const deleteLikeMutation = useMutation(deleteLike, {
    onSuccess: () => queryClient.invalidateQueries(['like']),
  });

  //좋아요
  const toggleLike = async () => {
    if (!user) {
      toast.warning('로그인이 필요한 서비스입니다😳', {
        autoClose: 1000,
      });
      return;
    }

    // mutation 추가
    if (like?.length !== 0) {
      if (!like) {
        return;
      }
      deleteLikeMutation.mutate(like[0].id);
    } else {
      insertLikeMutation.mutate({ post_id: post_id!, user_id: user.id });
    }

    // 좋아요 정보 업데이트
    if (post) {
      const updatedLikes = await getLikesForPost(post.id!);
      setLikes(updatedLikes as Like[]);
    }

    // 새로운 게시물 정보를 불러와 업데이트
    const updatedPost = await getPost(post_id!);
    queryClient.setQueryData(['post', post_id], updatedPost);
    // setExistingLike(!existingLike);
    refetchPost();
    queryClient.invalidateQueries(['like']);
  };

  const handleListClick = () => {
    navigate('/board'); // '/board'
  };

  //칭호 가져오기
  const getUserTitle = (user: any) => {
    if (user.inventory && user.inventory?.length > 0) {
      const titleItem = user.inventory[0];

      if (titleItem.items && titleItem.items.name) {
        return titleItem.items.name;
      }
    }
    //없으면
    return '칭호없음';
  };

  return (
    // <S.Layout>
    <>
      <S.TopTitle>게시판</S.TopTitle>

      <S.Post>
        {!isEdit && (
          <>
            <S.Search>
              <S.CateButton
                onClick={() => handleCategoryClick('애니')}
                style={{
                  backgroundColor:
                    selectedCategory === '애니' ? '#FF96DB' : '#FFEBF7',
                  color: selectedCategory === '애니' ? '#ffffff' : 'black',
                }}
              >
                애니
              </S.CateButton>
              <S.CateButton
                onClick={() => handleCategoryClick('자유')}
                style={{
                  backgroundColor:
                    selectedCategory === '자유' ? '#FF96DB' : '#FFEBF7',
                  color: selectedCategory === '자유' ? '#ffffff' : 'black',
                }}
              >
                자유
              </S.CateButton>
              <S.CateButton
                onClick={() => handleCategoryClick('오류 신고')}
                style={{
                  backgroundColor:
                    selectedCategory === '오류 신고' ? '#FF96DB' : '#FFEBF7',
                  color: selectedCategory === '오류 신고' ? '#ffffff' : 'black',
                }}
              >
                오류 신고
              </S.CateButton>
            </S.Search>
            <S.Write>
              <S.WriteButton onClick={handleWriteClick}>
                <img src={pencil} /> 작성하기
              </S.WriteButton>
            </S.Write>
          </>
        )}
      </S.Post>

      <S.Container>
        <S.Inner>
          {post ? (
            <>
              {user?.id === post.user_id && (
                <S.ButtonContainer>
                  <S.Button
                    onClick={() => {
                      if (isEdit) {
                        editButton(post);
                      } else {
                        deleteButton(post.id!);
                      }
                    }}
                    style={{
                      backgroundColor: isEdit ? '#dddddd' : '#dddddd',
                      color: isEdit ? 'black' : 'black',
                    }}
                  >
                    {isEdit ? '취소' : '삭제'}
                  </S.Button>
                  <S.Button
                    onClick={() => editButton(post)}
                    style={{
                      backgroundColor: isEdit ? '#8200FF' : '#dddddd',
                      color: isEdit ? 'white' : 'black',
                    }}
                  >
                    {isEdit ? '저장' : '수정'}
                  </S.Button>
                </S.ButtonContainer>
              )}

              <S.PostContainer key={post.id}>
                {isEdit ? (
                  <S.Box>
                    <S.Select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      <option value="애니">애니</option>
                      <option value="자유">자유</option>
                      <option value="오류 신고">오류 신고</option>
                    </S.Select>
                  </S.Box>
                ) : (
                  <S.Category></S.Category>
                )}
                {isEdit ? (
                  <S.Box>
                    <S.Input value={title} onChange={onChangeTitle} />
                  </S.Box>
                ) : (
                  // <S.Box>
                  <>
                    <S.Top>
                      <S.Title>{title}</S.Title>
                      <S.Date>
                        {new Date(post.created_at).toLocaleString()}
                      </S.Date>
                    </S.Top>

                    <S.User>
                      <S.ImgProfile
                        src={post.users?.profile_img_url}
                        alt="프로필 이미지"
                      />
                      <S.UserInfo>
                        <S.Nickname>{post.users?.nickname}</S.Nickname>

                        <S.Award>{getUserTitle(post.users)}</S.Award>
                      </S.UserInfo>
                      <S.Like onClick={toggleLike}>
                        {like?.length ? (
                          <S.Img src={filledLike} alt="좋아요" />
                        ) : (
                          <S.Img src={borderLike} alt="좋아요 취소" />
                        )}
                      </S.Like>
                    </S.User>

                    {/* </S.Box> */}
                  </>
                )}

                <S.Line></S.Line>
                {isEdit ? (
                  <S.Box>
                    <EditorComponent value={content} onChange={setContent} />
                  </S.Box>
                ) : (
                  <S.Content
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></S.Content>
                )}
              </S.PostContainer>

              <S.Comment>{!isEdit && <Comments />}</S.Comment>
              <S.ListButton onClick={handleListClick}>목록</S.ListButton>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </S.Inner>
      </S.Container>
      {/* </S.Layout> */}
    </>
  );
};

export default BoardDetail;
