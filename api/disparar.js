// Rfast Mail — ponte entre o navegador e a função de disparo no Supabase.
//
// Por que ela existe: a RFAST_OPS_KEY não pode ficar no navegador. Aqui ela
// vive como variável de ambiente do servidor e nunca é enviada ao cliente.
//
// Variáveis necessárias (Vercel → Settings → Environment Variables):
//   RFAST_OPS_KEY   — a mesma cadastrada nos secrets do Supabase
//   RFAST_FN_URL    — opcional; por padrão aponta para a função do projeto

const FN_PADRAO =
  'https://sjgtriryzpjzmhjcikbk.supabase.co/functions/v1/rfast-disparar';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'use POST' });
  }

  const chave = process.env.RFAST_OPS_KEY;
  if (!chave) {
    return res.status(500).json({
      erro: 'RFAST_OPS_KEY não configurada nas variáveis de ambiente da Vercel',
    });
  }

  const destino = process.env.RFAST_FN_URL || FN_PADRAO;

  // aceita apenas as ações previstas — o corpo vem do navegador
  const acoes = ['criar', 'enviar', 'status'];
  const corpo = req.body && typeof req.body === 'object' ? req.body : {};
  if (!acoes.includes(corpo.acao)) {
    return res.status(400).json({ erro: 'ação inválida' });
  }

  try {
    const r = await fetch(destino, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rfast-key': chave,
      },
      body: JSON.stringify(corpo),
    });

    const texto = await r.text();
    res.status(r.status);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.send(texto);
  } catch (e) {
    return res.status(502).json({ erro: 'falha ao contatar o servidor de disparo: ' + String(e) });
  }
}
