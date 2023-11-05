import React, { useState, useEffect } from 'react';

function Training({ handleStopWorkout }) {
  const [selectedTab, setSelectedTab] = useState(null);
  const [timers, setTimers] = useState(Array(20).fill(0));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimers((prevTimers) =>
          prevTimers.map((timer, index) => (index === selectedTab ? timer + 1 : timer))
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, selectedTab]);

  const trainingProcesses = [
    {
      title: 'Біг',
      description: 'Біг - це тренувальний режим, який включає біг на відкритому повітрі або на біговому треку.',
    },
    {
      title: 'Тренажерний зал',
      description: 'Тренажерний зал - це місце, де ви можете використовувати різні тренажери для занять фітнесом і мускульною роботою.',
    },
    {
      title: 'Плавання',
      description: 'Плавання - це вид спорту, який використовується для розвитку фізичної форми та підтримки загального здоров\'я.',
    },
    {
      title: 'Вело',
      description: 'Вело - це їзда на велосипеді, яка може бути як розважальною, так і тренувальною активністю.',
    },
  ];

  const handleStart = (index) => {
    setSelectedTab(index);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    handleStopWorkout();
  };
  
  return (
    <div>
      <h1>Тренування</h1>
      <div className="tabs">
        {trainingProcesses.map((process, index) => (
          <div
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`tab ${selectedTab === index ? 'selected' : ''}`}
          >
            <div className="tab-content">
              <span>{process.title}</span>
              <div className="stopwatch">{formatTime(timers[index])}</div>
              <button className="start-button" onClick={() => handleStart(index)}>Старт</button>
            </div>
          </div>
        ))}
      </div>
      <button className="stop-button" onClick={handleStop}>Стоп</button>
      <div className="description">
        {selectedTab !== null && (
          <div>
            <h2>{trainingProcesses[selectedTab].title}</h2>
            <p>{trainingProcesses[selectedTab].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default Training;