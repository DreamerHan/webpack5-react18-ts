import React, { useState, useEffect, useRef, MutableRefObject } from 'react'
import './App.less'

// import aiImage from './assets/ai.png'
import { ReactPdf } from '@src/pages/index'

const App = () => {
  const [tsNum, setTsNum] = useState<number>(0)

  const domRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTsNum(10)
  }, [])

  return (
    <div className="app-page">
      <ReactPdf />
    </div>
  )
}

export default App
