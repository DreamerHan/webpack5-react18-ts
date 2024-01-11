import React from 'react'
import './index.less'

interface PropsType {
  pageWidth: number | string
  pageHeight: number | string
  isOutline?: boolean
}

export const PageLoading = (props: PropsType) => {
  const { pageWidth, pageHeight, isOutline = false } = props

  return (
    <div
      className="page__preview__loading"
      style={{
        width: pageWidth,
        height: pageHeight,
      }}>
      <div className="page__preview__loading__title">
        <span className="page__preview__loading__effect"></span>
      </div>
      {Array.from({ length: isOutline ? 3 : 10 }).map((item, index) => (
        <div
          className="page__preview__loading__main"
          style={{ marginTop: isOutline ? 10 : index === 0 ? 60 : 16 }}
          key={index}>
          <span className="page__preview__loading__effect"></span>
        </div>
      ))}
    </div>
  )
}
