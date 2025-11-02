import { useEffect, useState } from "react"
import type { UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { BusinessFormData } from "./useBusinessForm"
import { toast } from "sonner"

interface UseBusinessLogoProps {
    initialLogoUrl?: string | null
    setValue: UseFormSetValue<BusinessFormData>
    watch: UseFormWatch<BusinessFormData>
}

interface UseBusinessLogoReturn {
    logoFile: File | null
    logoPreview: string | null
    handleLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleDrag: (e: React.DragEvent) => void
    handleDrop: (e: React.DragEvent) => void
    clearLogo: () => void
    dragActive: boolean
}

export const useBusinessLogo = ({
    initialLogoUrl,
    setValue,
    watch,
}: UseBusinessLogoProps): UseBusinessLogoReturn => {
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(initialLogoUrl || null)
    const [dragActive, setDragActive] = useState(false)

    // Reiniciar el logo cuando cambie el negocio (initialLogoUrl)
    useEffect(() => {
        setLogoFile(null)
        setLogoPreview(initialLogoUrl || null)
    }, [initialLogoUrl])

    // Observar cambios en el archivo desde react-hook-form
    const logo = watch("logo")
    useEffect(() => {
        if (!logo) {
            setLogoFile(null)
            setLogoPreview(initialLogoUrl || null)
        }
    }, [logo, initialLogoUrl])

    /**
     * Valida el archivo de imagen
     */
    const validateImageFile = (file: File): boolean => {
        // Validar que sea una imagen
        if (!file.type.startsWith("image/")) {
            toast.error("Archivo inválido", {
                description: "Por favor selecciona un archivo de imagen válido (PNG, JPG, WebP)",
            })
            return false
        }

        // Validar tamaño máximo (5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            toast.error("Archivo muy grande", {
                description: "El tamaño máximo permitido es de 5MB",
            })
            return false
        }

        return true
    }

    /**
     * Procesa el archivo de imagen
     */
    const processImageFile = (file: File) => {
        if (!validateImageFile(file)) return

        setLogoFile(file)
        setValue("logo", file)

        // Crear preview del archivo
        const reader = new FileReader()
        reader.onloadend = () => {
            setLogoPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    /**
     * Maneja el cambio de logo desde un input file
     */
    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        processImageFile(file)
    }

    /**
     * Maneja el drag & drop
     */
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    /**
     * Maneja el drop de archivos
     */
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const file = e.dataTransfer.files?.[0]
        if (!file) return

        processImageFile(file)
    }

    /**
     * Limpia el logo completamente para poder seleccionar una nueva imagen
     */
    const clearLogo = () => {
        setLogoFile(null)
        setLogoPreview(null)
        setValue("logo", undefined)
    }

    return {
        logoFile,
        logoPreview,
        handleLogoChange,
        handleDrag,
        handleDrop,
        clearLogo,
        dragActive,
    }
}
