// FEEL℃ VILLA - 見学予約フォーム送信API（Vercel Node環境対応）

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async (req, res) => {
  // プリフライト
  if (req.method === 'OPTIONS') {
    res.writeHead(200, HEADERS);
    return res.end();
  }

  if (req.method !== 'POST') {
    res.writeHead(405, HEADERS);
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    const { name, email, tel, date1, date2, message, website } = req.body || {};
    if (website) {
      res.writeHead(200, HEADERS);
      return res.end(JSON.stringify({ ok: true }));
    }

    if (!name || !email || !date1) {
      res.writeHead(400, HEADERS);
      return res.end(JSON.stringify({ error: 'Required fields missing' }));
    }

    const to = process.env.TO_EMAIL || 'info@feeldo.co.jp';
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      res.writeHead(500, HEADERS);
      return res.end(JSON.stringify({ error: 'Missing RESEND_API_KEY' }));
    }

    // Resend API 呼び出し
    const payload = {
      from: 'FEEL℃ VILLA <onboarding@resend.dev>',
      to: [to],
      subject: `【見学予約】${name} 様`,
      html: `
        <p>お名前: ${name}</p>
        <p>メール: ${email}</p>
        <p>電話: ${tel || '-'}</p>
        <p>第1希望日時: ${date1}</p>
        <p>第2希望日時: ${date2 || '-'}</p>
        <p>ご要望・ご質問:</p>
        <pre style="white-space:pre-wrap">${message || ''}</pre>
        <hr/>
        <p>送信元: FEEL℃ VILLA LP</p>
      `,
    };

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      res.writeHead(502, HEADERS);
      return res.end(JSON.stringify({ error: 'Email API error', detail: text }));
    }

    res.writeHead(200, HEADERS);
    return res.end(JSON.stringify({ ok: true }));
  } catch (e) {
    console.error('reserve.js error:', e);
    res.writeHead(500, HEADERS);
    return res.end(JSON.stringify({ error: 'Server error', detail: String(e) }));
  }
};
