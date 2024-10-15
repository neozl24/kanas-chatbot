import { CSSProperties } from 'react'
import { Header } from './components/Header'
import { MessageList } from './components/MessageList'
import { BottomArea } from './components/BottomArea'
import { useMessages } from './hooks/useMessages'

import './index.css'

interface ChatWindowProps {
  url: string
  title: string
  onClose: () => void
  style?: CSSProperties
  topChildren?: React.ReactNode
  bottomChildren?: React.ReactNode
  aiLogo?: React.ReactNode
}

export const ChatWindow = ({
  url,
  title,
  onClose,
  style,
  topChildren,
  bottomChildren,
  aiLogo,
}: ChatWindowProps) => {
  const { messages, submitInput } = useMessages(url)

  return (
    <div className='chat-window-container' style={style}>
      <Header title={title} onClose={onClose} topChildren={topChildren} />
      <MessageList list={messages} aiLogo={aiLogo} />
      <BottomArea submitInput={submitInput} bottomChildren={bottomChildren} />
    </div>
  )
}