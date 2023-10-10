//src/features/login/pages/LoginPage.tsx
import LoginForm from '../components/LoginForm'
import useLogin from '../../hooks/useLogin'
import { useLanguage } from '../../../../common/localization/LanguageContext'
import { useAuth } from '../../../../common/auth/authContext'

const LoginPage = () => {
  const { literal } = useLanguage()
  const { appstate, handleLogin, setState } = useLogin(literal)
  const { setUser } = useAuth()
  return (
    <LoginForm
      appstate={appstate}
      handleLogin={handleLogin}
      literal={literal}
      setState={setState}
      setUser={setUser}
    />
  )
}

export default LoginPage
