import closeIcon from '../../../assets/close.svg'

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

  return (
    <div className='chat-window-header'>
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