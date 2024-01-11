import React, { useReducer } from 'react'

type ReactPdfProviderPropsType = {
  children: React.ReactNode
}

interface IReactPdfState {
  previewWidth: number // 预览模块宽度
}

type StateType = {
  state: IReactPdfState
  dispatch: React.Dispatch<Record<string, any>> | null
}

const defaultState = {
  previewWidth: 0,
}

// 创建 context 对象
const ReactPdfContext = React.createContext<StateType>({
  state: defaultState,
  dispatch: null,
})

// reducer 控制数据改变
const ReactPdfReducer = (state: any, action: Record<string, any>) => {
  return { ...state, ...action }
}

const ReactPdfProvider = ({ children }: ReactPdfProviderPropsType) => {
  const [state, dispatch] = useReducer(ReactPdfReducer, defaultState)

  const value = { state, dispatch }

  return <ReactPdfContext.Provider value={value}>{children}</ReactPdfContext.Provider>
}

export { ReactPdfProvider, ReactPdfContext }
