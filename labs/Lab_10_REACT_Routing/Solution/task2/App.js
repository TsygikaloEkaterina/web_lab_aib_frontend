import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './routes/Main';
import About from './routes/About';

function App() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/');

      if (!response.ok) {
        throw new Error('Ошибка при получении: ' + response.status);
      }

      const data = await response.json();
      setUsers(data.results.map(person => ({
        name: person.name,
        birth_year: person.birth_year,
        id: person.created
      })));
      console.log(data.results);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Вызывать fetchData при монтировании компонента

  return (
    <>
      <Routes>
        <Route path='/' element={<Main users={users} />} />
        <Route path='/about/:id' element={<About users={users} />} />
      </Routes>
    </>
  );
}

export default App;