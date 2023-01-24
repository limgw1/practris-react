import { useContext } from "react"
import { Link } from "react-router-dom"

import { UserContext } from "../../contexts/user.context"

import { signOutUser } from "../../utils/firebase/firebase.utils"

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext) //this changes the useState in user.context.jsx, so it rerenders 
  console.log(currentUser)


  //Required so that we know when we have signed out
  const signOutHandler = async () =>{
    const response = await signOutUser()
    setCurrentUser(null)
  }
  
  return(
    <nav>
      <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/game">Game</Link></li>
        {
          //This is a javascript ternary operator
          //condition ? exprIfTrue : exprIfFalse
          //Check if currentUser exists
          currentUser 
          ? (
          <div>
            <li><span onClick={signOutHandler}>Logout</span></li>
            <li><Link to="/profile">Profile</Link></li>
          </div>
            )
          : (<li><Link to="/login">Login</Link></li>)
        }
        <li><Link to="/leaderboards">Leaderboards</Link></li>
        
      </ul>
    </nav> 
  )
}

export default NavBar