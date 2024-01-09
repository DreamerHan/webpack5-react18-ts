import React, { useRef, useEffect, useState } from 'react'
import { throttle } from 'lodash-es'

interface PropsType {
  scrollContainer: React.RefObject<HTMLElement>
  itemClass: string
  deps: any[]
}

// 1. 要知道监听滚动的dom是谁，所以参数要有滚动的dom
// 2. 要根据子集的信息来计算滚动到了第几个元素，暂定通过子集的 class 在内部获取子集dom
// 3. 大部分钩子都有的激活依赖 deps
const useGetCurrentNum = (props: PropsType) => {
  const { scrollContainer, itemClass, deps } = props

  const [value, setValue] = useState(1) // 滚动dom后的当前页数
  const [containerHeight, setContainerHeight] = useState(0)
  const itemDomRef = useRef<NodeListOf<Element>>()

  // dom 元素滚动
  const handleDomScroll = throttle(() => {
    if (!itemDomRef.current) {
      itemDomRef.current = document.querySelectorAll(itemClass)
    }

    if (!itemDomRef.current && itemDomRef.current.length === 0) {
      return
    }

    for (let i = 0; i < itemDomRef.current.length; i++) {
      const { top } = itemDomRef.current[i].getBoundingClientRect()

      if (top >= 0 && top < containerHeight / 2) {
        setValue(i + 1)
        break
      }

      if (top > containerHeight / 2) {
        setValue(i === 0 ? 1 : i)
        break
      }

      if (i === itemDomRef.current.length - 1) {
        setValue(i + 1)
      }
    }
  }, 300)

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.addEventListener('scroll', handleDomScroll, false)
      setContainerHeight(scrollContainer.current.getBoundingClientRect().height)

      return () => {
        scrollContainer.current.removeEventListener('scroll', handleDomScroll, false)
      }
    }
  }, [...deps])

  return { value }
}

export default useGetCurrentNum

// 这里备注一下当前方案产生的一个过程

/*** 方案1
 * 最初打算的计算方式是获取 scrollContainer 的滚动高度 scrollTop
 *
 * 然后获取列表中的一个元素的高度 getBoundingClientRect().height
 *
 * 然后通过 scrollTop / 单个元素的高度 来计算当前展示的个数
 *
 * 即：Math.ceil(scrollContainer.current.scrollTop / itemDomRef.current.getBoundingClientRect().height)
 *
 * 但是这种计算方式只能针对于文档高度相同的文件
 *
 * 如果中间有高度不同的元素，那就会计算出现问题。
 *
 * 所以就有了第二种方案。
 *
 * */

/*** 方案2
 *
 * 获取全部的子级 dom节点，获取每个子级 dom 节点的距离浏览器可视区域顶部的高度
 *
 * 利用这个顶部高度 和 滚动区域的高度做不同的对比
 *
 * */
