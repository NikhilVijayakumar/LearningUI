//path src/common/components/form/style/FormStyle.ts

import { CSSProperties } from 'react'

export const defaultFormStyle: CSSProperties = {
  padding: '20px',
  marginTop: '50px',
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

interface FormStyleProps {
  sx?: CSSProperties
}

export const getFormStyle = ({ sx }: FormStyleProps = {}): CSSProperties => {
  return { ...defaultFormStyle, ...sx }
}
