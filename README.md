# Palabra y Oración

Copia estática migrable del sitio `divine-companion-12.lovable.app`, preparada para publicarse en `https://luics415.github.io/`.

## Qué incluye

- Portada, Biblia completa, 31 oraciones, Rosario guiado y favoritos.
- Los 66 archivos JSON que alimentan los libros bíblicos.
- Lector de voz mediante la API de síntesis de voz del navegador.
- Persistencia local de favoritos en cada dispositivo.
- Página `404.html` para que las rutas internas funcionen al entrar mediante un enlace directo.
- Flujo automático de despliegue mediante GitHub Actions.
- Marca y analítica propias de Lovable retiradas de la copia publicada.

## Publicación en luics415.github.io

1. Crear o usar el repositorio público `luics415/luics415.github.io`.
2. Copiar **todo el contenido de esta carpeta**, incluidos `.github` y `.nojekyll`, a la raíz del repositorio.
3. Subirlo a la rama `main`.
4. En GitHub, abrir **Settings → Pages** y elegir **GitHub Actions** como fuente.
5. Esperar a que termine el flujo **Deploy to GitHub Pages**.

## Importante para futuras ediciones

Esta carpeta conserva el resultado compilado publicado por Lovable. Es adecuada para respaldar y publicar el sitio tal como está, pero no es la mejor base para seguir desarrollándolo: los módulos JavaScript están minificados.

La migración preferida es conectar el proyecto original de Lovable con GitHub desde el proyecto `lovp_2x9j78prfd9rvsta68j01sqmyh`, exportar su código fuente y después incorporar a ese repositorio los ajustes de despliegue aquí incluidos (`.github/workflows/deploy-pages.yml`, `.nojekyll` y la estrategia de rutas). Si no se tiene acceso al proyecto original, esta copia funciona como alternativa publicable y respaldo completo del despliegue actual.

## Límites conocidos

- El audio depende de las voces y permisos disponibles en el navegador del visitante.
- Los favoritos no se sincronizan entre dispositivos.
- `404.html` permite recuperar rutas internas en GitHub Pages, aunque una entrada directa puede responder inicialmente con código HTTP 404 antes de que la aplicación se cargue.
- Las fuentes tipográficas se descargan de Google Fonts; para funcionamiento totalmente fuera de línea habría que alojarlas dentro del repositorio.
