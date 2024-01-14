import React from 'react'
import ReactPdf from '@src/pages/react-pdf'
import { ReactPdfProvider } from '@src/context/reactPdfContext'

const App = () => {
  return (
    <ReactPdfProvider>
      <ReactPdf />
    </ReactPdfProvider>
  )
}
export default App
