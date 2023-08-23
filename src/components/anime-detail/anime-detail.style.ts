import styled from "styled-components";

export const S = {
  DetailContainer: styled.div`
    margin-top: 20px;
  `,

  ContentsContainer: styled.div`
    display: flex;
    gap: 146px;
    @media screen and (max-width: 1219px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,

  ContentsImg: styled.div`
    img {
      width: 464px;
      height: 662px;
    }
  `,

  ContentsText: styled.p`
    line-height: 25px;
    margin-top: 20px;
  `,

  ContentsStar: styled.label`
    font-size: 20px;
    font-weight: 700;
    line-height: 150%; /* 30px */
  `,

  StarBox: styled.div`
    margin-top: 40px;
  `,

  ContentVideoLayout: styled.div`
    text-align: center;
    align-items: center;
  `,

  AniLabel: styled.p`
    font-weight: 700;
    font-size: 44px;
    line-height: 52.8px;
  `,

  DetailLabel: styled.p`
    font-weight: 700;
    font-size: 24px;
    margin-top: 100px;
    @media screen and (max-width: 1295px) {
      line-height: 32px;
    }
  `,

  AniDetailTagBox: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1126px;
    gap: 5px;
    row-gap: 15px;
    margin: 10px 0px;
  `,

  AniDetailTag: styled.div`
    height: 26px;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
    background-color: #efefef;
    display: inline-flex;
    border-radius: 2px;
    font-size: 12px;
    padding: 4px 12px;
  `,
};

//반응형예시
// @media screen and (max-width: 600px) {
//   flex-direction: column;
//   align-items: flex-end;
// }
