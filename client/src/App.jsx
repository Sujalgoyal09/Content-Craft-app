import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/' element = {<Blog/>} />
      </Routes>
    </div>
  )
}


export default App;