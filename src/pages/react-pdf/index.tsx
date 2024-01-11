import React, { useEffect, useRef, useState } from 'react'
import './index.less'
import { Outline, Pager, PageLoading, LayoutRight } from '@src/pages/react-pdf/components'

import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.js',
  import.meta.url,
).toString()
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import pdfFile from '@src/assets/pdfs/kejian.pdf'

import useGetCurrentNum from '@src/hooks/useGetCurrentNum'

const pdfMainPaddingSize = 24
const pdfPageClass = 'app-pdf__preview__pdf-page'

const ReactPdf = () => {
  const [pdfAllPages, setPdfAllPage] = useState<number>(0) // pdf 的总页数
  const [pdfCurrentPage, setPdfCurrentPage] = useState<number>(0) // pdf 当前现实的页数

  const [pdfLoadSuccess, setPdfLoadSuccess] = useState<boolean>(false) // pdf文档加载结束

  const [containerSize, setContainerSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 }) // pdf预览父级dom的初始化宽高

  const [pdfPageWidth, setPdfPageWidth] = useState<number>(300) // pdf 页面宽度
  const [pdfPageHeight, setPdfPageHeight] = useState<number>(0) // pdf 页面高度

  const pdfPreviewContainerRef = useRef<HTMLDivElement | null>(null)
  const pdfPageRef = useRef<HTMLDivElement | null>(null)

  const { value: showPage, scrollToTargetPage } = useGetCurrentNum({
    scrollContainer: pdfPreviewContainerRef,
    itemClass: `.${pdfPageClass}`,
    deps: [pdfLoadSuccess],
  })

  useEffect(() => {
    setPdfCurrentPage(showPage)
  }, [showPage])

  // Pdf file 加载完成
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    // 保存pdf全部页数
    setPdfAllPage(numPages)
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
    <div className="app-pdf">
      <div className="app-pdf__left">
        <div className="app-pdf__toolbar">
          <Pager
            total={pdfAllPages}
            current={showPage}
            prevDisabled={showPage === 1}
            nextDisabled={showPage === pdfAllPages}
            clickNextPage={() => scrollToTargetPage(showPage + 1)}
            clickPrevPage={() => scrollToTargetPage(showPage - 1)}
            jumpPage={(page) => scrollToTargetPage(page)}
          />
        </div>

        <div className="app-pdf__preview">
          <Outline
            currentPage={pdfCurrentPage}
            scrollToTargetPage={(page) => scrollToTargetPage(page)}
          />

          <div className="app-pdf__preview-main">
            <div className="app-pdf__preview-hidden">
              <div className="app-pdf__preview-scroll" ref={pdfPreviewContainerRef}>
                <div
                  className="app-pdf__preview-document"
                  style={{ width: Math.min(pdfPageWidth, 1200) }}>
                  <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <PageLoading
                        pageWidth={Math.min(containerSize.width, 1200)}
                        pageHeight={containerSize.height}
                      />
                    }>
                    {Array.from({ length: pdfAllPages }, (_, index) => index).map(
                      (item) => (
                        <Page
                          inputRef={pdfPageRef}
                          className={pdfPageClass}
                          key={item}
                          pageIndex={item}
                          width={Math.min(pdfPageWidth, 1200)}
                          loading={
                            <PageLoading
                              pageWidth={Math.min(pdfPageWidth, 1200)}
                              pageHeight={containerSize.height}
                            />
                          }
                          onRenderSuccess={handlePdfPageRenderSuccess}
                        />
                      ),
                    )}
                  </Document>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LayoutRight />
    </div>
  )
}

export default ReactPdf
