import React, { useState } from 'react'
// import authService from '../../service/authService';
import { UserLoginData } from '../../types/userData';
import DefaultButton from '../defaultButton/DefaultButton';

const UserSignInForm = () => {
    const [userData, setUserData] = useState<UserLoginData>({
        username: '',
        password: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // await authService.loginUser(userData).then(res => { console.log("УРА" + res) }).catch(err => {console.warn(err)})
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
