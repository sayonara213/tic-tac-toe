import React, { useState } from 'react';

import { HeaderStyled as Styled } from './Header.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import Logo from '../logo/Logo';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import CustomText from '../custom-text/CustomText';
import Icon from '../custom-icon/Icon';
import CustomInput from '../custom-input/CustomInput';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../App';
import { updateUserName } from '../../../redux/user.slice';

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>(user.userName);

  const navigate = useNavigate();

  const back = () => {
    navigate(ROUTES.home);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveUserName = async () => {
    setIsEditing(false);
    if (userName === '' || userName === user.userName) {
      return;
    }
    await updateDoc(doc(db, 'users', user.uid), {
      userName: userName,
    });
    dispatch(updateUserName(userName));
  };

  return (
    <Styled.Container>
      <Logo onClick={back} />
      <Styled.ParamsWrapper>
        {isEditing ? (
          <Styled.UserContainer>
            <CustomInput value={userName} onChange={setUserName} autoFocus={true} />
            <Icon type='done' onClick={saveUserName} fadeIn={true} />
          </Styled.UserContainer>
        ) : (
          <Styled.UserContainer>
            <CustomText>{userName}</CustomText>
            <Icon type='edit' onClick={handleEdit} />
          </Styled.UserContainer>
        )}
        <Icon type='bulb' onClick={handleEdit} />
      </Styled.ParamsWrapper>
    </Styled.Container>
  );
};

export default Header;
