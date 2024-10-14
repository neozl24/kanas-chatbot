import { CSSProperties } from 'react'
import { Header } from './components/Header'
import { MessageList } from './components/MessageList'
import { BottomArea } from './components/BottomArea'

import './index.css'
import { Message } from './utils/types'

interface ChatWindowProps {
  title: string
  onClose: () => void
  style?: CSSProperties
  topChildren?: React.ReactNode
  bottomChildren?: React.ReactNode
  aiLogo?: React.ReactNode
}

export const ChatWindow = ({
  title,
  onClose,
  style,
  topChildren,
  bottomChildren,
  aiLogo,
}: ChatWindowProps) => {
  const submitInput = (text: string) => {
    console.log('submit: ', text)
  }

  const messages: Message[] = [
    {
      role: 'assistant', 
      content: 'Can I assist you with any questions or concerns you might have?',
    },
    {
      role: 'user', 
      content: 'Is free plan available?',
    },
    {
      role: 'assistant', 
      content: 'Let me see...',
    },
  ]

  return (
    <div className='chat-window-container' style={style}>
      <Header title={title} onClose={onClose} topChildren={topChildren} />
      <MessageList list={messages} aiLogo={aiLogo} />
      <BottomArea submitInput={submitInput} bottomChildren={bottomChildren} />
    </div>
  )
}