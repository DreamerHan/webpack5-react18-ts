import React, { useState, useEffect } from 'react'
import './index.less'

interface PropsType {
  onSizeChange: (mouseX: number) => void
}

export const SizeAdjuster = (props: PropsType) => {
  const [down, setDown] = useState(false)

  const onmousedown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDown(true)
  }

  const onMouseMove = (event) => {
    if (down) {
      props.onSizeChange(event.clientX)
    }
  }

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
  }, [down])

  return <div className="size-adjuster" onMouseDown={(event) => onmousedown(event)}></div>
}
