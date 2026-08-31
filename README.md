# Rfast Mail — projeto Vercel

## Estrutura

```
index.html          a plataforma (servida na raiz)
api/disparar.js     função de servidor que guarda a chave de operação
```

## Como publicar

Arraste esta pasta inteira para https://vercel.com/new — ou use a CLI.
Não há build nem dependências: `npm install` não é necessário.

## ORDEM DE CONFIGURAÇÃO (importante)

1. Publicar o projeto
2. LIGAR A PROTEÇÃO em Settings → Deployment Protection → Vercel Authentication
3. SÓ ENTÃO cadastrar a variável de ambiente abaixo

Enquanto a variável não existir, o endpoint de disparo devolve erro — então
uma janela de URL desprotegida não permite enviar nada.

## Variável de ambiente

Settings → Environment Variables:

| Nome            | Valor                                              |
|-----------------|----------------------------------------------------|
| `RFAST_OPS_KEY` | a mesma cadastrada nos secrets do Supabase         |

Opcional, só se a URL da função mudar:

| Nome           | Valor                                                                 |
|----------------|-----------------------------------------------------------------------|
| `RFAST_FN_URL` | https://sjgtriryzpjzmhjcikbk.supabase.co/functions/v1/rfast-disparar   |

Após cadastrar, faça um novo deploy (Redeploy) para a variável ser lida.

## O que muda em relação ao arquivo local

- Sem campo de senha na tela: o servidor autoriza
- Sem `Failed to fetch`: a página tem origem HTTP de verdade
- A `RFAST_OPS_KEY` nunca chega ao navegador

## O que NÃO está aqui

As demais chaves seguem apenas no Supabase, em Edge Functions → Secrets:
`RESEND_API_KEY` e `RFAST_WEBHOOK_SECRET`. Não replicar na Vercel.
