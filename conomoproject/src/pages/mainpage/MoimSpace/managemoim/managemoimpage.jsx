import React, { useState } from 'react';
import styled from 'styled-components';
import CustomColumn from '../../../../components/container/CustomColumn';
import CustomRow from '../../../../components/container/CustomRow';
import CustomFont from '../../../../components/container/CustomFont';
import StyledImg from '../../../../components/container/StyledImg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.color || '#e0e0e0'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-weight: bold;
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

const ToggleButtonContainer = styled.div`
  width: 100px;
  height: 50px;
  border: 2px solid gray;
  border-radius: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const ToggleButtonCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  transition: all 0.3s ease;
  left: ${(props) => (props.isActive ? '55px' : '5px')};
`;

const Grid = styled.div`
border: 1px solid black;
border-radius: 0.5rem;
padding: 0.5rem;
background-color: transparent;
width: 100%;
min-height: 30vh;
display: flex;
align-items: center;
justify-content: center;
`;

const ManageMoimPage = () => {
    const [profileImage, setProfileImage] = useState('cat.png');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [toggleActive, setToggleActive] = useState(true);

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const handleModalConfirm = (newContent) => {
        setModalContent('처리 중...');
        setTimeout(() => {
            setModalContent(newContent);
        }, 3000);
    };

    const handleToggleClick = () => {
        setToggleActive(!toggleActive);
    };

    return (
        <Container>
            <CustomColumn width='60%' alignItems='center' justifyContent='center' gap='1rem'>
                <CustomRow width='100%' alignItems='center' justifyContent='flex-start'>
                    <CustomFont color='black' font='2rem' fontWeight='bold'>모임 관리</CustomFont>
                </CustomRow>
                <CustomRow width='100%' alignItems='center' justifyContent='space-between' gap='1rem'>
                    <Grid>
                        <CustomColumn width='50%' alignItems='center' justifyContent='center' gap='1rem'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>모임 프로필 추가/변경하기</CustomFont>
                            <ProfileImage src={profileImage} alt="Current Profile" />
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="profile-upload"
                                onChange={handleProfileChange}
                            />
                            <Button as="label" htmlFor="profile-upload">
                                변경하기
                            </Button>
                        </CustomColumn>
                    </Grid>

                    <Grid>
                        <CustomColumn width='50%' alignItems='center' justifyContent='center' gap='1rem'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>랜덤 문제 출제하기</CustomFont>
                            <Button
                                color="#ff6b6b"
                                onClick={() => {
                                    setModalContent(
                                        <>
                                            <CustomFont color='black' font='1rem'>정말로 출제하시겠습니까?</CustomFont>
                                            <Button
                                                color="#ff6b6b"
                                                onClick={() =>
                                                    handleModalConfirm('출제가 완료되었습니다!')
                                                }
                                            >
                                                출제하기
                                            </Button>
                                            <Button onClick={handleModalClose}>취소</Button>
                                        </>
                                    );
                                    setIsModalOpen(true);
                                }}
                            >
                                <CustomFont color='white' font='1.5rem' fontWeight='bold'>출제</CustomFont>
                            </Button>
                        </CustomColumn>
                    </Grid>

                </CustomRow>
                <CustomRow width='100%' alignItems='center' justifyContent='space-between' gap='1rem'>

                    <Grid>
                        <CustomColumn width='50%' alignItems='center' justifyContent='center' gap='1rem'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>출제/제출 주기 변경</CustomFont>

                            <Button
                                onClick={() => {
                                    setModalContent(
                                        <>
                                            <CustomFont color='black' font='2rem' fontWeight='bold'>변경하실 주기를 입력하세요.</CustomFont>
                                            <input type="number" placeholder="일" />
                                            <Button
                                                onClick={() =>
                                                    handleModalConfirm('주기가 변경되었습니다!')
                                                }
                                            >
                                                확인
                                            </Button>
                                            <Button onClick={handleModalClose}>취소</Button>
                                        </>
                                    );
                                    setIsModalOpen(true);
                                }}
                            >
                                <CustomFont color='black' font='1rem'>변경하기</CustomFont>
                            </Button>
                            <CustomFont color='black' font='0.8rem'>기본 설정 주기는 7일입니다.</CustomFont>
                        </CustomColumn>
                    </Grid>

                    <Grid>
                        <CustomColumn width='50%' alignItems='center' justifyContent='center' gap='1rem'>
                            <CustomFont color='black' font='1rem' fontWeight='bold'>모임 활동 상태 변경</CustomFont>
                            <CustomFont color='black' font='0.9rem' fontWeight='bold'>현재 상태는 {toggleActive ? 'ON' : 'OFF'}</CustomFont>
                            <ToggleButtonContainer onClick={handleToggleClick}>
                                <ToggleButtonCircle isActive={toggleActive} />
                            </ToggleButtonContainer>
                            <CustomFont color='black' font='0.8rem'>시험기간, 휴식기간에는 출제/제출을 잠깐 멈춥니다.</CustomFont>
                        </CustomColumn>
                    </Grid>
                </CustomRow>

                {isModalOpen && (
                    <ModalBackground>
                        <Modal>
                            {modalContent}
                            {modalContent === '출제가 완료되었습니다!' ||
                                modalContent === '주기가 변경되었습니다!' ? (
                                <Button onClick={handleModalClose}>확인</Button>
                            ) : null}
                        </Modal>
                    </ModalBackground>
                )}
            </CustomColumn>
        </Container>
    );
};

export default ManageMoimPage;
