import { useContext } from 'react'
import closeIcon from '../../../assets/close.svg'
import { ThemeColorContext } from '../../context'

import './index.css'

interface HeaderProps {
  title: string
  onClose: () => void
  topChildren?: React.ReactNode
}

export const Header = ({
  title,
  onClose,
  topChildren,
}: HeaderProps) => {
  const themeColor = useContext(ThemeColorContext)

  return (
    <div className='chat-window-header' style={{ backgroundColor: themeColor }}>
      <div className='top-line'>
        <div className='content'>{topChildren}</div>
        <img
          src={closeIcon}
          className="close-btn"
          alt="Close Button"
          onClick={() => {
            onClose()
          }}
        />
      </div>
      <div className='title'>{title}</div>
    </div>
  )
}