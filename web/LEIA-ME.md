# O site publicado

Esta pasta é a **saída pronta** do site e do aplicativo web — não é código
fonte. O fonte mora no repositório privado `LibMoney`, em `site/`, e o que
está aqui é o resultado de:

```
python scripts/montar_site.py
```

Fica num repositório público porque a Cloudflare Pages publica a partir do
Git, e apontar para cá evita subir 45 MB à mão a cada ajuste.

## Configuração na Cloudflare Pages

| campo | valor |
|---|---|
| Repositório | `LibMoney-app` |
| Diretório raiz | `web` |
| Comando de build | *(vazio)* |
| Diretório de saída | `/` |

Vazio de propósito: o Flutter já compilou aqui na máquina. Pedir para a
Cloudflare compilar exigiria instalar o Flutter no ambiente de build dela a
cada publicação.

## Os dois arquivos que não podem sumir

`_headers` liga o isolamento entre origens em `/app/*`. Sem ele a página do
aplicativo abre e o banco no navegador nunca abre — sem erro visível, só sem
dado nenhum.

`_redirects` faz qualquer caminho dentro de `/app` cair no `index.html` do
aplicativo. O curinga é limitado a `/app` para não engolir as páginas de
divulgação.
