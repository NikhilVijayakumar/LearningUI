import ExamDetails from '../components/ExamDetails'
import { useLanguage } from '../../../../common/localization/LanguageContext'


const ExamPage: React.FC = () => {
  const { literal } = useLanguage()  

  return (
    <div>
      <ExamDetails   
      literal={literal}    
      />
    </div>
  )
}

export default ExamPage
