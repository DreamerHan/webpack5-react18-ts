import React, { useContext, useEffect, useState } from 'react'
import './index.less'
import { debounce } from 'lodash-es'

import { ReactPdfContext } from '@src/context/reactPdfContext'
import { SizeAdjuster } from '@src/pages/react-pdf/components'

const miniWidth = 300

export const LayoutRight = () => {
  const { dispatch: pdfDispatch } = useContext(ReactPdfContext)

  const [pageWidth, setPageWidth] = useState<number>(0)
  const [width, setWidth] = useState<number>(miniWidth)

  // 初始化或设置布局的宽度
  const setLayoutPartWidth = () => {
    const pageDom = document.querySelector('.app-pdf')
    const { width } = pageDom.getBoundingClientRect()
    setPageWidth(width)
    pdfDispatch && pdfDispatch({ previewWidth: pageWidth - Number(width) })
  }

  // dispatch 预览宽度
  const dispatchPreviewWith = debounce((currentChatWidth: number) => {
    pdfDispatch && pdfDispatch({ previewWidth: pageWidth - currentChatWidth })
  }, 1000)

  const handleOnSizeChange = (mouseX: number) => {
    pageWidth === 0 && setLayoutPartWidth()

    // 当前的布局，会话模块就在最右侧。所以，浏览器可视宽度 - 拖拽条上的鼠标距离最左侧的位置 = 最右侧的宽度
    // 小于最小宽度时停止更新宽度
    const currentChatWidth = pageWidth - mouseX
    if (currentChatWidth <= miniWidth) {
      return
    }
    setWidth(currentChatWidth)

    dispatchPreviewWith(currentChatWidth)
  }

  useEffect(() => {
    setLayoutPartWidth()
  }, [])

  return (
    <div
      className="app-pdf__right"
      style={{ width: width, minWidth: miniWidth }}>
      <SizeAdjuster onSizeChange={handleOnSizeChange} />
    </div>
  )
}