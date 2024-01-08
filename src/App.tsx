import React from 'react'
import './App.less'
import { Outline, Main, Pager } from '@src/components'

import { pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url).toString()
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

const App = () => {
  return (
    <div className="app-pdf">
      <div className="app-pdf__left">
        <div className="app-pdf__toolbar">
          <Pager />
        </div>

        <div className="app-pdf__preview">
          <Outline />
          <Main />
        </div>
      </div>

      <div className="app-pdf__right">
        <div>右侧会话模块</div>
      </div>
    </div>
  )
}

export default App
