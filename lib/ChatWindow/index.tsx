import { CSSProperties } from 'react'
import { Header } from './components/Header'
import { MessageList } from './components/MessageList'
import { BottomArea } from './components/BottomArea'
import { ThemeColorContext, DEFAULT_THEME_COLOR } from './context'
import { useMessages } from './hooks/useMessages'

import './index.css'

interface ChatWindowProps {
  /**
   * your url to get AI chat stream response
   * 
   * see README to get more info about this url
   */
  url: string
  /**
   * title for chat window
   */
  title: string
  /**
   * callback function when clicking close button
   */
  onClose: () => void
  /**
   * custom style for chat window
   */
  style?: CSSProperties
  /**
   * your custom components to show in the top line of header
   */
  topChildren?: React.ReactNode
  /**
   * your custom components to show in the bottom line below input
   */
  bottomChildren?: React.ReactNode
  /**
   * custom ai logo, as the avatar of ai in conversation
   */
  aiLogo?: React.ReactNode
  /**
   * theme color, which impacts the background color of header of window and user message
   */
  themeColor?: string
}

export const ChatWindow = ({
  url,
  title,
  onClose,
  style,
  topChildren,
  bottomChildren,
  aiLogo,
  themeColor,
}: ChatWindowProps) => {
  const { messages, submitInput } = useMessages(url)

  return (
    <ThemeColorContext.Provider value={themeColor || DEFAULT_THEME_COLOR}>
      <div className='chat-window-container' style={style}>
        <Header title={title} onClose={onClose} topChildren={topChildren} />
        <MessageList list={messages} aiLogo={aiLogo} />
        <BottomArea submitInput={submitInput} bottomChildren={bottomChildren} />
      </div>
    </ThemeColorContext.Provider>
  )
}