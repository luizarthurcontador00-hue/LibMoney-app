# Publicar o site e o app web

O site de divulgação e o aplicativo web moram no mesmo endereço:
`libmoney.com.br` é a divulgação, `libmoney.com.br/app` é o aplicativo.

## Montar

```
python scripts/montar_site.py
```

Compila o app com `--base-href /app/`, junta com as páginas de `site/` e
deixa tudo em `build/site/` — 53 arquivos, cerca de 45 MB, sendo o maior
deles 6,9 MB. Folgado nos limites da Cloudflare (20.000 arquivos, 25 MB
cada). Para conferir antes de subir:

```
python scripts/serve_web.py build/site
```

## Publicar na Cloudflare Pages

Uma vez, na criação do projeto:

| campo | valor |
|---|---|
| Framework preset | None |
| Build command | *(vazio — o build é local)* |
| Build output directory | `build/site` |

Depois é arrastar a pasta `build/site` em **Create deployment**, ou ligar o
repositório e deixar a Cloudflare publicar a cada push.

O domínio entra em **Custom domains**. Se o DNS do `libmoney.com.br` estiver
na Cloudflare, ela mesma cria o registro; se estiver na Hostinger, ela mostra
o que apontar.

## Os dois arquivos que fazem o serviço funcionar

**`_headers`** liga o isolamento entre origens em `/app/*`. O banco do
aplicativo roda num worker com WebAssembly, e sem esses cabeçalhos a página
abre e o banco nunca abre — sem erro visível, só sem dado nenhum. É a razão
de o Lovable e o GitHub Pages não servirem: nenhum dos dois deixa definir
cabeçalho de resposta.

O isolamento vale **só** em `/app`. Aplicado ao site inteiro, barra a fonte da
marca nas páginas de divulgação.

**`_redirects`** faz qualquer caminho dentro de `/app` cair no `index.html` do
aplicativo, que resolve as rotas por conta própria. O curinga é limitado a
`/app` de propósito: quando era `/*`, toda página de divulgação abria o
aplicativo.

Cloudflare Pages e Netlify leem os dois arquivos no mesmo formato. Trocar de
hospedagem é trocar de conta, não de código.

## O APK não fica aqui

Os botões de baixar apontam para o repositório público de download:

```
https://github.com/luizarthurcontador00-hue/LibMoney-app/raw/main/libmoney.apk
```

Já foi diferente, e custou caro: um binário de 68 MB republicado a cada
ajuste do site queimou a cota de publicação da conta num único dia. Além
disso o arquivo nunca esteve versionado — sobrevivia só porque o deploy do
Netlify é aditivo, e em qualquer hospedagem nova daria 404.

## Depois de mudar de endereço

Duas coisas fora daqui precisam saber do endereço novo:

1. **Supabase** → Authentication → URL Configuration: acrescente
   `https://libmoney.com.br/abrir.html` nas Redirect URLs. **Não apague os
   endereços antigos** — quem já tem o aplicativo instalado carrega o endereço
   antigo dentro dele, e apagar quebra a confirmação de e-mail e a recuperação
   de senha dessas pessoas.

2. **`lib/sync/supabase_config.dart`**, a constante `supabaseRedirectApp`.
   Mudar isso exige gerar um APK novo.
