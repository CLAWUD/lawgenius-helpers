
export async function queryChatbot(query: string, language: string = 'en') {
  try {
    const response = await fetch('/api/legal-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, language }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from the chatbot');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error querying chatbot:', error);
    throw error;
  }
}
