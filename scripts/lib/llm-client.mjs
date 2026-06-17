import OpenAI from 'openai';

let client = null;

function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    });
  }
  return client;
}

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o';

/**
 * Send a chat completion request with retry logic.
 */
export async function chatCompletion(messages, { temperature = 0.3, maxRetries = 3 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await getClient().chat.completions.create({
        model: MODEL,
        messages,
        temperature,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('Empty response from LLM');

      return JSON.parse(content);
    } catch (err) {
      lastError = err;
      console.warn(`LLM attempt ${attempt}/${maxRetries} failed:`, err.message);
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  throw lastError;
}
