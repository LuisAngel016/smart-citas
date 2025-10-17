# smart-citas

Proyecto front-end de la aplicación SmartCitas.

## Resumen
Aplicación SPA escrita en TypeScript y React, construida con Vite. La estructura sigue una aproximación modular por dominios (appointments, auth, clients, etc.) y separación por capas (domain, application, infrastructure, presentation, IoC).

## Requisitos
- Node.js 18+ (o la versión LTS que uses)
- npm 9+ o pnpm/yarn

## Instalación y ejecución

1. Clona el repositorio

```powershell
git clone <URL-del-repositorio>
cd smart-citas
```

2. Instala dependencias

```powershell
npm install
```

3. Ejecuta en desarrollo

```powershell
npm run dev
```

4. Build de producción

```powershell
npm run build
```

5. Previsualizar build

```powershell
npm run preview
```

## Scripts útiles
- `npm run dev` — arranca Vite en modo desarrollo.
- `npm run build` — compila TypeScript y genera build con Vite.
- `npm run lint` — ejecuta ESLint.
- `npm run lint:fix` — ejecuta ESLint con --fix (intenta corregir problemas automáticamente).

## Arquitectura (breve)

Cada dominio (por ejemplo `appointments`) suele tener las siguientes capas:

- `domain` — entidades, tipos e interfaces del dominio.
- `application` — casos de uso (usecases) que contienen la lógica de negocio orquestada.
- `infrastructure` — DTOs, mappers, repositorios concretos y hooks que implementan la persistencia o llamadas HTTP.
- `presentation` — componentes y páginas relacionadas con la UI del dominio.
- `IoC` — contenedores para inyección de dependencias.

Flujo típico para una operación (p. ej., crear una cita):

1. UI -> llama a un usecase en `application`.
2. El usecase valida/transforma y llama a un repositorio definido en `domain`.
3. La implementación del repositorio en `infrastructure` hace la llamada HTTP o acceso a datos.

## Convenciones y buenas prácticas
- Imports: usa los paths configurados (p. ej. `@/appointments/...`) cuando corresponda. El `tsconfig` ya mapea `@/*` a `src/*`.
- Nombres: mantener consistencia (recomiendo usar inglés para nombres de carpetas y archivos, pero respetaré la convención actual).
- Tests: aún no hay tests automatizados. Recomendable añadir `vitest` o `jest` en una próxima tarea.

## Variables de entorno
Coloca las variables necesarias en tu entorno o en un archivo `.env` (no subir archivos con secretos). Hay un ejemplo `.env.example` en el repositorio.

Variables típicas:

- `VITE_API_BASE_URL` — URL base para la API.
- `NODE_ENV` — `development` / `production`.

## Contribuir
Lee `CONTRIBUTING.md` para pautas de desarrollo, ramas y PRs.

## Estructura de carpetas (resumen)

```
src/
  appointments/
    application/
    domain/
    infrastructure/
    presentation/
  auth/
  clients/
  shared/
    api/
    components/
    contexts/
  routes/
  main.tsx
  SmartCitasApp.tsx
```

## Enlaces rápidos
- Código principal: `src/SmartCitasApp.tsx` (arranque de router y theme provider)
- Entrada: `src/main.tsx`

---

Si necesitas que haga cambios adicionales (añadir CI, tests, o renombrar carpetas), dime cuál y lo implemento.