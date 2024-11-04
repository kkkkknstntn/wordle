import React, { useEffect, useRef, useState } from 'react'
// import authService from '../../service/authService';
import DefaultButton from '../defaultButton/DefaultButton';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginUser, selectCurrentUserState } from '../../features/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IUser, LoginResponse, UserLogin, UserRegisterData } from "../../types/user";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserSignInForm = () => {
    interface UserLoginData {
        username: string;
        password: string;
    }

    const dispatch = useAppDispatch()
    const { isAuthenticated } = useSelector(selectCurrentUserState)
    const navigate = useNavigate()

    const [userData, setUserData] = useState<UserLoginData>({
        username: '',
        password: ''
    });

    const isMounted = useRef(false);
    useEffect(() => { 
        console.log(isAuthenticated)
        if(isMounted.current)
            navigate("/user")
        else isMounted.current = true
    }, [isAuthenticated])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userData)
        await dispatch(loginUser(userData)) as { 
            payload: LoginResponse
        };
    };

    // Обработчик изменения для полей ввода
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value // Обновляем соответствующее поле в состоянии
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="authForm">
            <h2>Авторизация</h2>
            
            <div className="usernameContainer">
                <label htmlFor="username">Имя пользователя: </label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    required 
                    value={userData.username} 
                    onChange={handleChange}
                />
            </div>
                
            <div className="passwordContainer">
                <label htmlFor="password">Пароль: </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    value={userData.password}
                    onChange={handleChange}
                />
            </div>

            <DefaultButton text={"Войти"} extraClass="loginButton" />
        </form>
    )
}

export default UserSignInForm
