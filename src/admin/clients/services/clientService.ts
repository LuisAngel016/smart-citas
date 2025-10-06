import type { Client, ClientFormData } from "@/admin/clients/interfaces/client.interface"

/**
 * Servicio para manejar las operaciones relacionadas con clientes
 * Aquí se centraliza toda la lógica de negocio y llamadas a API
 */

/**
 * Crea un nuevo cliente
 * @param data - Datos del formulario de cliente
 * @returns Promesa con el cliente creado
 */
export const createClient = async (data: ClientFormData): Promise<Client> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch('/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Error al crear el cliente')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en createClient:', error)
        throw error
    }
}

/**
 * Obtiene todos los clientes
 * @returns Promesa con el listado de clientes
 */
export const getClients = async (): Promise<Client[]> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch('/api/clients')

        if (!response.ok) {
            throw new Error('Error al obtener los clientes')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en getClients:', error)
        throw error
    }
}

/**
 * Obtiene un cliente por ID
 * @param id - ID del cliente
 * @returns Promesa con el cliente encontrado
 */
export const getClientById = async (id: string): Promise<Client> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/clients/${id}`)

        if (!response.ok) {
            throw new Error('Error al obtener el cliente')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en getClientById:', error)
        throw error
    }
}

/**
 * Actualiza un cliente existente
 * @param id - ID del cliente
 * @param data - Datos actualizados del cliente
 * @returns Promesa con el cliente actualizado
 */
export const updateClient = async (id: string, data: Partial<ClientFormData>): Promise<Client> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/clients/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Error al actualizar el cliente')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en updateClient:', error)
        throw error
    }
}

/**
 * Elimina un cliente
 * @param id - ID del cliente a eliminar
 * @returns Promesa indicando el éxito de la operación
 */
export const deleteClient = async (id: string): Promise<void> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/clients/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Error al eliminar el cliente')
        }
    } catch (error) {
        console.error('Error en deleteClient:', error)
        throw error
    }
}

/**
 * Busca clientes por nombre o email
 * @param query - Término de búsqueda
 * @returns Promesa con los clientes encontrados
 */
export const searchClients = async (query: string): Promise<Client[]> => {
    try {
        // TODO: Reemplazar con llamada real a la API
        const response = await fetch(`/api/clients/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
            throw new Error('Error al buscar clientes')
        }

        return await response.json()
    } catch (error) {
        console.error('Error en searchClients:', error)
        throw error
    }
}
