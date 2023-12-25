import { Routes, Route, Link } from 'react-router-dom'
import Main from './routes/Main'
import About from './routes/About'


function App() {
  return (
    <>
      <header>
        <Link to="/">main</Link>
        <br/>
        <Link to="/about">about</Link>
      </header>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  );
}

export default App;