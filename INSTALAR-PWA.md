# ServeUP como aplicativo instalável (PWA)

O projeto foi preparado para poder ser instalado na tela inicial de tablets Android e abrir em modo de aplicativo, sem a barra de endereço convencional do navegador.

## Importante
- O PWA precisa ser publicado em um endereço HTTPS (por exemplo, GitHub Pages) ou servido em `localhost`. Abrir o `index.html` diretamente pelo gerenciador de arquivos não permite registrar o service worker nem instalar o PWA corretamente.
- Publique a pasta do projeto mantendo a estrutura de arquivos e pastas. O `index.html`, `manifest.json` e `sw.js` devem ficar na raiz do site.
- No tablet Android, abra o endereço HTTPS no Chrome, entre no menu `⋮` e escolha `Instalar app` ou `Adicionar à tela inicial` (o texto varia conforme a versão). Depois abra pelo ícone ServeUP.
- O modo offline usa cache dos arquivos locais do site. Recursos externos, como fontes e Bootstrap do CDN, podem precisar de internet.
- A instalação PWA não transforma o projeto em APK nativo; ela cria um aplicativo web instalável.

## Verificações feitas
- Manifesto com nome, cores, ícones e modo `standalone`.
- Registro de service worker em todas as páginas HTML.
- Cache inicial dos arquivos locais e estratégia de navegação com fallback para uso offline.
