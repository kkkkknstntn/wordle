import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, resetState, selectCurrentUserState } from '../../features/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import DefaultButton from '../defaultButton/DefaultButton';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createGameWithAuth, isGameWithoutAuth } from '../../features/gameSlice';
import UserSettings from './UserSettings';

const UserForm = () => {
    const { currentUser } = useSelector(selectCurrentUserState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [isUserSettingsClicked, setIsUserSettingsClicked] = useState(false)

    useEffect(() => {
        const fetchCurrentUser = async () => {
            await dispatch(getCurrentUser()).unwrap()
        };
            fetchCurrentUser();
    }, []);

    const handleExit = () => {
        localStorage.removeItem('accessToken');
        Cookies.remove("refreshToken")
        dispatch(resetState())
        navigate("/")
    };

    const handlePlayWithAuth = async () => {
        dispatch(resetState())
        dispatch(isGameWithoutAuth(false))
        await dispatch(createGameWithAuth())
        navigate("/game")
    }
    return (
        <div className='userForm'>
            {isUserSettingsClicked ? 
            <>
                <UserSettings/>
                <DefaultButton text="Назад" extraClass="playButton" action={() => {setIsUserSettingsClicked(data => !data)}} />
            </>
            :
            <>
                <div className='userState'>
                    Привет, {currentUser?.username} <br />
                    <br />
                    Статистика: <br />
                    Количество побед: {currentUser?.wins} <br />
                    Количество поражений: {currentUser?.loses} <br />
                    Ваше место в топе: {currentUser?.position} <br />
                </div>
                <DefaultButton text="Играть" extraClass="playButton" action={handlePlayWithAuth}/>
                <DefaultButton text="Выйти" extraClass="playButton" action={handleExit} />
                <DefaultButton text="Настройки" extraClass="playButton" action={() => {setIsUserSettingsClicked(data => !data)}} />
            </>
            }
            
        </div>
    );
};

export default UserForm;