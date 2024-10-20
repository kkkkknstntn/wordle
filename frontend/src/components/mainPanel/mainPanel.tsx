import React from 'react'
import DefaultButton from '../defaultButton/defaultButton'
import gameService from '../../service/gameService'
import { Link, useNavigate } from 'react-router-dom'


const MainPanel = () => {
  const navigate = useNavigate()
  const handlePlayWithoutAuth = async () => { 
    // Здесь можно добавить дополнительную логику, если необходимо
    navigate("/game"); // URL для игровой страницы без авторизации
    await gameService.createGame().then(res => { console.log(res) }).catch(err => { console.warn(err) })
  }
  return (
    <div className="mainPanel">
        <h1> W O R D L E </h1>
        <h2 style={{fontSize: '16px'}}> У вас есть 6 попыток угадать слово из 5 букв. </h2>
          
        <form action="/login" method="GET" className="authForm">
          <h2>Авторизация</h2>
          <div className="usernameContainer">
            <label htmlFor="username">Имя пользователя: </label>
            <input type="text" id="username" name="username" required/>
          </div>
            
          <div className="passwordContainer">
            <label htmlFor="password">Пароль: </label>
            <input type="password" id="password" name="password" required/>
          </div>
          <DefaultButton text={"Войти"} extraClass="loginButton" action={() => 0}/>
        </form>
          
        <DefaultButton text="Играть без авторизации" extraClass="playButton" action={handlePlayWithoutAuth}/>

        <div> 
          Нет аккаунта? <Link to="/"> Зарегистрироваться! </Link>
        </div>
     </div>
  )
}

export default MainPanel
