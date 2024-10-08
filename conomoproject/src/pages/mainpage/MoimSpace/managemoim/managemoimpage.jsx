import React, { useState } from 'react';
import styled from 'styled-components';
import CustomColumn from '../../../../components/container/CustomColumn';

import ManageMoimBanner from './ManageMoimBanner';
import ManageRandomQuiz from './ManageRandomQuiz';
import ManageOnOff from './ManageOnOff';

// 피그마의 '화면10) 모임 관리 페이지'에 해당함 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  background-color: #2C2C2C;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  width: ${(props) => props.width || '6rem'};

  background-color: ${(props) => props.color || '#e0e0e0'};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ManageMoimPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleOpenModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    return (
        <Container>
            <CustomColumn width='90%' alignItems='center' justifyContent='center' gap='2.5rem'>
                <ManageMoimBanner />
                <ManageRandomQuiz />
                <ManageOnOff />

                {isModalOpen && (
                    <ModalBackground>
                        <Modal>
                            {modalContent}
                            {modalContent === '출제가 완료되었습니다!' ||
                                modalContent === '주기가 변경되었습니다!' ? (
                                <Button onClick={handleCloseModal}>확인</Button>
                            ) : null}
                        </Modal>
                    </ModalBackground>
                )}
            </CustomColumn>
        </Container>
    );
};

export default ManageMoimPage;

