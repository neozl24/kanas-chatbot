import { Message, QianfanChatResp } from './types'

type HandleResp = (_chunk: QianfanChatResp) => void
type HandleError = (error: unknown) => void

type Options = {
  handleResp?: HandleResp
  handleError?: HandleError
}

export const fetchAi = async (
  url: string,
  messages: Message[],
  options?: Options
) => {
  const { handleResp, handleError } = options || {}

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  })
  if (!res.body) {
    const err = new Error('no response')
    handleError?.(err)
    throw err
  }

  const reader = res.body
    .pipeThrough(new TextDecoderStream()) // transform Uint8Array to string
    .getReader()

  while (true) {
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    const { done, value } = await reader.read()
    if (done) {
      // stream end
      break
    }

    if (!value || !value.includes('data: ')) {
      handleError?.(new Error('Invalid chunk'))
      return
    }

    const arr = value.split('data: ')
    const validParts = arr.map((part) => part.trim()).filter((part) => part)

    validParts.forEach((jsonStr) => {
      try {
        const data = JSON.parse(jsonStr) as QianfanChatResp
        handleResp?.(data)
      } catch (error) {
        handleError?.(error)
      }
    })
  }
}