import { useEffect, useState } from 'react'

export const useTimer = () => {
  const [timer, resetTimer] = useState(60)

  useEffect(() => {
    let timeOut
    if (timer >= 1) {
      timeOut = setTimeout(() => {
        resetTimer(prev => prev - 1)
      }, 1000)
    } else {
      resetTimer(0)
    }

    return () => {
      clearTimeout(timeOut)
    }
  }, [timer])

  return {
    timer,
    resetTimer
  }
}
