import React from 'react'
import './App.less'
import { Outline, Main } from '@src/components'

const App = () => {
  return (
    <div className="app-pdf">
      <div className="app-pdf__left">
        <div className="app-pdf__toolbar">顶部工具栏</div>

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
