import React, { useEffect, useState } from 'react'
import gameService from '../../service/gameService'
import { Link, useNavigate } from 'react-router-dom'
import AuthorizationForm from '../user/AuthForm'
import { selectCurrentState } from '../../features/userSlice'
import { useSelector } from 'react-redux'
import UserForm from '../user/UserForm'

interface MainPanelInterface {
  showAuthForm : boolean
}

const UserPanel = () => {
  return (
    <div className="mainPanel">
        <h1> W O R D L E </h1>
        <h2 style={{fontSize: '16px'}}> У вас есть 6 попыток угадать слово из 5 букв. </h2>
          {
            <UserForm/>
          }
      
     </div>
  )
}

export default UserPanel
