# Márcio Aquino | Corretor de Imóveis em Paulista-PE

Landing page estática (HTML + CSS + JS puro, sem build). Basta abrir `index.html` ou publicar a pasta em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages).

## O que editar

| O quê | Onde |
|---|---|
| Imóveis (fictícios por enquanto), vídeos do YouTube (`youtubeCanalId` mostra os últimos vídeos automaticamente), depoimentos | `js/dados.js` |
| Logo | `assets/logo-corretor-paulista.webp` (site), `.png` (SEO/compartilhamento) e `assets/favicon.png` |
| Foto da seção "Minha História" | `index.html`, seção `#historia` (ex.: `assets/marcio.jpg`) |
| Marcos da carreira (primeira venda, valores...) | `index.html`, bloco `BLOCO EDITÁVEL — MARCOS DA CARREIRA` |
| Domínio usado no SEO (canonical / JSON-LD) | `index.html`, `<head>` — hoje `www.corretorpaulista.com.br` (placeholder) |

O formulário de contato não precisa de servidor: ele abre o WhatsApp com nome, telefone e interesse já preenchidos.
