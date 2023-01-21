import {useState} from 'react'
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    //Check if passwords match
    if(password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    //actually try to authenticate
    try{
      const response = await createAuthUserWithEmailAndPassword(email, password)
      console.log("Creating user")
      console.log(response)
    }catch(error){
      console.log("User creation encountered an error.", error)
    }
  }

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