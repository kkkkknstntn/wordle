import React, { useState } from 'react'
import DefaultButton from '../defaultButton/DefaultButton'
import { useSelector } from 'react-redux'
import { getCurrentUser, selectCurrentUserState, updateUser } from '../../features/userSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { UpdateUserData } from '../../types/user'

const UserSettings = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useSelector(selectCurrentUserState)
  const [userData, setUserData] = useState({
    username: currentUser?.username,
    password: currentUser?.password,
    firstName: currentUser?.first_name,
    lastName: currentUser?.last_name
  });
  const [isChangeParameters, setIsChangeParameters] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
     setUserData(prevState => ({
        ...prevState,
        [name]: value // Обновляем соответствующее поле в состоянии
    }));
  };

  const somedata: UpdateUserData = {
    userData: {
      username: userData.username,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName
    },
    id: currentUser?.id
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userData)
    await dispatch(updateUser(somedata));
  };
  return (
    <div className='userSettings'>
      <form className="authForm" onSubmit={handleSubmit}>
          <h2>Настройки</h2>
            
          <div className="usernameContainer">
              <label htmlFor="username">Имя пользователя: </label>
              {
                isChangeParameters ?
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  required 
                  value={userData.username}
                  onChange={handleChange}
                />
              :
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    required 
                    value={userData.username}
                    onChange={handleChange}
                    disabled
                />
              }
                
          </div>   
          <div className="passwordContainer">
              <label htmlFor="password">Пароль: </label>
              {
              isChangeParameters ? 
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  value={userData.password}
                  onChange={handleChange}
                />
              :
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  value={userData.password}
                  onChange={handleChange}
                  disabled
                />
              }   
          </div>

          <div className="usernameContainer">
              <label htmlFor="firstName">Имя: </label>
              {isChangeParameters ?
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                required 
                value={userData.firstName}
                onChange={handleChange}
              />
              :
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                required 
                value={userData.firstName}
                onChange={handleChange}
                disabled
              />
              }
          </div>

          <div className="usernameContainer">
              <label htmlFor="lastName">Фамилия: </label>
              {isChangeParameters ?
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                required 
                value={userData.lastName}
                onChange={handleChange}
              />
              :
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                required 
                value={userData.lastName}
                onChange={handleChange}
                disabled
              />
              }
          </div>
          <DefaultButton text={"Изменить"}  />
        </form>
        <DefaultButton text={"Изменить параметры аккаунта"} extraClass="loginButton" action={() => setIsChangeParameters(true)}/>
    </div>
  )
}

export default UserSettings
