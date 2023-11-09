// src/features/registration/pages/RegistrationPage.tsx
import RegistrationForm from '../components/RegistrationForm'
import useRegistration from '../../hooks/useRegistration'
import { useLanguage } from '../../../../common/localization/LanguageContext'

const RegistrationPage = () => {
  const { literal } = useLanguage()
  const { appstate, handleRegistration, setState } = useRegistration(literal)

  return (
    <>
      <RegistrationForm
        appstate={appstate}
        handleRegistration={handleRegistration}
        setState={setState}
        literal={literal}
      />
    </>
  )
}

export default RegistrationPage