import { useLayoutEffect, useRef, useState } from 'react'
import sendIcon from '../../../assets/send.svg'

import './index.css'

const MIN_TEXTAREA_HEIGHT = 30
const MAX_TEXTAREA_HEIGHT = 120

interface BottomAreaProps {
  submitInput: (message: string) => void
  bottomChildren?: React.ReactNode
}

export const BottomArea = ({
  submitInput,
  bottomChildren,
}: BottomAreaProps) => {
  const [message, setMessage] = useState('')
  const [isOverflow, setIsOverflow] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // make textarea auto size when text content changes, but not above max height
  useLayoutEffect(() => {
    if (textareaRef.current) {
      // reset height - important to shrink on delete
      textareaRef.current.style.height = 'inherit'

      const height = Math.min(
        textareaRef.current.scrollHeight, 
        MAX_TEXTAREA_HEIGHT,
      )
      textareaRef.current.style.height = `${height}px`
    }
  }, [message])

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)

    // create a temp canvas to measure the text width.
    // if this width is above limit, the send button should be on next line
    const canvas = document.createElement('canvas')

    const context = canvas.getContext('2d')
    if (!context || !textareaRef.current) {
      return
    }

    // use the same font style for textarea
    const style = window.getComputedStyle(textareaRef.current)
    context.font = `${style.fontSize} ${style.fontFamily}`

    const textWidth = context.measureText(value).width
    const maxSingleContentWidth = textareaRef.current.clientWidth - 80

    setIsOverflow(textWidth > maxSingleContentWidth)
  }

  const onSubmit = () => {
    const trimmed = message.trim()
    if (trimmed) {
      submitInput(trimmed)
      setMessage('')
      setIsOverflow(false)
    }
  }

  return (
    <div className='chat-window-bottom'>
      <div className='input-wrapper'>
        <textarea
          className='input-area'
          ref={textareaRef}
          placeholder='Type a message'
          value={message}
          rows={1}
          style={{
            minHeight: MIN_TEXTAREA_HEIGHT,
          }}
          onChange={onInputChange}
        />
        <div className={isOverflow ? 'multi-line-btn-area' : 'single-line-btn-area'}>
          <img
            src={sendIcon}
            className='submit-btn'
            alt='Submit Button'
            onClick={onSubmit}
          />
        </div>        
      </div>
      {
        bottomChildren ? <div className='bottom-line'>{bottomChildren}</div> : null
      }      
    </div>
  )
}