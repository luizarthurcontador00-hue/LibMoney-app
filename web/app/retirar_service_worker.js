// Migração única para quem ainda está controlado pelo service worker antigo.
// O banco financeiro mora no IndexedDB; aqui saem apenas caches de arquivos
// estáticos criados pelo próprio Flutter.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(
      nomes
        .filter((nome) => nome.startsWith('flutter-'))
        .map((nome) => caches.delete(nome)),
    );

    await self.clients.claim();
    const janelas = await self.clients.matchAll({ type: 'window' });
    await self.registration.unregister();
    await Promise.all(janelas.map((janela) => janela.navigate(janela.url)));
  })());
});
