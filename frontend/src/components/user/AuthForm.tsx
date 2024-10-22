import React, { useState } from 'react'
import gameService from '../../service/gameService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DefaultButton from '../defaultButton/DefaultButton'
import UserSignInForm from './UserSignInForm'
import UserSignUpForm from './UserSignUpForm'

const AuthorizationForm = () => {
    // const { showForm } = useSelector(({ user }) => user);

    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true)
    const navigate = useNavigate()
    
    const handlePlayWithoutAuth = async () => { 
        // Здесь можно добавить дополнительную логику, если необходимо
        navigate("/game"); // URL для игровой страницы без авторизации
        await gameService.createGame().then(res => { console.log(res) }).catch(err => { console.warn(err) })
    }
    const handleRegister = () => {
        setIsLoginFormVisible(!isLoginFormVisible)
    }
  return (
    // showForm ? 
      <div className='authForm'>
            {isLoginFormVisible ? 
              <UserSignInForm/>
            :
              <UserSignUpForm/>
            }
            <DefaultButton text="Играть без авторизации" extraClass="playButton" action={handlePlayWithoutAuth}/>

            <div> 
              Нет аккаунта?  
              <span 
                    onClick={handleRegister} 
                    className='register' 
              >
                Зарегистрироваться
              </span>
          </div>
      </div>
      // :
      //   <></>
  )
}

export default AuthorizationForm
