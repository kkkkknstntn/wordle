import React, { useState } from 'react'
import gameService from '../../service/gameService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../defaultButton/DefaultButton'
import UserSignInForm from './UserSignInForm'
import UserSignUpForm from './UserSignUpForm'
import { IUser } from '../../types/user'
import { createGameWithoutAuth } from '../../features/gameSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'

const AuthorizationForm = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()  

  const handlePlayWithoutAuth = async () => { 
      navigate("/game");
      //await gameService.createGame().then(res => { console.log(res) }).catch(err => { console.warn(err) })
      await dispatch(createGameWithoutAuth())
  }

  const handleRegister = () => {
      setIsLoginFormVisible(!isLoginFormVisible)
  }
  return (
    <div className='authForm'>
          { isLoginFormVisible ? 
            <UserSignInForm/>
            
          :
            <UserSignUpForm/>
          }
          <DefaultButton text="Играть без авторизации" extraClass="playButton" action={handlePlayWithoutAuth}/>

          {isLoginFormVisible ? 
          <div> 
            Нет аккаунта? {" "}
            <span 
                  onClick={handleRegister} 
                  className='register' 
            >
              Зарегистрироваться
            </span>
          </div>
          : 
          <div>
            Уже есть аккаунт? {" "}
            <span 
                  onClick={handleRegister} 
                  className='register' 
            >
              Войти
            </span>
          </div>
        }
          
    </div>
  )
}

export default AuthorizationForm
