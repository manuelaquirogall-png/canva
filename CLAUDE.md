# CLAUDE.md

Contexto del proyecto para Claude Code. Léelo al iniciar cada sesión.

## 1. Qué es este proyecto

Proyecto **académico** de mejora de UX sobre **Canva** (la plataforma real, no un clon genérico).
Se implementa un **prototipo frontend funcional** que demuestra las mejoras propuestas.
No es código de producción de Canva ni se conecta a sus sistemas: los datos y la autenticación del prototipo viven en Firebase.

### Problema
Los usuarios recurrentes pierden tiempo buscando sus propios recursos porque la interfaz prioriza las plantillas predeterminadas de Canva. La búsqueda no tiene la granularidad necesaria para flujos ágiles, y los límites de los Kits de Marca frenan a quienes manejan varias identidades visuales o clientes (freelancers y agencias).

### Iniciativas (core features)
1. **Búsqueda avanzada por filtros**: filtros granulares y combinables (formato exacto, paleta de colores, tipografía, etiquetas personalizadas, cliente, estado del proyecto).
2. **Arquitectura "Mis proyectos primero"**: el dashboard y los resultados de búsqueda muestran primero los diseños, componentes y carpetas del usuario, y después las plantillas de Canva o de la comunidad.
3. **Kits de Marca escalables**: crear, categorizar y cambiar rápidamente entre múltiples Kits de Marca, sin límite de cantidad.

## 2. Estado actual

- Historias de usuario: **terminadas**.
- Mockups visuales de cada mejora: **terminados** (ver `/docs/mockups` o la ruta donde estén; pregúntame si no los encuentras).
- Fase actual: **implementación del prototipo** fiel a los mockups.

Reglas derivadas:
- Los mockups y las historias de usuario son la **fuente de verdad**. No rediseñes ni reinterpretes la UI por tu cuenta.
- Si algo del mockup es ambiguo o contradice una historia de usuario, **pregunta antes de decidir**.
- No agregues funcionalidades fuera de las tres iniciativas.

## 3. Stack

- **Frontend:** HTML5, CSS3, JavaScript moderno (ES6+ con módulos `import`/`export`), GSAP para animaciones.
- **Backend / BaaS:** Firebase Authentication (login y registro) y Cloud Firestore (datos). Si se usa Realtime Database, debe indicarse explícitamente.
- **Entorno:** JS nativo o empaquetador (Vite/Webpack) si ya está configurado.
- **Restricción:** **sin frameworks** (React, Vue, Angular). No los propongas ni los instales.

## 4. Estructura de directorios

```text
/
├── index.html              # Landing / bienvenida
├── CLAUDE.md
├── /docs
│   ├── dashboard.html      # Vista protegida post-login
│   └── login.html          # Login / registro
├── /estilos
│   ├── main.css
│   └── auth.css
└── /scripts
    ├── app.js              # Lógica general y enrutamiento visual
    ├── firebase-config.js  # Inicialización del SDK de Firebase
    └── auth.js             # Autenticación
```

Cuando una iniciativa requiera archivos nuevos (por ejemplo `search.js`, `brand-kits.js`, `brand-kits.css`), créalos dentro de `/scripts` y `/estilos` siguiendo estos mismos nombres en minúsculas y con guiones.

## 5. Convenciones de código

- Un módulo por responsabilidad; exporta funciones con nombre, evita `export default` salvo que ya sea el patrón del archivo.
- Código y comentarios técnicos en inglés; textos visibles al usuario en **español**, salvo que el mockup indique otro idioma.
- CSS con variables en `:root` para colores, tipografías y espaciados. Reutiliza los tokens existentes en `main.css` antes de crear nuevos.
- Accesibilidad básica: HTML semántico, `label` en inputs, foco visible, contraste suficiente, navegación por teclado en filtros y selectores.
- Animaciones con GSAP: sutiles, respetando `prefers-reduced-motion`.
- Diseño responsive; revisa al menos escritorio y móvil.

## 6. Firebase: reglas de seguridad

- **Nunca** escribas claves, secretos ni credenciales fuera de `firebase-config.js`. No las repitas en otros archivos ni en mensajes de commit.
- Las rutas protegidas (`dashboard.html`) deben verificar sesión con `onAuthStateChanged` y redirigir a `login.html` si no hay usuario.
- Cada documento de usuario se guarda bajo su `uid`. Sugiere reglas de Firestore que restrinjan lectura y escritura al dueño.
- Evita lecturas innecesarias: pagina y filtra en la consulta cuando sea posible.

### Modelo de datos sugerido (confirmar antes de implementar)
```text
users/{uid}
  ├── designs/{designId}     # nombre, formato, paleta, tipografías, etiquetas, cliente, estado, fechas
  ├── folders/{folderId}
  └── brandKits/{kitId}      # nombre, categoría/cliente, colores, tipografías, logos
```
Para filtros combinables, ten en cuenta los índices compuestos de Firestore y avísame cuando un filtro requiera uno.

## 7. Cómo quiero que trabajes

- Antes de cambios grandes, **explica el plan en pocas líneas** y espera mi confirmación.
- Cambios pequeños y revisables: una iniciativa o componente por vez.
- No modifiques archivos que no estén relacionados con la tarea.
- Si no tienes un dato (ruta de mockups, nombres de colecciones, textos de UI), **pregunta**, no lo inventes.
- Al terminar, resume qué archivos tocaste y cómo probar el cambio manualmente.

## 8. Comandos

> Completar según el entorno real del proyecto.

- Servidor local: `npx serve .` (o `npm run dev` si se usa Vite)
- Build: `npm run build` (solo si hay empaquetador)
