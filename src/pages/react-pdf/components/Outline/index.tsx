import React, { useEffect, useRef, useState } from 'react'
import './index.less'
import { throttle } from 'lodash-es'

import { PageLoading } from '@src/pages/react-pdf/components'
import { Document, Thumbnail } from 'react-pdf'
import pdfFile from '@src/assets/pdfs/kejian.pdf'

interface PropsType {
  currentPage: number
  scrollToTargetPage: (page: number) => void
}

export const Outline = (props: PropsType) => {
  const { currentPage, scrollToTargetPage } = props

  const [pdfAllPages, setPdfAllPage] = useState<number>()
  const [pdfWidth, setPdfWidth] = useState<number>(104) // 总宽152 - padding20 - 边框4*2
  const [pdfHeight, setPdfHeight] = useState<number>(147) // 高度是根据实际情况调整的
  const [loadCanvas, setLoadCanvas] = useState<boolean>(true)

  const outlineWrapRef = useRef<HTMLDivElement | null>(null)
  const pdfPageRef = useRef<HTMLDivElement | null>(null)

  // PDF 加载成功
  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfAllPage(numPages)
  }

  // PDF Page 渲染成功后计算 pdf 页面的高度
  const handlePageRenderSuccess = () => {
    if (!pdfPageRef.current || pdfHeight !== 0) {
      return
    }
    const { height } = pdfPageRef.current.getBoundingClientRect()
    setPdfHeight(height)
  }

  // currentPage 变化，大纲滚动到对应的页面
  const outlineScrollToCurrentPage = () => {
    const outlineDoms = document.querySelectorAll('.app-pdf__preview-outline__wrap')
    if (!outlineDoms.length || !outlineDoms[currentPage - 1] || !outlineWrapRef.current) {
      return
    }

    // outlineDoms 是集合，索引从0开始，目标页就是 currentPage - 1
    const currentPageDom = outlineDoms[currentPage - 1] as HTMLElement
    const {
      top: pageTop,
      bottom: pageBottom,
      height: pageHeight,
    } = currentPageDom.getBoundingClientRect()
    const { top: containerTop } = outlineWrapRef.current.getBoundingClientRect()

    /***
     * 向下滑动时
     *   已经展现在屏幕上的元素不需要父级列表的滑动，不在屏幕上或不全在屏幕上的才需要列表发生滚动
     *   获取这个元素的底部到可视窗口的顶部的距离 getBoundingClient().bottom > 可视窗口高度 window.innerHeight
     *   此时就应该发生滚动
     *
     * 向上滑动时
     *   同样的已经展现在视野内的不需要列表滑动，不在屏幕上的才需要列表发生滚动
     *   顶部的目标页如果被隐藏的时候，目标页距离可视口顶部的高度 - 容器顶部距离可视口的高度 < 0
     *
     * */
    if (pageBottom > window.innerHeight || pageTop - containerTop < pageTop) {
      const outlineWrapScrollTop = outlineWrapRef.current.scrollTop
      const elementTop = pageTop + outlineWrapScrollTop

      const scrollToTop = elementTop - (window.innerHeight - pageHeight) / 2

      outlineWrapRef.current.scrollTo({
        top: scrollToTop,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    outlineScrollToCurrentPage()
  }, [currentPage])

  return (
    <div className="app-pdf__preview-outline" ref={outlineWrapRef}>
      <Document
        file={pdfFile}
        onLoadSuccess={handlePdfLoadSuccess}
        loading={
          <PageLoading pageWidth={pdfWidth} pageHeight={pdfHeight} isOutline={true} />
        }>
        {Array.from({ length: pdfAllPages }, (i) => i).map((page, pageIndex) => (
          <div
            className="app-pdf__preview-outline__wrap"
            key={`thumbnail_${pageIndex + 1}`}
            onClick={() => scrollToTargetPage(pageIndex + 1)}>
            <div
              className={`app-pdf__preview-outline__page ${
                pageIndex + 1 === currentPage ? 'active' : ''
              }`}>
              <Thumbnail
                inputRef={pdfPageRef}
                pageIndex={pageIndex}
                width={pdfWidth}
                loading={
                  <PageLoading
                    pageHeight={pdfHeight}
                    pageWidth={pdfWidth}
                    isOutline={true}
                  />
                }
                onRenderSuccess={handlePageRenderSuccess}
              />
            </div>

            <p className="app-pdf__preview-outline__page-number">{pageIndex + 1}</p>
          </div>
        ))}
      </Document>
    </div>
  )
}
