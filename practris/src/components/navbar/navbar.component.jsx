import { Link } from "react-router-dom"

const NavBar = () => {
  return(
    <nav>
      <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav> 
  )
}

export default NavBar