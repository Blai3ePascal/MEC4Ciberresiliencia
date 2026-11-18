# Detective digital

Laboratorio docente de David Pacios Izquierdo. Revisión de MEC4Ciberresiliencia.

## Publicación

Subir los archivos de esta carpeta a la raíz del repositorio MEC4Ciberresiliencia, conservando las licencias de vendor. GitHub Pages sirve index.html. Los tres recursos grandes de PDF ya publicados por el mismo propietario se cargan desde el mismo origen: /MEC1Ciber/aula-riesgos/vendor/. No se utiliza un CDN externo ni se modifica el repositorio MEC1Ciber. Las copias incluidas de esos tres recursos se conservan para reproducibilidad, pero no es necesario volver a publicarlas.

Dependencias verificadas byte a byte por SHA de blob Git:

- DejaVuSans.ttf: 1728e9ec32bad1522771b4e5d3d05149e7b06a88
- fontkit.min.js: 6edced82767174487d50fa4592ecd2d1fd5000d3
- pdf-lib.min.js: edb12c72cdaa11b608eb5967cf1531892b7f3b31

Esta publicación depende de que se mantenga esa ruta compartida. Las bibliotecas y la fuente no envían las respuestas a un servidor: el PDF se compone en el navegador.

## Uso local

Para reproducir localmente las rutas de publicación, preparar una raíz de servidor que contenga MEC4Ciberresiliencia/ con esta aplicación y MEC1Ciber/aula-riesgos/vendor/ con los tres recursos grandes incluidos en vendor. Ejecutar python -m http.server 8080 desde esa raíz y abrir http://localhost:8080/MEC4Ciberresiliencia/. El cálculo SHA-256 necesita HTTPS o localhost. No hay servidor de datos, cuentas ni recopilación de respuestas. La partida queda en el navegador y se puede descargar como PDF.

## Alcance

Las organizaciones, registros, tiempos, costes y capacidades son ficticios. El código declara las fórmulas docentes en modelo.mjs. Las referencias fundamentan los conceptos. Un ensayo no predice un sistema de producción ni decide la admisibilidad jurídica de una prueba.

## Licencias

Se conserva la licencia MIT del proyecto original. pdf-lib, fontkit y DejaVu tienen sus licencias en vendor. El código fuente modular acompaña al paquete docente.
