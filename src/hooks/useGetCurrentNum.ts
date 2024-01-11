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
  const itemsDomRef = useRef<NodeListOf<Element>>()

  // 暴露滚动到指定页面的方法，方便应用钩子的组件能跳转到指定页面
  const scrollToTargetPage = (page: number) => {
    if (!itemsDomRef.current && scrollContainer.current) {
      itemsDomRef.current = scrollContainer.current.querySelectorAll(itemClass)
    }

    // 这里要减去1，比如当要翻到第二页时，元素要滚动过的距离其实就是第一页的高度
    if (itemsDomRef.current[page - 1]) {
      const offsetTop = (itemsDomRef.current[page - 1] as HTMLDivElement).offsetTop
      scrollContainer.current.scrollTop = offsetTop
      setValue(page)
    }
  }

  // dom 元素滚动
  const handleDomScroll = throttle(() => {
    if (!itemsDomRef.current) {
      itemsDomRef.current = document.querySelectorAll(itemClass)
    }

    if (!itemsDomRef.current && itemsDomRef.current.length === 0) {
      return
    }

    for (let i = 0; i < itemsDomRef.current.length; i++) {
      const { top } = itemsDomRef.current[i].getBoundingClientRect()

      // 容器滚动时，每一页距离浏览器可视口顶部的距离越来越小直到负数，小于滚动容器一半时，就切换到下一页
      if (top >= 0 && top < containerHeight / 2) {
        setValue(i + 1)
        break
      }

      // 上一页变成了负数不再进入上一个判断中，下一页距离顶部的距离肯定大于容器的一半高度，切换到下一页
      if (top > containerHeight / 2) {
        setValue(i === 0 ? 1 : i)
        break
      }

      if (i === itemsDomRef.current.length - 1) {
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

  return { value, scrollToTargetPage }
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
 * 即：Math.ceil(scrollContainer.current.scrollTop / itemsDomRef.current.getBoundingClientRect().height)
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