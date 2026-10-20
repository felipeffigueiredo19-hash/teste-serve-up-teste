const CACHE_NAME = 'serveup-pwa-v1';
const APP_SHELL = [
  "./README.md",
  "./css/style.css",
  "./html/administrador.html",
  "./html/cardapio.html",
  "./html/conta-solicitada.html",
  "./html/humor.html",
  "./html/jogos.html",
  "./html/login.html",
  "./html/pedido-preparo.html",
  "./html/pedido.html",
  "./html/recomendacao.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./imagens/agua gas.jpg",
  "./imagens/agua sem.jpg",
  "./imagens/bife.png",
  "./imagens/brownie.jpg",
  "./imagens/coca garra.jpg",
  "./imagens/coca.jpg",
  "./imagens/fanta uva.jpg",
  "./imagens/fanta.jpg",
  "./imagens/file.jpg",
  "./imagens/frango grelhado.jpg",
  "./imagens/frango.jpg",
  "./imagens/gelatina.jpg",
  "./imagens/lasanha.jpg",
  "./imagens/macarrao.jpg",
  "./imagens/mousse L.jpg",
  "./imagens/mousse.jpg",
  "./imagens/orange.jpg",
  "./imagens/parmegiana.jpg",
  "./imagens/petit-gateau.jpg",
  "./imagens/serveup-logo.png",
  "./imagens/sopa de carne.jpg",
  "./imagens/sorvete branco.jpg",
  "./imagens/sorvete marrom.jpg",
  "./imagens/sprite.jpg",
  "./imagens/suco limon.jpg",
  "./imagens/suco mara.jpg",
  "./index.html",
  "./js/administrador.js",
  "./js/app.js",
  "./js/auth.js",
  "./js/cardapio.js",
  "./js/carrinho.js",
  "./js/data.js",
  "./js/jogos.js",
  "./js/pedidos.js",
  "./js/recomendacoes.js",
  "./manifest.json"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache local app files individually so a single optional file won't block installation.
      await Promise.all(APP_SHELL.map(async (url) => {
        try { await cache.add(url); } catch (error) { /* optional file or hosting path */ }
      }));
      await self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith('serveup-pwa-') && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;
        const path = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname;
        return (await caches.match(path)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
