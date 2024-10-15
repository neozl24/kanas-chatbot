import { useContext, useLayoutEffect, useRef } from 'react'
import defaultAiIcon from '../../../assets/ai.svg'
import { ThemeColorContext } from '../../context'
import { Message } from '../../utils/types'
import { convertToRgba } from '../../utils/convertColor'

import './index.css'

interface MessageListProps {
  list: Message[]
  aiLogo?: React.ReactNode
}

export const MessageList = ({
  list,
  aiLogo,
}: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }
    container.scrollTop = container.scrollHeight
  }, [list])

  return (
    <div className='chat-window-message-list' ref={containerRef}>
      {
        list?.map((item, index) => (
          item.role === 'assistant' ?
            <AssistantMessage key={`msg-${index}`} logo={aiLogo} content={item.content} /> :
            <UserMessage key={`msg-${index}`} content={item.content} />
        ))
      }
    </div>
  )
}

const AssistantMessage = ({
  content,
  logo,
}: {
  content: string
  logo?: React.ReactNode
}) => {
  const defaultAiLogo = <img className='default-assistant-logo' src={defaultAiIcon} alt='ai logo' width={30} />

  return (
    <div className='assistant-message-container'>
      <div className='assistant-logo-area'>
        {logo || defaultAiLogo}
      </div>
      <div className='assistant-message-area'>
        <div className='assistant-message-content'>{content}</div>
      </div>
    </div>
  )
}

const UserMessage = ({
  content,
}: {
  content: string
}) => {
  const themeColor = useContext(ThemeColorContext)
  const backgroundColor = convertToRgba(themeColor)

  return (
    <div className='user-message-container'>
      <div className='user-message-area'>
        <div className='user-message-content' style={{ backgroundColor }}>
          {content}
        </div>
      </div>
    </div>
  )
}