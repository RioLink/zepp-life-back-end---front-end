import React, { useState } from 'react';
import './Account.css';
import axios from 'axios';

function Account() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', loginData);

      if (response.data.success) {

        console.log('Вхід виконано успішно');

      } else {

        console.error('Помилка входу');
      }
    } catch (error) {
      console.error('Помилка при надсиланні даних для входу', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      alert('Заповніть всі поля');
      return;
    }

    if (!validateEmail(registerData.email)) {
      alert('Неправильний формат пошти');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert('Паролі не співпадають');
      return;
    }

    try {
      const response = await axios.post('/api/register', registerData);
      if (response.data.success) {
        console.log('Реєстрація виконана успішно');
      } else {
        console.error('Помилка реєстрації');
      }
    } catch (error) {
      console.error('Помилка при надсиланні даних для реєстрації', error);
    }
  }
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'login' ? 'active-button' : 'inactive-button'}
          onClick={() => setActiveTab('login')}
        >
          Вхід
        </button>
        <button
          className={activeTab === 'register' ? 'active-button' : 'inactive-button'}
          onClick={() => setActiveTab('register')}
        >
          Реєстрація
        </button>
      </div>

      {activeTab === 'login' && (
        <div>
          <h2>Вхід</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Ім'я користувача"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Пароль"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button type="submit">Увійти</button>
          </form>
        </div>
      )}

      {activeTab === 'register' && (
        <div>
          <h2>Реєстрація</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Ім'я користувача"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Пароль"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Підтвердіть пароль"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button type="submit">Зареєструватись</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Account;
