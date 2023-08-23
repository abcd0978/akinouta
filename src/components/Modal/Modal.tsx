import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import * as modalStore from "../../store/modalStore";

type Props = {
  children: React.ReactNode;
};

const Modal = (props: Props) => {
  const [modal, setModal] = useAtom(modalStore.isModalOpened);
  const [modalContents, setModalContents] = useAtom(modalStore.modalContents);
  return (
    <StModalBackGround
      onClick={() => {
        setModal(false);
        setModalContents("login");
      }}
    >
      <StModalContent onClick={(e) => e.stopPropagation()}>
        {props.children}
      </StModalContent>
    </StModalBackGround>
  );
};
const StModalBackGround = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(7px);
`;
const StModalContent = styled.div`
  background-color: #fff;
  padding: 40px 0px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 80px;
`;
export default Modal;