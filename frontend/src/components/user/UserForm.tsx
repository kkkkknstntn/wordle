import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, selectCurrentUserState, resetUserState } from '../../features/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import DefaultButton from '../defaultButton/DefaultButton';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createGameWithAuth, isGameWithoutAuth, resetGameState } from '../../features/gameSlice';
import UserSettings from './UserSettings';

const UserForm = () => {
    const { currentUser } = useSelector(selectCurrentUserState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isUserSettingsClicked, setIsUserSettingsClicked] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            await dispatch(getCurrentUser()).unwrap();
        };
        fetchCurrentUser();
    }, [dispatch]);

    const handleExit = () => {
        localStorage.removeItem('accessToken');
        Cookies.remove("refreshToken")
        dispatch(resetUserState())
        navigate("/")
    };

    const handlePlayWithAuth = async () => {
        dispatch(resetGameState())
        dispatch(isGameWithoutAuth(false))
        await dispatch(createGameWithAuth())
        navigate("/game")
    }
    return (
        <div className='userForm'>
            {isUserSettingsClicked ? 
            <>
                <UserSettings />
                <DefaultButton text="Назад" extraClass="playButton" action={() => setIsUserSettingsClicked(prev => !prev)} />
            </>
            :
            <>
                <div className='userState'>
                    <h3 className='greeting'>Привет, {currentUser?.username}</h3>
                    <div className='statistics'>
                        <p>Статистика:</p>
                        <p>Количество побед: <strong>{currentUser?.wins}</strong></p>
                        <p>Количество поражений: <strong>{currentUser?.loses}</strong></p>
                        <p>Ваше место в топе: <strong>{currentUser?.position}</strong></p>
                    </div>
                </div>
                <DefaultButton text="Играть" extraClass="playButton" action={handlePlayWithAuth} />
                <DefaultButton text="Выйти" extraClass="playButton" action={handleExit} />
                <DefaultButton text="Настройки" extraClass="playButton" action={() => setIsUserSettingsClicked(prev => !prev)} />
            </>
            }
        </div>
    );
};

export default UserForm;