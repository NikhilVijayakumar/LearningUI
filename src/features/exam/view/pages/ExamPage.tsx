import ExamDetails from '../components/ExamDetails'
import useExam from '../../hooks/useExam'
import { useLanguage } from '../../../../common/localization/LanguageContext'

const ExamPage: React.FC = () => {
  const { literal } = useLanguage()
  const { appstate, handleCreateClick, handleDeleteClick, handleEditClick } =
    useExam(literal)

  return (
    <div>
      <ExamDetails
        appstate={appstate}
        literal={literal}
        handleCreateClick={handleCreateClick}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />
    </div>
  )
}

export default ExamPage
