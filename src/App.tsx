import { ChatWindow } from 'kanas-chatbot'
import logo from './assets/logo.svg'
import './App.css'

function App() {
  const topLine = (
    <>
      <img src={logo} alt='logo image' width='20' />
      <span style={{ marginLeft: 10 }}>Chatbot</span>
    </>
  )

  const bottomLine = (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', fontSize: 12 }}>
      Tel: 000-0000
    </div>
  )

  return (
    <>
      <div>Preview</div>
      <div style={{ width: 500, height: 900, margin: '20px auto' }}>
        <ChatWindow
          url='http://127.0.0.1:8080/chat'
          title="Chat With AI"
          onClose={() => {
            console.log('close chat window')
          }}
          style={{ borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 16px'}}
          topChildren={topLine}
          bottomChildren={bottomLine}
        />
      </div>
    </>
  )
}

export default App
