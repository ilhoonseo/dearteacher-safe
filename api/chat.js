export default async function handler(req, res) {
  const { messages } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '너는 교사 민원 스트레스를 위로하고 공감하며 대응 팁을 제공하는 상담 챗봇이야.' },
        ...messages
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json(data.choices[0].message);
}
