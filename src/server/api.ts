
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Define route handler properly
app.post('/api/legal-chat', (req, res) => {
  try {
    const { query, language = 'en' } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Call Groq API with Pinecone integration
    queryGroqWithPinecone(query, language)
      .then(response => {
        res.json({ response });
      })
      .catch(error => {
        console.error('Error in queryGroqWithPinecone:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error in legal-chat API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function queryGroqWithPinecone(userQuery: string, language: string) {
  const GROQ_API_KEY = "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";
  
  try {
    // For simplicity, we're calling Groq directly here without Pinecone integration
    // In a production app, you'd implement the full Python logic shown in the user's code
    const url = "https://api.groq.com/openai/v1/chat/completions";

    const headers = {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    };

    const data = {
      "model": "llama3-8b-8192",
      "messages": [
        {
          "role": "system", 
          "content": `You are a helpful legal assistant specializing in Indian law. 
                     Respond in ${language === 'en' ? 'English' : language} language.
                     You provide accurate information based on Indian legal codes,
                     including the IPC, CrPC, and relevant Supreme Court judgments.`
        },
        {"role": "user", "content": userQuery}
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  } catch (error) {
    console.error("Error querying Groq:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
}

export default app;
