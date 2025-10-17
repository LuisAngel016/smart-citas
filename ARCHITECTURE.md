# Arquitectura de SmartCitas

Este documento describe la arquitectura del frontend de SmartCitas, convenciones y flujos habituales.

## Visión general

SmartCitas adopta una aproximación modular por dominios y una separación en capas inspirada en Clean Architecture:

- Cada dominio tiene su propia carpeta bajo `src/` (por ejemplo `appointments`, `clients`, `auth`).
- Dentro de cada dominio se separan responsabilidades en subcarpetas: `domain`, `application`, `infrastructure`, `presentation`, y ocasionalmente `IoC`.

Estructura típica:

```
src/
  <domain>/
    domain/           # Entidades, interfaces y tipos del dominio
    application/      # Casos de uso / usecases (lógica de negocio)
    infrastructure/   # Implementaciones de repositorios, DTOs, mappers, hooks que realizan IO
    presentation/     # Componentes y páginas (UI)
    IoC/              # Contenedores para inyección de dependencias
```

## Capas y responsabilidades

- Domain:
  - Entidades (objetos del dominio) y contratos (interfaces) como `IRepository`.
  - No debe contener dependencias de frameworks ni HTTP.

- Application:
  - Casos de uso (usecases) que orquestan la lógica de negocio usando las interfaces del dominio.
  - Aquí se escriben las reglas que describen "qué" hace la aplicación.

- Infrastructure:
  - Implementaciones concretas de repositorios que realizan llamadas HTTP o acceden a almacenamiento.
  - DTOs y mappers para transformar respuestas de API → entidades del dominio.
  - Hooks que acoplan la UI con casos de uso o adaptadores (p. ej., `useAppointmentForm`).

- Presentation:
  - Componentes React, páginas y estilos. Debe concentrarse en la experiencia del usuario.

## Flujo de datos (ejemplo: crear una cita)

1. El usuario completa el formulario en un componente dentro de `presentation`.
2. El componente llama a un caso de uso en `application` (o a un hook que invoca dicho caso de uso).
3. El caso de uso utiliza una interfaz de repositorio definida en `domain`.
4. La implementación real del repositorio en `infrastructure` hace la llamada HTTP y usa mappers para convertir la respuesta en entidades del dominio.
5. El caso de uso devuelve el resultado al componente, que actualiza la UI.

## Convenciones de nombres y paths

- Paths de TypeScript: `@/*` → `src/*` (configurado en `tsconfig.json`).
- Nombres de carpetas: usar `infrastructure` (no `infraestructure`) para mantener consistencia en inglés.
- Archivos: preferir `kebab-case` para rutas y `PascalCase` para componentes y clases.

## Buenas prácticas

- Mantener las capas separadas: evita llamadas HTTP dentro de `presentation` o `domain`.
- Documentar los contratos (interfaces) en `domain` para facilitar el refactor y el testeo.
- Añadir tests a los usecases y mappers para proteger la lógica de negocio.

## Diagrama simple

UI (presentation) → Application (usecases) → Domain (interfaces) → Infrastructure (repos) → API

## ¿Qué cambiar cuando se agrega una nueva dependencia de infraestructura?

1. Define primero la interfaz en `domain`.
2. Implementa la lógica en `infrastructure` y registra la implementación en `IoC`.
3. Consume desde `application` via la interfaz.

---

Si quieres, puedo añadir un diagrama (.svg) o un ejemplo concreto de un usecase documentado con tipos y contratos.
