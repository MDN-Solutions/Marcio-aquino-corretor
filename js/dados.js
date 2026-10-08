/* =====================================================================
   DADOS EDITÁVEIS DO SITE — edite aqui sem mexer no restante do código
   ===================================================================== */

const CONFIG = {
  whatsapp: "558198784049",          // somente números, com DDI 55 + DDD
  telefone2: "5581987396956",
  instagram: "https://www.instagram.com/corretor_paulista",
  youtube: "https://www.youtube.com/@corretor_paulistape",
  // ID do canal (começa com "UC"). Com ele preenchido, a seção de vídeos mostra
  // automaticamente os últimos vídeos publicados, sem precisar editar nada depois.
  // Como achar: YouTube → seu canal → "Mais sobre este canal" → "Compartilhar canal" → "Copiar ID do canal".
  youtubeCanalId: "",
  tiktok: "https://www.tiktok.com/@corretor_paulista",
  facebook: "https://www.facebook.com/corretorpaulista/",
};

/* ---------------------------------------------------------------------
   IMÓVEIS — DADOS FICTÍCIOS DE EXEMPLO. Substitua pelos imóveis reais.
   finalidade: "comprar" ou "alugar"
   tipo: "Casa", "Apartamento", "Terreno", "Casa de praia"...
   foto: URL da imagem (ideal: 1200px de largura, formato .webp/.jpg)
   --------------------------------------------------------------------- */
const IMOVEIS = [
  {
    titulo: "Casa contemporânea com piscina",
    finalidade: "comprar", tipo: "Casa", bairro: "Janga",
    area: 320, quartos: 4, vagas: 3, valor: 1850000,
    foto: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=70",
  },
  {
    titulo: "Casa de praia pé na areia",
    finalidade: "comprar", tipo: "Casa de praia", bairro: "Pau Amarelo",
    area: 260, quartos: 4, vagas: 2, valor: 1290000,
    foto: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=70",
  },
  {
    titulo: "Apartamento com vista para o mar",
    finalidade: "comprar", tipo: "Apartamento", bairro: "Janga",
    area: 112, quartos: 3, vagas: 2, valor: 690000,
    foto: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=70",
  },
  {
    titulo: "Residência em condomínio fechado",
    finalidade: "comprar", tipo: "Casa", bairro: "Maranguape I",
    area: 210, quartos: 3, vagas: 2, valor: 820000,
    foto: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70",
  },
  {
    titulo: "Apartamento mobiliado",
    finalidade: "alugar", tipo: "Apartamento", bairro: "Centro",
    area: 78, quartos: 2, vagas: 1, valor: 2800,
    foto: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=70",
  },
  {
    titulo: "Casa ampla para temporada",
    finalidade: "alugar", tipo: "Casa de praia", bairro: "Pau Amarelo",
    area: 180, quartos: 3, vagas: 3, valor: 6500,
    foto: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=70",
  },
];

/* ---------------------------------------------------------------------
   VÍDEOS DO YOUTUBE (opcional se youtubeCanalId estiver preenchido) — cole o ID do vídeo (o trecho depois de "v=" na URL).
   Ex.: https://www.youtube.com/watch?v=AbCdEf12345  →  id: "AbCdEf12345"
   Enquanto o id estiver vazio, o card leva para o canal.
   --------------------------------------------------------------------- */
const VIDEOS = [
  { id: "", titulo: "Último vídeo do canal" },
  { id: "", titulo: "Penúltimo vídeo do canal" },
  { id: "", titulo: "Antepenúltimo vídeo do canal" },
];

/* ---------------------------------------------------------------------
   DEPOIMENTOS — TEXTOS DE EXEMPLO. Substitua por depoimentos reais
   (com autorização dos clientes).
   --------------------------------------------------------------------- */
const DEPOIMENTOS = [
  {
    texto: "Espaço reservado para o depoimento de um cliente. Conte aqui como foi a experiência de comprar ou vender com o Márcio.",
    nome: "Nome do cliente", detalhe: "Comprou casa no Janga",
  },
  {
    texto: "Espaço reservado para o depoimento de um cliente. Destaque a atenção, a transparência e o cuidado em cada etapa.",
    nome: "Nome do cliente", detalhe: "Vendeu apartamento em Paulista",
  },
  {
    texto: "Espaço reservado para o depoimento de um cliente. Uma frase curta e verdadeira vale mais que um texto longo.",
    nome: "Nome do cliente", detalhe: "Alugou imóvel em Pau Amarelo",
  },
];
