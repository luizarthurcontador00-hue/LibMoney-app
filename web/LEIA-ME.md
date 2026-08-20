# O site e o app web publicados

Saída pronta de `python scripts/montar_site.py --com-app`. O fonte mora no
repositório privado `LibMoney`.

    /            site de divulgação
    /app         o aplicativo, aberto no navegador

## Cloudflare Pages

| campo | valor |
|---|---|
| Repositório | `LibMoney-app` |
| Diretório raiz | `web` |
| Comando de build | *(vazio)* |
| Diretório de saída | `/` |

Vazio de propósito: o Flutter já compilou na máquina.

## Os dois arquivos que não podem sumir

`_headers` liga o isolamento entre origens em `/app/*`. Sem ele a página do
app carrega e o banco no navegador **nunca abre** — sem erro visível, só sem
dado nenhum. Se um dia o app abrir vazio na web, olhe aqui primeiro.

`_redirects` faz qualquer caminho dentro de `/app` cair no index do app.
