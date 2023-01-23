import { useState, useContext } from "react";

import { UserContext } from "../../contexts/user.context";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //We just want to set the value in the signinform, so only get setCurrentUser
  const {setCurrentUser} = useContext(UserContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password); //Get the response from firebase auth and destructures out user
      setCurrentUser(user) //set current user to the person who logged in
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };


  return(
    <div>
      <h1>Sign In with your email and password</h1>
      <form onSubmit={handleSubmit}> {/* onSubmit is built into react */}
        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email}/>
        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password}/>
        <button type="submit">Submit</button> {/*onSubmit will read any button with onSubmit type*/}
      </form>
    </div>
  )
}

export default SignInForm