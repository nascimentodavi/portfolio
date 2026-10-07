# nascimentodavi.dev.br

Portfólio pessoal — React + TypeScript + Vite, servido como site estático na VPS.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173 — lê os projetos da API local (http://localhost:9090/api)
npm run build    # gera dist/
npm run preview  # serve o build localmente
npm run lint
```

## Projetos

Os projetos são gerenciados no painel admin do blog (**Projetos** na sidebar) e lidos em tempo
real de `GET /api/public/projects`. A URL da API vem de `VITE_API_URL`:

- `.env.development` → API local
- `.env.production` → `https://blogapi.nascimentodavi.dev.br/api`

Na API, `PORTFOLIO_URL` precisa conter a origem do portfólio para o CORS liberar a leitura.

## Deploy na VPS

```bash
npm ci && npm run build
# copie dist/ para a pasta servida por nascimentodavi.dev.br
```

As rotas (`/projetos/<slug>`) são do React Router, então o servidor deve devolver o
`index.html` para caminhos que não são arquivos. No nginx:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
