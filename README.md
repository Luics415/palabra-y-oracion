# Palabra y Oración

Aplicación web católica, responsiva y orientada a la lectura, que reúne la Biblia, oraciones tradicionales y un Santo Rosario guiado con seguimiento visual y lectura por voz.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-publicado-2ea44f?logo=github)](https://luics415.github.io/palabra-y-oracion/)
[![Licencia del código](https://img.shields.io/badge/código-MIT-blue.svg)](LICENSE)
[![Aplicación](https://img.shields.io/badge/aplicación-estática-CB9B46)](https://luics415.github.io/palabra-y-oracion/)

**Sitio publicado:** [luics415.github.io/palabra-y-oracion](https://luics415.github.io/palabra-y-oracion/)

> Este repositorio conserva el artefacto estático compilado de la aplicación. Es publicable y funcional, pero no sustituye al proyecto fuente original para desarrollo de componentes a gran escala.

## Objetivo

Palabra y Oración busca ofrecer una experiencia devocional accesible, tranquila y fácil de usar desde computadora o teléfono. Sus objetivos principales son:

- centralizar textos bíblicos y oraciones católicas en una interfaz coherente;
- facilitar el seguimiento completo del Santo Rosario;
- ofrecer lectura por voz sin depender de un servidor de audio;
- conservar favoritos y progreso en el dispositivo del visitante;
- publicar una aplicación estática de bajo costo operativo mediante GitHub Pages.

## Qué incluye

| Módulo | Capacidades principales |
| --- | --- |
| Portada | Identidad visual de Luics415, navegación responsiva y accesos rápidos. |
| Biblia | 66 libros y 1,189 capítulos almacenados como JSON y cargados bajo demanda. |
| Oraciones | 38 oraciones, búsqueda, categorías, longitud, favoritos y lectura por voz. |
| Rosario | Misterios según el día, 41 tarjetas, decenas compactas, cuentas interactivas, progreso y audio continuo. |
| Favoritos | Persistencia local de oraciones seleccionadas. |
| Accesibilidad | Diseño responsivo, controles semánticos y respeto por `prefers-reduced-motion`. |
| Publicación | Despliegue automático a GitHub Pages desde `main`. |

Las categorías devocionales incluyen oraciones diarias, marianas, credos, infantiles, protección, Sagrado Corazón, santos y otras devociones.

## Capturas de pantalla

### Portada en móvil

<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/ead410f6-e4d6-415e-a183-b06fe2a1cfba" />

### Experiencia móvil completa

<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/9db58dc3-6fc3-4bf5-88c6-f57b25725f80" />
<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/e169d17a-a589-4a45-b123-5df3b7a3fb9d" />


### Controles persistentes del Rosario

![Panel de lectura del Rosario](docs/screenshots/rosario-controles-lectura.png)

## Arquitectura técnica

```text
Navegador
├── index.html                    Documento inicial y metadatos
├── assets/v10/                   Módulos JavaScript versionados
│   ├── index-*.js                Runtime, router, catálogo y shell
│   ├── routes-*.js               Portada y rutas cargadas bajo demanda
│   ├── rosario-*.js              Estado, cuentas y audio del Rosario
│   └── use-speech-*.js           Integración con Web Speech API
├── bible/*.json                  Datos de los 66 libros
├── assets/brand/                 Firma e iconos propios
├── 404.html                      Recuperación de rutas en GitHub Pages
└── .github/workflows/            CI/CD de publicación
```

### Tecnologías detectadas

- React para la interfaz.
- TanStack Router para navegación del lado del cliente.
- JavaScript ES Modules con división de código por ruta.
- CSS utilitario compilado para diseño responsivo.
- Web Speech API (`speechSynthesis`) para lectura en voz alta.
- `localStorage` para favoritos y progreso del Rosario.
- GitHub Actions y GitHub Pages para entrega continua.

### Flujo de datos

1. `index.html` inicia el runtime y carga los módulos de la ruta actual.
2. La Biblia obtiene el archivo JSON correspondiente al libro seleccionado.
3. Las oraciones se filtran en memoria por texto, categoría y longitud.
4. El lector crea una `SpeechSynthesisUtterance` usando una voz disponible en el navegador.
5. El Rosario guarda misterio, tarjeta y cuenta actual en `localStorage`.
6. Los módulos usan directorios versionados (`assets/v10`) para evitar que una caché antigua mezcle archivos incompatibles.

## Decisiones de diseño relevantes

### Rosario guiado

Cada decena utiliza una sola tarjeta de Ave María con diez cuentas circulares. El estado de la cuenta activa se comparte con el lector de voz: al terminar una oración, avanza la cuenta; después de la décima, continúa con la oración siguiente.

El panel de lectura permanece visible durante el desplazamiento, mientras la navegación general sale de la pantalla para priorizar el contenido. El panel utiliza fondo sólido para garantizar contraste.

### Audio sin infraestructura adicional

La aplicación utiliza la voz instalada en el navegador. Esto evita almacenar grabaciones o consumir una API externa, pero implica que timbre, idioma y calidad varían según el sistema operativo.

### Persistencia local

Los favoritos y el progreso no requieren cuenta. Se guardan localmente en el dispositivo, por lo que no se sincronizan entre navegadores o equipos.

### Movimiento ambiental accesible

Las imágenes religiosas del fondo tienen animaciones lentas y discretas. Cuando el sistema indica `prefers-reduced-motion: reduce`, las animaciones se desactivan automáticamente.

## Ejecución local

No es necesario compilar este respaldo. Debe servirse mediante HTTP porque utiliza módulos ES y rutas del navegador.

Con Python:

```bash
python -m http.server 8080
```

Después abre:

```text
http://localhost:8080/
```

Para reproducir exactamente la ruta de producción `/palabra-y-oracion/`, sirve el directorio padre que contenga una carpeta con ese nombre.

## Despliegue

El flujo [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) se ejecuta en cada `push` a `main`:

1. descarga el repositorio;
2. configura GitHub Pages;
3. empaqueta el contenido estático;
4. publica el artefacto;
5. expone la URL del despliegue en el entorno `github-pages`.

La configuración requiere que **Settings → Pages → Source** esté establecida en **GitHub Actions**.

## Rutas y caché

- `404.html` devuelve las rutas profundas a la aplicación en GitHub Pages.
- `.nojekyll` evita el procesamiento de Jekyll.
- Las URLs de recursos parten de `/palabra-y-oracion/`.
- Cada conjunto de cambios incompatibles usa una carpeta de módulos versionada para impedir errores por caché del navegador.

## Calidad, accesibilidad y compatibilidad

La aplicación se ha verificado en una vista móvil de 390 × 844 px y en escritorio. Las comprobaciones realizadas incluyen:

- ausencia de desbordamiento horizontal;
- cabecera móvil en dos niveles;
- títulos y cuentas del Rosario correctamente alineados;
- controles de audio persistentes durante el desplazamiento;
- navegación directa a oraciones y rutas internas;
- paneles opacos y contraste legible;
- animaciones desactivables mediante preferencias del sistema.

Compatibilidad recomendada: versiones recientes de Chrome, Edge, Firefox y Safari. La lectura por voz depende del soporte de Web Speech API y de las voces instaladas.

## Limitaciones y deuda técnica

- El repositorio contiene código compilado/minificado; no es la base ideal para cambios estructurales.
- No existe backend, autenticación ni sincronización entre dispositivos.
- GitHub Pages no ofrece reescrituras de servidor; la recuperación de rutas usa `404.html`.
- La traducción bíblica debe revisarse jurídicamente antes de redistribuirla fuera de este contexto.
- Las fuentes tipográficas dependen de Google Fonts.
- Las versiones históricas de `assets/` se conservan para estabilidad de caché y aumentan el tamaño del repositorio.

### Evolución recomendada

1. Recuperar o exportar el proyecto fuente original.
2. Mantener el contenido devocional en archivos JSON o Markdown independientes.
3. Añadir pruebas automatizadas de rutas, audio y persistencia.
4. Optimizar imágenes a WebP/AVIF.
5. Documentar formalmente la procedencia y licencia de cada conjunto de textos.

## Mantenimiento

Al modificar el artefacto compilado:

1. valida la sintaxis de todos los módulos editados;
2. crea un nuevo directorio versionado de módulos;
3. actualiza las referencias de `index.html`;
4. comprueba portada, Biblia, Oraciones, Rosario y Favoritos;
5. verifica móvil, escritorio, audio y consola del navegador;
6. publica y espera a que GitHub Actions finalice correctamente.

## Licencia y derechos

### Código

El código original y las modificaciones propias de este repositorio se ofrecen bajo la [Licencia MIT](LICENSE), salvo que un archivo indique otra licencia. La licencia permite usar, copiar, modificar y distribuir el código conservando el aviso de copyright y el texto de la licencia.

### Marca y recursos visuales

La licencia MIT **no concede derechos** sobre el nombre, firma, logotipo, iconos ni identidad visual de **Luics415**. Estos elementos se reservan a su titular y no pueden utilizarse para sugerir afiliación, autoría o respaldo sin autorización.

### Textos religiosos y Biblia

- Las oraciones tradicionales pueden pertenecer al dominio público, pero compilaciones, adaptaciones o ediciones concretas pueden tener derechos propios.
- Los textos añadidos por colaboradores conservan los derechos que legalmente les correspondan.
- Las traducciones de la Biblia pueden estar protegidas según su edición, territorio y fecha. La inclusión en este repositorio no equivale a declarar que todas ellas son de dominio público ni concede autorización para otros usos.
- Antes de reutilizar o redistribuir contenido devocional o bíblico, corresponde verificar su procedencia y situación jurídica.

### Dependencias y servicios externos

React, TanStack Router, Google Fonts, GitHub Actions y demás herramientas conservan sus respectivas licencias, marcas y condiciones. La Licencia MIT de este repositorio no reemplaza esos términos.

### Sin garantía

El software se proporciona “tal cual”, sin garantías. Su contenido tiene fines informativos y devocionales; no sustituye fuentes litúrgicas oficiales ni asesoramiento pastoral.

Consulta [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) para el inventario de componentes y derechos de terceros.

## Autoría

Diseño, adaptación técnica y mantenimiento: **Luics415**.

Repositorio: [github.com/Luics415/palabra-y-oracion](https://github.com/Luics415/palabra-y-oracion)
