import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';
import { useDropzone, Accept, FileRejection } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../../types/supabase';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useParams } from 'react-router';
import * as userStore from '../../store/userStore';

//1. supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;
const bucketName = 'Profile_Images';
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('supabase의 환경변수가 없습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
//2
type ChangeMyProfile = Database['public']['Tables']['users']['Row'];
const usersAtom = atom<ChangeMyProfile[]>([]);

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<string>('');
  const [userProfile, setUserProfile] = useAtom(usersAtom);
  const user = useAtomValue(userStore.user);
  //const { user_id } = useParams() as { user_id: string };
  useEffect(() => {
    const updateUserImage = async () => {
      try {
        if (!user) {
          return;
        }
        console.log('Updating user images for user ID:', user.id);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('updateUserImage에서 에러', error);
        } else {
          console.log('User image Updated:', data);
          setUserProfile(data); // 데이터를 받아온 후에 상태 업데이트
          console.log('데이터가 업데이트 된 후에 로그 출력.', user);
        }
      } catch (error) {
        console.error('fetchUserPosts 에러', error);
      }
    };

    updateUserImage().then(() => {
      console.log('검사합니다.', userProfile);
    });
  }, [setUserProfile, user]);

  //3. drop-zone
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  //4. 사진 업로드
  const handleUpload = async () => {
    console.log('handleUpload started');
    if (!selectedFile) {
      console.log('No selected file');
      return;
    }

    // 4-1. 사진UUID생성
    const fileExtension = selectedFile.name.split('.').pop(); //파일확장자추출
    const newFileName = `${uuidv4()}.${fileExtension}`;
    const profileFilePath = `${newFileName}`;
    const profileImageUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${profileFilePath}?token=${supabaseAnonKey}
`;

    https: console.log(selectedFile);

    try {
      const { data, error: uploadError } = await supabase.storage
        .from('Profile Images')
        .upload(profileImageUrl, selectedFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return;
      }
      console.log('User ID:', user?.id);

      console.log('File uploaded successfully!'); //여기까지만 콘솔에 찍힘

      //사용자 프로필 이미지 업데이트
      const { data: userData, error: userUpdateError } = await supabase
        .from('users')
        .update({ profile_img_url: profileImageUrl }) // 업데이트 쿼리
        .eq('id', user?.id);

      if (userUpdateError) {
        console.error(userUpdateError);

        //1.profileFilePath변수 확인 2. user.id확인
        return;
      }

      console.log('User profile updated successfully!!!!');
    } catch (error) {
      console.error(error);
    }
  };

  //(번외)드롭존
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' as unknown as Accept,
    multiple: false,
  });

  const renderContent = () => {
    return (
      <Container>
        <Item>
          <Label>사진</Label>
          {user && editMode === 'photo' ? ( // null 체크 추가
            <>
              <div {...getRootProps()}>
                <Item>
                  {/* 프로필 이미지를 표시하는 부분 */}
                  <img
                    src={user.profile_img_url || '기본 이미지 URL'}
                    alt="프로필 이미지"
                    style={{ width: '100px', height: '100px' }}
                  />
                </Item>
              </div>
              <Input
                type="file"
                onChange={(event) => {
                  if (event.target.files) {
                    setSelectedFile(event.target.files[0]);
                  }
                }}
              />
              <Button onClick={() => setEditMode('')}>취소</Button>
              <Button
                onClick={() => {
                  handleUpload();
                  setEditMode('');
                }}
              >
                완료
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode('photo')}>변경</Button>
          )}
        </Item>

        {/* 여기에 이메일이랑 비번 변경 들어감 */}
      </Container>
    );
  };

  return <div>{renderContent()}</div>;
};

export default EditProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
`;

const Button = styled.button`
  padding: 8px;
  border-radius: 4px;
  border: none;
`;
