import { CSSProperties } from 'react'
import { Header } from './components/Header'
import { MessageList } from './components/MessageList'
import { BottomArea } from './components/BottomArea'

import './index.css'

interface ChatWindowProps {
  title: string
  onClose: () => void
  style?: CSSProperties
  topChildren?: React.ReactNode
  bottomChildren?: React.ReactNode
}

export const ChatWindow = ({
  title,
  onClose,
  style,
  topChildren,
  bottomChildren,
}: ChatWindowProps) => {
  const submitInput = (text: string) => {
    console.log('submit: ', text)
  }

  return (
    <div className='chat-window-container' style={style}>
      <Header title={title} onClose={onClose} topChildren={topChildren} />
      <MessageList />
      <BottomArea submitInput={submitInput} bottomChildren={bottomChildren} />
    </div>
  )
}