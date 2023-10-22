//src/common/components/list/GenericList.tsx

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { ListDataItem, GenericListProps } from './genericListData'

function GenericList<T extends ListDataItem>({
  subheaderText,
  data,
  onItemClick,
}: GenericListProps<T>) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="generic-list-subheader"
      subheader={
        <ListSubheader component="div" id="generic-list-subheader">
          {subheaderText}
        </ListSubheader>
      }
    >
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => onItemClick(item)}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </React.Fragment>
      ))}
    </List>
  )
}

export default GenericList
