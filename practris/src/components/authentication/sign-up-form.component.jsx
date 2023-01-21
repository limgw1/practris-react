import {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

//Instead of using 4 different useStates, can use this alternative
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields


  //Handle submitting of the signup form (creating user)
  const handleSubmit = async (event) => {
    event.preventDefault()
    //Check if passwords match
    if(password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    //actually try to authenticate
    try{
      const {user} = await createAuthUserWithEmailAndPassword(email, password) //Creates the user account in firebase authentication
      await createUserDocumentFromAuth(user, {displayName}) //Creates the user account in Firestore db (including display name)
      alert("Confirmed!")
    }catch(error){
      //handles User already exists error
      if(error.code === 'auth/email-already-in-use'){
        alert("Cannot create user, email already in use")
      }else{
        alert("User creation error. Screenshot this error and message Lim Guowei",error)
      }
    }
  }


  //Everytime value on the form changes (triggered by onChange), update the formfields variable
  const handleChange = async(event) => {
    //get name and value from event.target
    const {name,value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  return(
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}> {/* onSubmit is built into react */}
        <label>Display name</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName}/>
        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email}/>
        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password}/>
        <label>Confirm Password</label>
        <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <button type="submit">Submit</button> {/*onSubmit will read any button with onSubmit type*/}
      </form>
    </div>
  )
}

export default SignUpForm