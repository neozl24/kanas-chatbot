// import { useState } from 'react'

import './index.css'

interface MessageListProps {
  list?: string[]
}

export const MessageList = ({
  list,
}: MessageListProps) => {
  

  return (
    <div className='chat-window-message-list'>
      {
        list?.map((item) => (
          item
        ))
      }
    </div>
  )
}