import React, { useState, useEffect } from 'react'
import './index.less'
import { throttle } from 'lodash-es'

interface PropsType {
  onSizeChange: (mouseX: number) => void
}

export const SizeAdjuster = (props: PropsType) => {
  const [down, setDown] = useState(false)
  const [translateX, setTranslateX] = useState(960) // 水平方向偏移量

  const onmousedown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDown(true)
    setTranslateX(event.clientX)
  }

  const onMouseMove = throttle((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (down) {
      setTranslateX(event.clientX)
      props.onSizeChange(event.clientX)
    }
  }, 150)

  const onMouseUp = () => {
    setDown(false)
    window.removeEventListener('mousemove', onMouseMove, false)
    window.removeEventListener('mouseup', onMouseUp, false)
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false)
      window.removeEventListener('mouseup', onMouseUp, false)
    }
  }, [down, translateX])

  return <div className="size-adjuster" onMouseDown={(event) => onmousedown(event)}></div>
}
