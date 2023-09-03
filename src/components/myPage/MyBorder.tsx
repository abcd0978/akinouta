import { equipItem, fetchMyBorders } from '../../api/items';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import * as userStore from '../../store/userStore';
import goShop from '../../assets/goShop.png';
import { B } from './Deco.styles';
import * as S from '../../pages/Shop.style';
import useViewport from '../../hooks/useViewPort';
import { useNavigate } from 'react-router-dom';
const MyBorder = () => {
  const user = useAtomValue(userStore.user);
  const { width, height, isMobile, isLoaded } = useViewport();
  const navigate = useNavigate();
  const writeUserItem = useSetAtom(userStore.writeUserItem);
  const {
    isLoading,
    isError,
    data: borders,
  } = useQuery(
    ['myBorders', user?.id],
    async () => {
      if (!user?.id) return [];
      const result = await fetchMyBorders(user.id);
      return result;
    },
    {
      enabled: !!user?.id,
    },
  );
  if (isLoading) {
    return <div>테두리를 불러오는 중</div>;
  }
  if (isError) {
    return <div>테두리를 불러오지 못했어요.</div>;
  }
  const applyAward = (itemId: string) => {
    console.log(`Applying award:${itemId}`);
  };
  const filteredBorders = borders.filter((borders) => borders.items !== null);
  console.log(filteredBorders);
  const borderList =
    Array.isArray(filteredBorders) && filteredBorders.length > 0 ? (
      <S.ItemBox>
        {filteredBorders.map((filteredBorders, index) => (
          <B.BorderContainer key={index}>
            <B.GoIcon
              src={filteredBorders.items?.img_url}
              alt={filteredBorders.items?.name}
            />
            <B.ButtonContainer>
              <S.Number>{filteredBorders.items?.name}</S.Number>

              <B.Equip onClick={() => applyAward(filteredBorders.items?.id)}>
                적용
              </B.Equip>
            </B.ButtonContainer>
          </B.BorderContainer>
        ))}
      </S.ItemBox>
    ) : (
      <B.NoneContainer mediaWidth={width}>
        <B.NoneMessage>구매한 테두리가 없습니다.</B.NoneMessage>
        <B.NoneButton
          onClick={() => {
            navigate('/shop/:category');
          }}
        >
          테두리 구매하러 가기
          <img src={goShop} />
        </B.NoneButton>
      </B.NoneContainer>
    );
  return <S.Outer>{borderList}</S.Outer>;
};

export default MyBorder;
