import React, { useEffect, useRef, useState } from 'react'
import './index.less'

// react-pdf@7
import { Document, Page } from 'react-pdf'
import pdfFile from '@src/assets/pdfs/kejian.pdf'

// pdf 页面的
const pdfMainPaddingSize = 24

export const Main = () => {
  const [pdfAllPages, setPdfAllPage] = useState<number>(0) // pdf 的总页数
  const [pdfShowPages, setPdfShowPages] = useState<number>(0) // pdf 展示的页数

  const [pdfLoadSuccess, setPdfLoadSuccess] = useState<boolean>(false) // pdf文档加载结束

  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 }) // pdf预览父级dom的初始化宽高

  const [pdfPageWidth, setPdfPageWidth] = useState<number>(300) // pdf 页面宽度
  const [pdfPageHeight, setPdfPageHeight] = useState<number>(0) // pdf 页面高度

  const pdfPreviewContainerRef = useRef<HTMLDivElement | null>(null)
  const pdfPageRef = useRef<HTMLDivElement | null>(null)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    // 保存pdf全部页数
    setPdfAllPage(numPages)

    // 保存当前展示的页面数量，尤其是第一次只渲染一页，用于快速计算pdf页面的高度
    setPdfShowPages(1)

    setPdfLoadSuccess(true)
  }

  // 计算PDF页面的宽度
  const calculatePdfPageWidth = () => {
    if (!pdfPreviewContainerRef.current) {
      return
    }

    const { width, height } = pdfPreviewContainerRef.current.getBoundingClientRect()
    setContainerSize({ width: width - pdfMainPaddingSize, height: height })

    setPdfPageWidth(width - pdfMainPaddingSize)
  }

  // 页面渲染结束后，才可以计算到 pdf 页面的高度
  const handlePdfPageRenderSuccess = () => {
    if (!pdfPageRef.current || pdfPageHeight === 0) {
      return
    }

    const { height } = pdfPageRef.current.getBoundingClientRect()
    setPdfPageHeight(height)
  }

  useEffect(() => {
    // 初始化时，pdf的宽度是适配当前展示文档的dom的宽度，骨架屏的宽高更是要适配当前展示文档dom的宽高。
    // 所以，直接加载空白父级dom计算当前pdf的宽度即可
    calculatePdfPageWidth()
  }, [])

  return (
    <div className="app-pdf__preview-main">
      <div className="app-pdf__preview-hidden">
        <div className="app-pdf__preview-scroll" ref={pdfPreviewContainerRef}>
          <div className="app-pdf__preview-document" style={{ width: Math.min(pdfPageWidth, 1200) }}>
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from({ length: pdfAllPages }, (_, index) => index).map((item) => (
                <Page
                  inputRef={pdfPageRef}
                  className="app-pdf__preview__pdf-page"
                  key={item}
                  pageIndex={item}
                  width={Math.min(pdfPageWidth, 1200)}
                  onRenderSuccess={handlePdfPageRenderSuccess}
                />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </div>
  )
}
