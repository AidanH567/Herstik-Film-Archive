import { useState } from "react"

export default function useCarousel(items, step = 6) {
  const [index, setIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const next = () => {
    if (!items.length) return

    setIsTransitioning(true)

    setTimeout(() => {
      setIndex(prev => (prev + step) % items.length)
      setIsTransitioning(false)
    }, 150)
  }

  const back = () => {
    if (!items.length) return

    setIsTransitioning(true)

    setTimeout(() => {
      setIndex(prev => {
        const newIndex = prev - step
        return newIndex < 0
          ? items.length - step
          : newIndex
      })
      setIsTransitioning(false)
    }, 150)
  }

  const currentItems = items.slice(index, index + step)

  return {
    currentItems,
    next,
    back,
    isTransitioning
  }
}