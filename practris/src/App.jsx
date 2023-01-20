import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'

import GamePageComponent from './pages/game-page.component'
import NavBar from './components/navbar/navbar.component'
import MenuPageComponent from './pages/menu-page.component'
import LoginPageComponent from './pages/login-page.component'

const App = () => {
  return(
    <Fragment>
      <NavBar/>
      <Routes>
        <Route path="/" exact element={<MenuPageComponent/>}/>
        <Route path="/game" element={<GamePageComponent/>}/>
        <Route path="/login" element={<LoginPageComponent/>}/>
      </Routes>
    </Fragment>
    
  )
}

export default App
