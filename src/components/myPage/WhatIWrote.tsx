import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { atom, useAtom, useAtomValue } from 'jotai';
import { Database } from '../../types/supabase';
import * as userStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
type ReadMyBoard = Database['public']['Tables']['posts']['Row'];

const userPostsAtom = atom<ReadMyBoard[]>([]);

const WhatIWrote = () => {
  const [userPosts, setUserPosts] = useAtom(userPostsAtom); //1. 빈배열로 초기화 되어 있음
  const navigate = useNavigate();
  const user = useAtomValue(userStore.user);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!user) {
          return;
        }
        console.log('Fetching user posts for user ID:', user.id);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('fetshUserPosts에서 에러', error);
        } else {
          console.log('User posts fetched:', data);
          setUserPosts(data); // 데이터를 받아온 후에 상태 업데이트
          console.log('데이터가 업데이트 된 후에 로그 출력.', userPosts);
        }
      } catch (error) {
        console.error('fetchUserPosts 에러', error);
      }
    };

    fetchUserPosts().then(() => {
      console.log('검사합니다.', userPosts);
    });
  }, [setUserPosts, user]);
  const handlePostClick = (id: string) => {
    navigate(`/board/${id}`);
  };
  return (
    <div>
      <ul>
        {userPosts.map(
          (
            posts, //3. userPosts배열이 아직 업로드 되지 않아서 빈배열을 가지고 매핑중임
          ) => (
            <li
              key={posts.id}
              onClick={() => posts.id && handlePostClick(posts.id.toString())}
            >
              <div>카테고리:{posts.category}</div>
              <h3>제목:{posts.title}</h3>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default WhatIWrote;
