import { ChatWindow } from 'kanas-chatbot'
import './App.css'

function App() {
  const bottomLine = (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', fontSize: 12 }}>
      Tel: 000-0000
    </div>
  )

  return (
    <>
      <div>
        Preview ChatWindow
      </div>
      <div style={{ width: 500, height: 600, margin: '20px auto' }}>
        <ChatWindow
          title="How can I help you with your queries?"
          onClose={() => {
            console.log('close chat window')
          }}
          topChildren={'Hello !'}
          style={{ borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 16px'}}
          bottomChildren={bottomLine}
        />
      </div>
    </>
  )
}

export default App
