/* Márcio Aquino | Corretor Paulista — interações */
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Links de WhatsApp com mensagem pré-preenchida ---------- */
  $$("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa); });

  /* ---------- Header: transparente → sólido ao rolar ---------- */
  const header = $("#topo");
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const burger = $("#burger"), nav = $("#nav");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Animações ao rolar ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;
  const observe = (el) => (io ? io.observe(el) : el.classList.add("is-visible"));
  $$(".reveal").forEach(observe);

  /* ---------- Imóveis + filtros ---------- */
  const lista = $("#lista-imoveis"), vazio = $("#sem-imoveis"), filtros = $("#filtros");
  const fillSelect = (sel, values) => [...new Set(values)].sort().forEach((v) => sel.add(new Option(v, v)));
  fillSelect($("#f-tipo"), IMOVEIS.map((i) => i.tipo));
  fillSelect($("#f-bairro"), IMOVEIS.map((i) => i.bairro));

  const cardHTML = (i) => {
    const aluguel = i.finalidade === "alugar";
    const msg = `Olá, Márcio! Quero saber mais sobre o imóvel "${i.titulo}" (${i.tipo} no ${i.bairro}, ${i.area} m², ${brl(i.valor)}${aluguel ? "/mês" : ""}).`;
    return `
      <article class="card reveal">
        <div class="card__media">
          <img src="${esc(i.foto)}" alt="${esc(i.titulo)} — ${esc(i.bairro)}, Paulista-PE" loading="lazy" width="1200" height="900" onerror="this.remove()">
          <span class="card__tag">${aluguel ? "Aluguel" : "Venda"}</span>
        </div>
        <div class="card__body">
          <p class="card__place">${esc(i.bairro)} · ${esc(i.tipo)}</p>
          <h3>${esc(i.titulo)}</h3>
          <ul class="card__specs">
            <li>${i.area} m²</li>
            ${i.quartos ? `<li>${i.quartos} quartos</li>` : ""}
            ${i.vagas ? `<li>${i.vagas} vagas</li>` : ""}
          </ul>
          <div class="card__foot">
            <span class="card__price">${brl(i.valor)}${aluguel ? " <small>/mês</small>" : ""}</span>
            <a class="btn btn--navy" href="${waLink(msg)}" target="_blank" rel="noopener">Quero saber mais</a>
          </div>
        </div>
      </article>`;
  };

  const render = () => {
    const f = new FormData(filtros);
    const fin = f.get("finalidade"), tipo = f.get("tipo"), bairro = f.get("bairro");
    const itens = IMOVEIS.filter((i) =>
      (fin === "todos" || i.finalidade === fin) && (!tipo || i.tipo === tipo) && (!bairro || i.bairro === bairro));
    lista.innerHTML = itens.map(cardHTML).join("");
    vazio.hidden = itens.length > 0;
    $$(".reveal", lista).forEach(observe);
  };
  filtros.addEventListener("change", render);
  render();

  /* ---------- Vídeos do YouTube (carregamento sob demanda) ---------- */
  const temIds = VIDEOS.some((v) => v.id);
  if (!temIds && /^UC[\w-]{22}$/.test(CONFIG.youtubeCanalId || "")) {
    // Playlist de uploads do canal: sempre mostra os vídeos mais recentes
    const uploads = "UU" + CONFIG.youtubeCanalId.slice(2);
    const row = $("#lista-videos");
    row.classList.add("videos__row--playlist");
    row.innerHTML = `<article class="video reveal"><div class="video__frame">
      <iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=${uploads}&rel=0" title="Últimos vídeos do canal" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>
      </div><h3>Últimos vídeos do canal</h3></article>`;
  } else $("#lista-videos").innerHTML = VIDEOS.map((v) => {
    const thumb = v.id ? `<img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="Miniatura do vídeo: ${esc(v.titulo)}" loading="lazy" width="480" height="360">` : "";
    const action = v.id
      ? `<button class="video__play" data-id="${esc(v.id)}" aria-label="Assistir: ${esc(v.titulo)}"><i></i></button>`
      : `<a class="video__play" href="${CONFIG.youtube}" target="_blank" rel="noopener" aria-label="Ver no YouTube: ${esc(v.titulo)}"><i></i></a>`;
    return `<article class="video reveal"><div class="video__frame">${thumb}${action}</div><h3>${esc(v.titulo)}</h3></article>`;
  }).join("");
  $$("#lista-videos .reveal").forEach(observe);
  $("#lista-videos").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    btn.parentElement.innerHTML =
      `<iframe src="https://www.youtube-nocookie.com/embed/${btn.dataset.id}?autoplay=1&rel=0" title="Vídeo do imóvel" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  });

  /* ---------- Carrossel de depoimentos ---------- */
  const track = $("#lista-depoimentos"), dots = $("#dep-dots");
  track.innerHTML = DEPOIMENTOS.map((d, n) => `
    <div class="slide${n === 0 ? " is-active" : ""}" role="group" aria-roledescription="slide" aria-label="${n + 1} de ${DEPOIMENTOS.length}">
      <blockquote>${esc(d.texto)}</blockquote>
      <strong>${esc(d.nome)}</strong><small>${esc(d.detalhe)}</small>
    </div>`).join("");
  dots.innerHTML = DEPOIMENTOS.map((_, n) =>
    `<button role="tab" aria-label="Depoimento ${n + 1}" aria-selected="${n === 0}"></button>`).join("");
  const slides = $$(".slide", track), dotBtns = $$("button", dots);
  let atual = 0, timer;
  const go = (n) => {
    atual = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === atual));
    dotBtns.forEach((b, k) => b.setAttribute("aria-selected", k === atual));
  };
  const auto = () => {
    clearInterval(timer);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => go(atual + 1), 7000);
  };
  $("#dep-prev").addEventListener("click", () => { go(atual - 1); auto(); });
  $("#dep-next").addEventListener("click", () => { go(atual + 1); auto(); });
  dotBtns.forEach((b, k) => b.addEventListener("click", () => { go(k); auto(); }));
  const car = $("#carrossel");
  car.addEventListener("mouseenter", () => clearInterval(timer));
  car.addEventListener("mouseleave", auto);
  let x0 = null;
  car.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  car.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { go(atual + (dx < 0 ? 1 : -1)); auto(); }
    x0 = null;
  });
  auto();

  /* ---------- Formulário → WhatsApp ---------- */
  const form = $("#form-contato"), msg = $("#form-msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim(), tel = form.telefone.value.trim(), interesse = form.interesse.value;
    form.nome.setAttribute("aria-invalid", !nome);
    form.telefone.setAttribute("aria-invalid", tel.replace(/\D/g, "").length < 10);
    if (!nome || tel.replace(/\D/g, "").length < 10) {
      msg.textContent = "Por favor, preencha seu nome e um telefone com DDD.";
      return;
    }
    const texto = `Olá, Márcio! Meu nome é ${nome}.\nTelefone: ${tel}\nInteresse: ${interesse}\n(Mensagem enviada pelo site)`;
    window.open(waLink(texto), "_blank", "noopener");
    msg.textContent = "Obrigado! Abrimos o WhatsApp para você concluir o envio.";
    form.reset();
  });

  /* ---------- Ano no rodapé ---------- */
  $("#ano").textContent = new Date().getFullYear();
})();
