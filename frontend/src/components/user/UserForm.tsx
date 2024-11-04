import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, resetState, selectCurrentUserState } from '../../features/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import DefaultButton from '../defaultButton/DefaultButton';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { createGameWithAuth } from '../../features/gameSlice';

const UserForm = () => {
    const { currentUser, showAuthorizationForm, isAuthenticated, formType, isLoading } = useSelector(selectCurrentUserState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                //await dispatch(getCurrentUser()).unwrap(); // Используем unwrap для получения результата
                await dispatch(getCurrentUser()).unwrap()
            } catch (error) {
                //console.error('Ошибка получения текущего пользователя:', error);
                // Удаляем accessToken из localStorage
                localStorage.removeItem('accessToken');
                // Удаляем refreshToken из Cookie
                Cookies.remove("refreshToken")
                //document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'; // Устанавливаем истекшую дату
            }
        };
        // if(isMounted.current)
            fetchCurrentUser();
        // else isMounted.current = true
    }, []);

    const handleExit = () => {
        localStorage.removeItem('accessToken');
        Cookies.remove("refreshToken")
        dispatch(resetState())
        navigate("/")
    };

    const handlePlayWithAuth = async () => {
        dispatch(resetState())
        await dispatch(createGameWithAuth())
        navigate("/game")
    }
    return (
        <div className='userForm'>
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
        </div>
    );
};

export default UserForm;