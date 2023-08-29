import styled from 'styled-components';

export const R = {
  //-----------------------------------------------Result쪽
  WorldCupWinnerImg: styled.div`
    margin-top: 72px;
    width: 440px;
    height: 440px;
    flex-shrink: 0;
    border-radius: 440px;
    background: #d9d9d9;

    img {
      position: relative;
      width: 440px;
      height: 440px;
      border-radius: 440px;
    }
  `,
  WorldCupWinnerCard: styled.div`
    display: flex;
    width: 584px;
    height: 746px;
    padding: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
  `,

  WorldCupResultText: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    margin-top: 32px;
    margin-bottom: 72px;
  `,

  WorldCupResultButtonBox: styled.div`
    width: 673px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 20px;
    margin-top: 36px;
  `,

  WorldCupResultButton: styled.button<{ background: string }>`
    background: ${(props) => props.background || '#838383'};
    display: flex;
    width: 160px;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 999px;
    border: none;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
    cursor: pointer;
    color: ${(props) => props.color || '#000000'};
  `,

  ResultBox: styled.div`
    width: 792px;
  `,

  ResultCardBox: styled.div`
    margin-top: 71px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `,

  ResultRankTitle: styled.div`
    width: 126px;
    height: 32px;
    color: #000;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.36px;
  `,
  ResultRankTop: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;
  `,

  ResultTopCard: styled.div`
    display: flex;
    width: 248px;
    height: 177px;
    padding: 20px 0px;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    border-radius: 32px;
    background: #fff;
    /* Drop Shadow */
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  `,

  TopImgRankBox: styled.div`
    width: 248px;
  `,

  ResultTopCardImg: styled.img`
    width: 80px;
    height: 80px;
    fill: #d9d9d9;
    border-radius: 440px;
    background: #d9d9d9;
  `,

  ResultRankNum: styled.div`
    width: 17px;
    position: absolute;
    margin-left: 15px;
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 150%; /* 30px */
    letter-spacing: -0.3px;
  `,

  ResultTopTextBox: styled.div`
    height: 89px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,

  ResultTopTextAni: styled.p`
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `,

  ResultTopTextCha: styled.p`
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 150%; /* 30px */
    letter-spacing: -0.3px;
  `,

  OtherRankContainer: styled.div`
    width: 792px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    /* max-height는 캐릭터 수 많아질 때 넣기(일정 길이 넘으면 스크롤바 생기도록) */
  `,

  OtherRankBox: styled.div`
    display: flex;
    width: 792px;
    align-items: center;
    gap: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #d9d9d9;
  `,

  otherRankImg: styled.img`
    width: 60px;
    height: 60px;
    fill: #d9d9d9;
    border-radius: 440px;
    background: #d9d9d9;
  `,

  otherRankTextBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 0;
  `,

  otherRankText: styled.div`
    display: flex;
    gap: 8px;
  `,

  otherRankName: styled.p`
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
  `,

  otherRankAni: styled.p`
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.24px;
  `,
};