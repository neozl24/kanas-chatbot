# Kanas Chatbot

This library provides a React client-side component for Chating with Baidu Qianfan LLM.

## Frontend

### install dependency
```
npm install kanas-chatbot
```

### use the component in your react project
```js
import { ChatWindow } from 'kanas-chatbot'
import 'kanas-chatbot/dist/style.css'

const MyComponent = () => {
  // the url here should be your ai-chat api, which will be explained in "Backend" part below
  const url = '<YOUR_CHAT_API>'
  const handleClose = () => {
    console.log('close chat window')
  }
  const containerStyle = { width: 500, height: 900 }
  const windowStyle = { borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 16px' }

  return (
    <div style={containerStyle}>
      <ChatWindow
        url={url}
        title="How can I help you?"
        onClose={handleClose}
        style={windowStyle}
      />
    </div>
  )
}
```

## Backend

To communicate with LLM service, you have to prepare your api key first.
This api key must not be public to your clients, and that means you should have your own backend server, 
which communicates between your clients and LLM service.

This instruction will show how to write your own chat api in NodeJS.

### Get your own Baidu Qianfan API key
Follow the instructions of [Baidu Cloud Page](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/7lte7zhab) to get your Access Key and Secret Key.

### Create an Express.js server
1. We will start by setting up a new Node.js and TypeScript project, and install the dependencies.
Create a new directory for your project, navigate to it, and run the following commands:

```
npm init --yes
npm install --dev typescript ts-node @types/node @types/express @types/cors
npm install express cors dotenv @baiducloud/qianfan
npx tsc --init
```

2. Create a file called `.env` and save your Access Key and Secret Key in it.
```
QIANFAN_ACCESS_KEY='<YOUR_ACCESS_KEY>'
QIANFAN_SECRET_KEY='<YOUR_SECRET_KEY>'
```

3. Create a file called index.ts and add the following code:

```ts
import { ChatCompletion } from "@baiducloud/qianfan";
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

// load environment variables
import 'dotenv/config'

const qianfanClient = new ChatCompletion({
  QIANFAN_ACCESS_KEY: process.env.QIANFAN_ACCESS_KEY,
  QIANFAN_SECRET_KEY: process.env.QIANFAN_SECRET_KEY,
});

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

```


4. Then Modify `index.ts` file to add a new endpoint:

```ts
// It's important to note that the new API is created with post method.
// This is a requirement for integration.
app.post('/chat', async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages) {
    res.status(400).send({ error: 'messages is required' });
    return
  }

  try {
    const stream = await qianfanClient.chat(
      {
        messages,
        stream: true,
      },
      'ERNIE-Tiny-8K'   // you can change to other models
    );
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');

    // respond in stream
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`)
    }
    res.end()

  } catch (error) {
    // Error communicating with Baidu Qianfan AI
    res.status(500).send({ error });
  }
})
```

5. Run your Express.js application using the following command:
```
npx ts-node index.ts
```
This will run your development server on **http://localhost:8080**
and you will have a new endpoint at POST **http://localhost:8080/chat** that is powered by Qianfan LLM model.

6. Now you can go back to your client-side React component,
and change the *url* prop of `ChatWindow` to your new endpoint - **http://localhost:8080/chat**.
If everything is configured correctly, it should work as expected.