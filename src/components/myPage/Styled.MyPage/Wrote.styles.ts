import styled, { CSSProp } from 'styled-components';

export const R = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: -220%;
    margin-left: 110%;
    @media (max-width: 2300px) {
      margin-top: -200%;
    }
    @media (max-width: 2000px) {
      margin-top: -220%;
    }
    @media (max-width: 1500px) {
      margin-top: -230%;
    }
    @media (max-width: 1300px) {
      margin-top: -240%;
    }
    @media (max-width: 1200px) {
      margin-top: -250%;
    }
    @media (max-width: 900px) {
      margin-top: -280%;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-contents: center;
      margin-top: -20px;
      height: auto;
      width: 100%;

      margin-left: 0px;
    }
  `,

  Title: styled.div`
    width: 200px;
    height: auto;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    @media (max-width: 768px) {
      font-size: 16px;
      margin-left: 10px;
      margin-top: -10px;
    }
  `,
  Outer: styled.div`
    list-style-type: none;
    width: 900px;
    height: 132px;
    @media (max-width: 768px) {
      height: 132px;
      width: auto;
      margin-top: -20px;
    }
  `,

  Top: styled.div`
    display: flex;
    justify-content: space-between;
    width: 900px;
    height: 100px;
    @media (max-width: 768px) {
      width: 500px;
      height: 100px;
      max-width: auto;
      margin-top: 20px;
      justify-content: flex-start;
    }
  `,
  Content: styled.div`
    display: grid;
    flex-direction: column;
  `,
  TitleAndDate: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ReviewTitle: styled.div`
    min-width: auto;
    min-height: auto;
    align-items: center;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 16px;
    flex-grow: 1;
    white-space: nowrap;
    @media (max-width: 768px) {
      font-style: normal;
      font-weight: 700;
      line-height: 150%;
      font-size: 13px;

      letter-spacing: -0.195px;
    }
  `,
  Date: styled.div`
    color: #999;
    width: auto;
    font-size: 13px;
    font-style: normal;
    letter-spacing: -0.195px;
    right: 12%;
    @media (max-width: 1728px) {
      right: 8%;
    }
    @media (max-width: 1500px) {
      right: 5%;
    }
    @media (max-width: 768px) {
      display: flex;
      transform: translateX(-160px);
    }
  `,
  Comments: styled.div`
    max-width: 100%;
    min-height: 48px;
    line-height: 24px;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    max-height: calc(1.5em * 2);
    overflow-y: auto;

    text-overflow: ellipsis;
    @media (max-width: 768px) {
      width: 60%;
      max-height: calc(1.5em * 2);
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 19.5px */
      letter-spacing: -0.195px;
    }
  `,

  ButtonArray: styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      display: flex;
    }
  `,
  GoButton: styled.button`
    border-radius: 6px;
    border: 1px solid var(--achromatic-colors-midgray-2, #dbdbdb);
    color: black;
    background-color: white;

    width: 78px;
    height: 28px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    @media (max-width: 768px) {
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 18px */
      letter-spacing: -0.18px;
      font-size: 12px;

      width: 25%;
      height: 24px;
    }
  `,
  Button: styled.button`
    border-radius: 6px;
    border: 1px solid var(--main-mid-2, #c88fff);
    background: #fdfbff;
    width: 64px;
    height: 28px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background-color: #c88fff;
      color: white;
    }

    @media (max-width: 768px) {
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      letter-spacing: -0.18px;
      left: -20px;

      width: 48px;
      font-size: 13px;
      height: 24px;
    }
  `,
  ButtonIcon: styled.img`
    width: 12px;
    height: 12px;
    color: white;
  `,
  Page: styled.div`
    position: absolute;
    display: flex;
    justify-content: flex-end;
    left: 50%;
    @media (max-width: 768px) {
      left: 40%;
    }
    @media (max-width: 480px) {
      left: 25%;
    }
    @media (max-width: 400px) {
    }
  `,
  NoContainer: styled.div`
    display: grid;
    align-items: center;

    justify-content: center;

    transform: translate(700px, -500px);

    @media (max-width: 768px) {
    }
    @media (max-width: 480px) {
      transform: translate(-10px, 100px);
    }

    @media (max-width: 400px) {
      transform: translate(-10px, 100px);
    }
    @media (max-width: 380px) {
      transform: translate(-10px, 100px);
    }
    @media (max-width: 360px) {
    }
  `,
  NoMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,
  GoWriteReview: styled.button`
    background-color: #8200ff;
    color: #fff;
    width: 226.5px;
    height: 48px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
    border-color: transparent;
  `,
};

