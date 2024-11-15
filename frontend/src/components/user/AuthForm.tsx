import React, { useState } from 'react'
import gameService from '../../service/gameService'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../defaultButton/DefaultButton'
import UserSignInForm from './UserSignInForm'
import UserSignUpForm from './UserSignUpForm'
import { IUser } from '../../types/user'
import { setIsGameWithoutAuth, createGameWithoutAuth, resetGameState } from '../../features/gameSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { changeFormType, selectCurrentUserState } from '../../features/userSlice'

const AuthorizationForm = () => {
  const { formType } = useSelector(selectCurrentUserState)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()  

  const handlePlayWithoutAuth = async () => { 
      navigate("/game");

      dispatch(resetGameState())
      dispatch(setIsGameWithoutAuth(true))
      await dispatch(createGameWithoutAuth())
  }

  const handleRegister = () => {
      dispatch(changeFormType())
  }
  return (
    <div className='authForm'>
          { formType == "signin" ? 
            <UserSignInForm/>
          :
            <UserSignUpForm/>
          }
          <DefaultButton text="Играть без авторизации" extraClass="playButton" action={handlePlayWithoutAuth}/>

          {formType == "signin" ? 
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
