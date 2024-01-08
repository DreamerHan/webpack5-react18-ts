import React, { useRef, useState } from 'react'
import './index.less'

import { Document, Thumbnail } from 'react-pdf'
import pdfFile from '@src/assets/pdfs/kejian.pdf'

export const Outline = () => {
  const [pdfAllPages, setPdfAllPage] = useState<number>()
  const [pdfWidth, setPdfWidth] = useState<number>(104)
  const [currentPage, setCurrentPage] = useState(0)
  const [loadCanvas, setLoadCanvas] = useState(true)
  const [pdfHeight, setPdfHeight] = useState(147)

  const pdfPageRef = useRef<HTMLDivElement | null>(null)

  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfAllPage(numPages)
  }

  const handlePageRenderSuccess = () => {
    if (!pdfPageRef.current || pdfHeight !== 0) {
      return
    }
    const { height } = pdfPageRef.current.getBoundingClientRect()
    setPdfHeight(height)
  }

  return (
    <div className="app-pdf__preview-outline">
      <Document file={pdfFile} onLoadSuccess={handlePdfLoadSuccess}>
        {Array.from({ length: pdfAllPages }, (i) => i).map((page, pageIndex) => (
          <div className="app-pdf__preview-outline__wrap" key={`thumbnail_${pageIndex + 1}`}>
            <div className={`app-pdf__preview-outline__page ${pageIndex === currentPage ? 'active' : ''}`}>
              {loadCanvas && (
                <>
                  <Thumbnail
                    inputRef={pdfPageRef}
                    pageIndex={pageIndex}
                    width={pdfWidth}
                    onRenderSuccess={handlePageRenderSuccess}
                  />
                </>
              )}
            </div>

            <p className="app-pdf__preview-outline__page-number">{pageIndex + 1}</p>
          </div>
        ))}
      </Document>
    </div>
  )
}
