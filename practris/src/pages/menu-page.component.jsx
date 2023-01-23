import MainMenuItem from "../components/main-menu-item/main-menu-item.component"

import { useContext } from "react"
import { UserContext } from "../contexts/user.context"

const MenuPageComponent = () => {

  const { currentUser } = useContext(UserContext) //this changes the useState in user.context.jsx, so it rerenders 
  //TODO: GET DISPLAY NAME
  var displayName
  currentUser ? (displayName = currentUser.uid) : (displayName = "GUEST")

  return(
    <div>
      <h1>HELLO, {displayName}</h1>
      <MainMenuItem/>  
    </div>
    
  )
}

export default MenuPageComponent