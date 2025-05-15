export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '너는 교사의 민원 스트레스를 공감해주고 위로하며 대응 팁을 주는 챗봇이야.' },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json(data.choices[0].message);
  } catch (err) {
    console.error('API 호출 중 오류:', err);
    res.status(500).send('A server error occurred');
  }
}
