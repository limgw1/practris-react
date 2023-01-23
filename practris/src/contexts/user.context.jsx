import { useState, createContext } from "react";


//This is the actual storage thing itself
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

//Allows any children component (usually just the whole App) to access the usercontext
export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value =  {currentUser, setCurrentUser}

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}