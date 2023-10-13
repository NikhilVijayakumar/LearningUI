//path src\features\organization\view\components\OrganizarionList.tsx
import { ExamDetailsProps } from '../../repo/data/examData'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


export default function ExamDetails({
  appstate,
  literal,
 fetchQuiz
}: ExamDetailsProps) {

  const { name, types } = useParams();
  const typesArray = types?.split(',') || [];
  console.log('name', name);
  console.log('types', types);
  console.log('typesArray', typesArray);
  // const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(
  //   null,
  // )

  // useEffect(() => {
  //   fetchQuiz(literal,)
  // }, [])
    

  return <>{"Helloworld"}</>
}
