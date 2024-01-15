import React from 'react'
import ReactPdf from './ReactPdf'
import { ReactPdfProvider } from '@src/context/reactPdfContext'

const PageReactPdf = () => {
  return (
    <ReactPdfProvider>
      <ReactPdf />
    </ReactPdfProvider>
  )
}

export default PageReactPdf
