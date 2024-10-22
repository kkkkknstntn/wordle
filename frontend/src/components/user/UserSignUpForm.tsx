import React, { useState } from 'react'
import axios from 'axios';
import instance from '../../api/axios.api';
import gameService from '../../service/gameService';
import DefaultButton from '../defaultButton/DefaultButton';
// import authService from '../../service/authService';

type UserRegisterData = {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    wins: number;
    loses: number;
}

const UserSignUpForm = () => {
    const [userData, setUserData] = useState<UserRegisterData>({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        wins: 0,
        loses: 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setUserData(prevData => ({
          ...prevData,
          [name]: value
        }));
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // await authService.registerUser(userData).then(res => { console.log(res) }).catch(err => {console.warn(err)})
    };

    

    return (
        <div className='regContainer'>
            <form onSubmit={handleSubmit} className="authForm">
                <h2>Регистрация</h2>
                <div className="usernameContainer">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={userData.username} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="passwordContainer">
                    <label htmlFor="password">Пароль:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={userData.password} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="firstNameContainer">
                    <label htmlFor="firstName">Имя:</label>
                    <input 
                        type="text" 
                        id="first_name" 
                        name="first_name" 
                        value={userData.first_name} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="lastNameContainer">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input 
                        type="text" 
                        id="last_name" 
                        name="last_name" 
                        value={userData.last_name} 
                        onChange={handleChange} 
                        required
                />
                </div>
                <DefaultButton text="Зарегистрироваться" extraClass="registerButton"/>
        </form>
      </div>
    )
}

export default UserSignUpForm
