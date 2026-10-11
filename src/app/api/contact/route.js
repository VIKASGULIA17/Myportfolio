export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || name.length < 2) {
      return Response.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
    }
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 })
    }
    if (!message || message.length < 10) {
      return Response.json({ error: 'Message must be at least 10 characters' }, { status: 400 })
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Telegram credentials not configured')
      return Response.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const text = `📬 Portfolio Contact:\n👤 ${name}\n📧 ${email}\n📝 ${subject || 'N/A'}\n💬 ${message}`

    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    })

    if (!telegramRes.ok) {
      const errorData = await telegramRes.json()
      console.error('Telegram API error:', errorData)
      return Response.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}