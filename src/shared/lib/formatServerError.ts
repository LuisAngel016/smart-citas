// Util para formatear errores provenientes del servidor/backend
// Convierte mensajes técnicos en títulos y descripciones amigables en español.

export interface FormattedServerError {
  title: string
  description?: string
}

/**
 * Intenta extraer y normalizar un mensaje de error del servidor.
 * Actualmente detecta duplicados por clave con el patrón:
 *   Key (email)=(Angel@gmail.com) already exists.
 */
export function formatServerError(error: unknown, options?: { entity?: string }): FormattedServerError {
  // Extraer el texto del mensaje preferentemente desde response.data.message
  const rawMessage = (() => {
    const e = error as unknown
    if (e == null) return undefined

    const maybeObj = e as { message?: unknown; response?: { data?: unknown } }

    // Priorizar response.data.message cuando exista (según la petición)
    if (maybeObj.response && maybeObj.response.data) {
      const d = maybeObj.response.data as unknown
      if (typeof d === "string") return d
      const dObj = d as { message?: unknown }
      if (typeof dObj.message === "string") return dObj.message
    }

    // Luego verificar message en la raíz
    if (typeof maybeObj.message === "string") return maybeObj.message

    // Finalmente, si es un string directamente
    if (typeof e === "string") return e

    return undefined
  })()

  const entity = options?.entity ? options.entity : "registro"

  // Patrón para detectar la violación por clave única con la forma usada en Postgres
  // Ejemplo: Key (email)=(Angel@gmail.com) already exists.
  const uniqueKeyRegex = /Key \(([^)]+)\)=\(([^)]+)\) already exists\.?/i

  if (rawMessage) {
    const raw = String(rawMessage)

    // Primero intentar matching estricto con el regex de clave única
    const m = raw.match(uniqueKeyRegex)
    if (m) {
      const key = m[1]
      // Mensaje específico para email: usar la frase solicitada en español
      if (key.toLowerCase() === "email") {
        return {
          title: `Error al crear cliente`,
          description: `Ya existe un cliente con ese email o correo`,
        }
      }

      // Mensaje genérico para otras claves únicas
      return {
        title: `Error al crear ${entity}`,
        description: `Ya existe un ${entity} con ese valor para "${key}".`,
      }
    }

    // Fallback: si el mensaje contiene palabras clave en inglés/español que indiquen
    // duplicado de email, devolver la descripción solicitada.
    const lower = raw.toLowerCase()
    if (lower.includes("email") && (lower.includes("already exists") || lower.includes("ya existe"))) {
      return {
        title: `Error al crear cliente`,
        description: `Ya existe un ${entity} con ese email o correo`,
      }
    }
  }

  // Si no hay coincidencias conocidas, devolver un mensaje genérico
  return {
    title: `Error al crear ${entity}`,
    description: rawMessage ? String(rawMessage) : `Ocurrió un error al procesar la solicitud.`,
  }
}

export default formatServerError
