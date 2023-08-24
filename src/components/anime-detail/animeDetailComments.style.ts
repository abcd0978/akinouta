import styled from 'styled-components';

export const S = {
  AniCommentContainer: styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  AniCommentBox: styled.div`
    width: 1376px;
    height: 153px;
    border-bottom: 2px solid #d9d9d9;
  `,

  AniCommentUser: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  AniCommentUp: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  `,

  AniProfileImg: styled.img`
    width: 48px;
    height: 48px;
  `,

  AniUserNickname: styled.div`
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.24px;
  `,

  AniCommentText: styled.div`
    width: 1376px;
    height: 48px;
    padding: 0px, 0px, 0px, 60px;
    margin-top: 8px;
    margin-left: 60px;
  `,

  AniCommentInputBox: styled.div`
    width: 1376px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
  `,

  AniCommentInput: styled.input`
    width: 1317px;
    height: 60px;
    padding: 20px;
    border: none;
    outline: none;
  `,
  AniCommentInputButton: styled.button`
    border-radius: 10px;
    background: #757575;
    color: white;
    cursor: pointer;
    width: 70px;
    height: 40px;
    padding: 4px 14px;
    font-size: 15px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    display: flex;
    float: right;
    margin-right: 15px;
    margin-bottom: 12px;
  `,

  AniCommentButton: styled.button`
    width: 64px;
    height: 24px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    margin-right: 5px;
    cursor: pointer;
    background-color: #efefef;

    &:hover {
      background-color: #c2c2c2;
    }
  `,

  AniCommentButtonBox: styled.div`
    float: right;
  `,

  AniEditCommentInput: styled.input`
    width: 1277px;
    height: 25px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    margin: 10px 0px 0px 60px;
  `,

  AniCommentPageBox: styled.div`
    text-align: center;
    margin-top: 20px;
  `,
  CommentSpace: styled.div`
    margin-top: 50px;
  `,
  Outer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  date: styled.div`
    color: #6e6c69;
    font-size: 12px;
  `,
};
