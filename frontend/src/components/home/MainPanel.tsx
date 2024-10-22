import React, { useState } from 'react'
import gameService from '../../service/gameService'
import { Link, useNavigate } from 'react-router-dom'
import AuthorizationForm from '../user/AuthForm'


const MainPanel = () => {
  

  return (
    <div className="mainPanel">
        <h1> W O R D L E </h1>
        <h2 style={{fontSize: '16px'}}> У вас есть 6 попыток угадать слово из 5 букв. </h2>
          
        {/* {isAuthenticated ? } */}
        <AuthorizationForm/>
        {/* <div className='userForm'>

        </div> */}
      
     </div>
  )
}

export default MainPanel
