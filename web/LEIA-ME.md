# O site publicado

A saída pronta do site de divulgação. O fonte mora no repositório privado
`LibMoney`, em `site/`, e isto aqui é o resultado de:

```
python scripts/montar_site.py
```

**O aplicativo web não está aqui.** Ele tem endereço próprio por enquanto, e
os botões de entrar apontam para lá. Quando ele voltar a ser servido junto,
rode `montar_site.py --com-app` e descomente os blocos de `/app` em
`_headers` e `_redirects` — sem eles a página do app abre e o banco no
navegador nunca abre.

## Configuração na Cloudflare Pages

| campo | valor |
|---|---|
| Repositório | `LibMoney-app` |
| Diretório raiz | `web` |
| Comando de build | *(vazio)* |
| Diretório de saída | `/` |

Vazio de propósito: o conteúdo já vem pronto. Pedir para a Cloudflare
compilar exigiria instalar o Flutter no ambiente de build dela.
