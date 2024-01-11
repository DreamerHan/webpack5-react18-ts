import React, { useEffect, useState } from 'react'
import './index.less'
import cls from 'classnames'

export const Pager = ({
  total = 10,
  current = 1,
  prevDisabled = false,
  nextDisabled = false,
  clickNextPage,
  clickPrevPage,
  jumpPage,
}) => {
  const [value, setValue] = useState(current || 1)

  const onClickPrevPage = () => {
    !prevDisabled && clickPrevPage()
  }

  const onClickNextPage = () => {
    !nextDisabled && clickNextPage()
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      let jumpVal = event.target.value

      if (jumpVal < 1) {
        setValue(1)
        jumpVal = 1
      }

      jumpPage(jumpVal)
    }
  }

  const handleInputChange = (event) => {
    const inputVal = event.target.value
    let showValue

    if (/\D/g.test(inputVal)) {
      showValue = inputVal.replace(/\D/g, '')
    } else {
      showValue = inputVal >= total ? total : inputVal
    }

    setValue(showValue)
  }

  useEffect(() => {
    setValue(current)
  }, [current])

  return (
    <div className="preview-page__pager">
      <div
        className={cls('preview-page__pager-prev', prevDisabled && 'preview-page__pager-prev__disabled')}
        onClick={onClickPrevPage}>
        <i></i>
      </div>
      <div className="preview-page__pager-info">
        <div className="preview-page__pager-info__current">
          <input onKeyDown={handleInputKeyDown} onChange={handleInputChange} value={value >= total ? total : value} />
        </div>
        <div className="preview-page__pager-info__line">/</div>
        <div className="preview-page__pager-info__total">{total}</div>
      </div>
      <div
        className={cls('preview-page__pager-next', nextDisabled && 'preview-page__pager-next__disabled')}
        onClick={onClickNextPage}>
        <i></i>
      </div>
    </div>
  )
}
