import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Training from './Training';
import Saved from './Saved';
import Account from './Account';
import axios from 'axios';
import NotFound from './NotFound';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [weight, setWeight] = useState(null);
  const [waistSize, setWaistSize] = useState(null);
  const [hoursOfSleep, setHoursOfSleep] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const generateRandomNumber = () => {
    const min = 1;
    const max = 9999;

    const randomSteps = Math.floor(Math.random() * (max - min + 1)) + min;

    setRandomNumber(randomSteps);

    const randomWeight = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
    const randomWaistSize = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
    const randomHoursOfSleep = Math.floor(Math.random() * (12 - 4 + 1)) + 4;

    setWeight(randomWeight);
    setWaistSize(randomWaistSize);
    setHoursOfSleep(randomHoursOfSleep);

    const randomPercentage = Math.floor(
      (randomWeight + randomWaistSize + randomHoursOfSleep) / 3
    );
    setPercentage(randomPercentage);
  };
  
  const sendDataToServer = async (userId, workoutData) => {
    try {
      const response = await axios.post('/api/saveWorkout', { userId, workoutData });
      console.log('Данные успешно сохранены', response.data);
    } catch (error) {
      console.error('Произошла ошибка при сохранении данных', error);
    }
  };

  const handleStopWorkout = () => {
    const userId = 1;
    const workoutData = {
      stepsWalked: randomNumber !== null ? randomNumber : 0,
      weight: weight !== null ? weight : 0,
      waistSize: waistSize !== null ? waistSize : 0,
      hoursOfSleep: hoursOfSleep !== null ? hoursOfSleep : 0,
    };
  
    sendDataToServer(userId, workoutData);
  };
  
  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const completeGoal = (index) => {
    const goalToComplete = goals[index];
    setCompletedGoals([...completedGoals, goalToComplete]);
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const deleteCompletedGoal = (index) => {
    const updatedCompletedGoals = completedGoals.filter((_, i) => i !== index);
    setCompletedGoals(updatedCompletedGoals);
  };

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
        <Route path="/training" element={<Training handleStopWorkout={handleStopWorkout} />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <div>
                <h1 className="header">ZEPP-LIFE</h1>
                <button className="button-sync" onClick={generateRandomNumber}>
                  Синхронізація
                </button>
                <p>
                  Кількість зроблених кроків: <span className="number">{randomNumber !== null ? randomNumber : 'Не має данних'}</span>
                </p>
                <div className="horizontal-line"></div>
                <div className="indicators">
                  <h2>Ваші бажані показники</h2>
                  <p>Вага: {weight}</p>
                  <p>Розмір талії: {waistSize}</p>
                  <p>Кількість годин сну: {hoursOfSleep}</p>
                  <p>Процент: {percentage}%</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Додати ціль"
                    onKeyUp={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim() !== '') {
                        addGoal(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
                <div className="goals">
                  <h2>Ваші цілі</h2>
                  <ul>
                    {goals.map((goal, index) => (
                      <li key={index}>
                        {goal}
                        <button onClick={() => completeGoal(index)}>Готово</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="completed-goals">
                  <h2>Виконані цілі</h2>
                  <ul>
                    {completedGoals.map((goal, index) => (
                      <li key={index}>
                        {goal}
                        <button onClick={() => deleteCompletedGoal(index)}>Видалити</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;