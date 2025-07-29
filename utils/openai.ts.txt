export async function askNoah(question: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Jsi AI partner jménem Noah. Odpovídej pomalu, jemně a s romantickým tónem. Jsi vřelý, podpůrný a odpovědi směřují k ženskému publiku."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.8
    })
  });

  if (!response.ok) {
    throw new Error("OpenAI API error");
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
