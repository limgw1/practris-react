import SignInForm from "../components/authentication/sign-in-form.component"
import SignUpForm from "../components/authentication/sign-up-form.component"

const LoginPageComponent = () => {
  return(
    <div>
      <SignInForm/>
      <SignUpForm/>
    </div>
  )
}

export default LoginPageComponent