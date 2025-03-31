import Navbar from "../components/Navbar"
import LoginScreen from "../pages/Login"

const LoginLayout = () => {
  return (
    <>
    <Navbar icons={false} />
    <LoginScreen />
    </>
  )
}
export default LoginLayout