export const P = {
  Container: styled.div`
    @media (max-width: 2400px) {
      margin-top: -220%;
      margin-left: 110%;
    }
    @media (max-width: 1728px) {
      margin-top: -220%;
      margin-left: 110%;
    }
    @media (max-width: 1600px) {
      margin-top: -250%;
      margin-left: 110%;
    }
    @media (max-width: 1100px) {
      margin-top: -270%;
      margin-left: 110%;
    }
    @media (max-width: 900px) {
      margin-top: -290%;
      margin-left: 110%;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-contents: center;
      margin-left: 10px;
      margin-top: -20px;
    }
  `,
  Title: styled.div`
    width: 200px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    display: block;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  `,
  PostsContainer: styled.div``,

  WriteP: styled.div`
    position: absolute;
    justify-content: center;
    margin-left: 20vw;
    @media (max-width: 768px) {
      position: relative;
      display: flex;
      justify-content: center;
      margin-left: 0vw;
    }
  `,
  NoContainer: styled.div`
    display: grid;
    align-items: center;

    justify-content: center;

    transform: translate(700px, -500px);

    @media (max-width: 768px) {
    }
    @media (max-width: 480px) {
      transform: translate(-10px, 100px);
    }

    @media (max-width: 400px) {
      transform: translate(-10px, 100px);
    }
    @media (max-width: 380px) {
      transform: translate(-10px, 100px);
    }
    @media (max-width: 360px) {
    }
  `,
  NoButton: styled.button`
    background-color: #8200ff;
    border-color: transparent;

    color: #fff;
    width: 226.5px;
    height: 48px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
  `,
  NoMessage: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  `,
  PickButton: styled.button`
    padding: 8px;
    display: flex;
    align-items: center;
    margin: 2px;
    border: 1px solid #c88fff;
    border-radius: 6px;
    background-color: #8200ff;
    width: 112px;
    height: 32px;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    color: var(--achromatic-colors-white, #fff);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.225px;
    @media (max-width: 768px) {
      width: auto;
      height: 30px;
      padding: 4px 
      border-radius: 6px;
      font-size: 13px;
    }
  `,
  PickButtonAll: styled.button`
    padding: 8px;
    display: flex;
    border-radius: 6px;
    border: 1px solid var(--main-mid-2, #c88fff);
    background: var(--main-light, #fdfbff);
    border-radius: 6px;
    align-items: center;

    color: white;
    width: auto;
    height: 32px;
    text-align: center;
    float: right;
    cursor: pointer;
    color: var(--achromatic-colors-darkgray, #4f4f4f);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.225px;
    justify-content: center;
    @media (max-width: 768px) {
      width: auto;
      height: 30px;
      padding: 4px 
      border-radius: 6px;
      font-size: 13px;
    }
  `,
  PickButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 5px);
    margin-top: 12px;
  `,

  Category: styled.div`
    width: auto;
    height: 35px;
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 8px;
    background: #d9d9d9;
    align-items: center;
    display: flex;
  `,
  Date: styled.div`
    font-size: 14px;
    color: #757575;
    float: right;
    display: flex;
    margin-left: auto;
    @media (max-width: 768px) {
    }
  `,
  PostTitle: styled.div`
    min-width: 780px;
    min-height: 40px;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    @media (max-width: 768px) {
    }
  `,
  TitleAndThumbnail: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
  `,
  Box: styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
  `,
  TitleText: styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 130px;
    white-space: nowrap;
    font-size: 13px;
    gap: 10px;
  `,
  Input: styled.input`
    min-width: 24px;
    height: 24px;
    cursor: pointer;
  `,
  Content: styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: row;
    height: 35px;
  `,
  line: styled.div`
    border-bottom: 1px solid #ccc;
    width: 900px;
    height: 56px;
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
    margin-bottom: -7px;
    gap: 16px;
  `,
  Button: styled.button`
    padding: 8px;
    margin: 2px;
    border: 1px solid #c88fff;
    border-radius: 12px;
    background-color: white;
    width: auto;
    height: 30px;
    text-align: center;
    cursor: pointer;
  `,
  ButtonAll: styled.button`
    padding: 8px;
    border: 1px solid #c88fff;
    border-radius: 12px;
    background-color: #8200ff;
    color: white;
    width: auto;
    height: 30px;
    text-align: center;
    float: right;
    cursor: pointer;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-self: stretch;
  `,
};

interface StyledPostCategoryProps {
  category: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  css?: CSSProp;
}

export const StyledPostCategory = styled.span<StyledPostCategoryProps>`
  display: inline-block;
  min-width: 84px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  margin-top: 4px;
  margin-left: 3px;
  margin-right: 7px;
  ${(props) => {
    if (props.category === '애니')
      return `background-color: #C88FFF; color: white; border-radius:10px;`;
    if (props.category === '오류 신고')
      return `background-color: #FF535D; color: white; border-radius:10px;`;
    if (props.category === '자유')
      return `background-color: #FF96DB; color: white; border-radius:10px;`;
    return `background-color: inherit; color: inherit;`;
  }};
  @media (max-width: 768px) {
    font-size: 12px;
    min-width: 48px;
    height: 24px;
  }
`;
