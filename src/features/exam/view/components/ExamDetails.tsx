//path src\features\organization\view\components\OrganizarionList.tsx

import { OrganizationListProps } from '../../repo/data/examData'
import GenericTable from '../../../../common/components/table/GenericTable'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useState, useEffect } from 'react'
import Details from '../pages/OrganizarionDetailsPage'
import { EventType } from '../../../../common/components/table/tableData'

export default function ExamDetails({
  appstate,
  literal,
  handleCreateClick,
  handleDeleteClick,
  handleEditClick,
}: OrganizationListProps) {
  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(
    null,
  )

  useEffect(() => {
    if (
      appstate.data != null &&
      appstate.selectedData != null &&
      appstate.event == EventType.EDIT
    ) {
      setRenderedContent(
        <div>
          <Details
            headers={appstate.data.tableHeaders}
            data={appstate.selectedData}
            literal={literal}
            event={appstate.event}
          />
        </div>,
      )
    } else if (appstate.data != null && appstate.event == EventType.CREATE) {
      setRenderedContent(
        <div>
          <Details
            headers={appstate.data.tableHeaders}
            data={appstate.selectedData}
            literal={literal}
            event={appstate.event}
          />
        </div>,
      )
    } else {
      if (appstate.isError) {
        setRenderedContent(
          <Paper>
            <Alert severity="error">{appstate.statusMessage}</Alert>
          </Paper>,
        )
      } else if (
        appstate.isSuccess &&
        appstate.data != null &&
        appstate.data.data.length > 0 &&
        appstate.data.tableHeaders.length > 0
      ) {
        setRenderedContent(
          <Paper>
            <GenericTable
              data={appstate.data.data}
              headers={appstate.data.tableHeaders}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              handleCreateClick={handleCreateClick}
            />
          </Paper>,
        )
      } else {
        setRenderedContent(<CircularProgress />)
      }
    }
  }, [
    appstate.data,
    appstate.isError,
    appstate.statusMessage,
    appstate.selectedData,
    appstate.event,
  ])

  return <>{renderedContent}</>
}
