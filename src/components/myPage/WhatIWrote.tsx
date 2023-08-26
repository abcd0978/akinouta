import React, { useEffect, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient'; // Import supabase client
import { deletePost } from '../../api/boardapi';

type ReadMyBoard = Database['public']['Tables']['posts']['Row'];

const userPostsAtom = atom<ReadMyBoard[]>([]);

const WhatIWrote = () => {
  const [userPosts, setUserPosts] = useAtom(userPostsAtom);
  const navigate = useNavigate();
  const user = useAtomValue(userStore.user);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const fetchUserPosts = async () => {
    try {
      if (!user) {
        return;
      }
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('fetchUserPosts에서 에러', error);
      } else {
        console.log('User posts fetched:', data);
        setUserPosts(data);
      }
    } catch (error) {
      console.error('fetchUserPosts 에러', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [setUserPosts, user]);

  const handlePostClick = (id: string) => {
    navigate(`/board/${id}`);
  };

  const handleCheckboxChange = (postId: string) => {
    setSelectedPosts((prevSelected) => {
      if (prevSelected.includes(postId)) {
        return prevSelected.filter((id) => id !== postId);
      } else {
        return [...prevSelected, postId];
      }
    });
  };

  const handleDeleteSelectedPosts = async () => {
    try {
      for (const postId of selectedPosts) {
        await deletePost(postId); // Call the deletePost function
      }

      // 선택 상태 초기화 및 게시물 다시 불러오기
      setSelectedPosts([]);
      fetchUserPosts(); // Corrected function name
    } catch (error) {
      console.error('Error deleting selected posts:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteSelectedPosts}>선택한 게시물 삭제</button>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <input
              type="checkbox"
              checked={selectedPosts.includes(post.id?.toString() ?? '')}
              onChange={() => handleCheckboxChange(post.id?.toString() ?? '')}
            />
            <div>카테고리: {post.category}</div>
            <h3 onClick={() => handlePostClick(post.id?.toString() ?? '')}>
              {' '}
              제목: {post.title}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatIWrote;
