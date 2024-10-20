import React from 'react'
import DefaultButton from '../defaultButton/defaultButton'

const MainPanel = () => {
  const handlePlayWithoutAuth = () => {
    // Здесь можно добавить дополнительную логику, если необходимо
    window.location.href = '/game'; // URL для игровой страницы без авторизации
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
          Нет аккаунта? <a href="/"> Зарегистрироваться! </a>
        </div>
     </div>
  )
}

export default MainPanel
