"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Palette, Building2, Upload, X, Save } from "lucide-react"
import { useGetBusiness, useBusinessForm, useBusinessLogo } from "@/business/infrastructure/hooks"
import { BusinessLoadingSkeleton } from "../components/BusinessLoadingSkeleton "

export const BusinessPage = () => {
    const { data: business, isLoading, isError } = useGetBusiness()

    const { register, handleSubmit, errors, isSubmitting, setValue, watch } = useBusinessForm(business)

    const { logoPreview, handleLogoChange, handleDrag, handleDrop, clearLogo, dragActive } = useBusinessLogo({
        initialLogoUrl: business?.logo,
        setValue,
        watch,
    })

    if (isLoading) {
        return <BusinessLoadingSkeleton />
    }

    if (isError || !business) {
        return <div className="p-8">No se pudo cargar la información del negocio.</div>
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100"
        >
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary dark:text-blue-400" />
                        <CardTitle className="dark:text-gray-100">Información del Negocio</CardTitle>
                    </div>
                    <CardDescription className="dark:text-gray-400">Actualiza los datos de tu negocio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre" className="dark:text-gray-200">
                            Nombre del Negocio
                        </Label>
                        <Input
                            id="nombre"
                            {...register("nombre", { required: true })}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                        {errors.nombre && <p className="text-xs text-red-500">El nombre es requerido</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="descripcion" className="dark:text-gray-200">
                            Descripción
                        </Label>
                        <Textarea
                            id="descripcion"
                            rows={3}
                            {...register("descripcion")}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="telefono" className="dark:text-gray-200">
                                Teléfono
                            </Label>
                            <Input
                                id="telefono"
                                type="tel"
                                {...register("telefono")}
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="dark:text-gray-200">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="direccion" className="dark:text-gray-200">
                            Dirección
                        </Label>
                        <Input
                            id="direccion"
                            {...register("direccion")}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            Guardar Cambios
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-primary dark:text-blue-400" />
                        <CardTitle className="dark:text-gray-100">Personalización</CardTitle>
                    </div>
                    <CardDescription className="dark:text-gray-400">
                        Personaliza la apariencia de tu página de reservas
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Dropzone con preview interno */}
                        <div className="space-y-3">
                            <Label htmlFor="logo" className="dark:text-gray-200">
                                Logo del Negocio
                            </Label>
                            <div
                                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 min-h-[200px] flex items-center justify-center ${dragActive
                                    ? "border-blue-400 bg-blue-50 dark:bg-blue-950"
                                    : "border-slate-300 hover:border-slate-400 dark:border-gray-600 dark:hover:border-gray-500"
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleLogoChange}
                                />

                                {logoPreview ? (
                                    <div className="relative w-full h-full flex items-center justify-center p-4">
                                        <img
                                            src={logoPreview || "/placeholder.svg"}
                                            alt="Logo preview"
                                            className="max-h-60 w-auto object-contain rounded"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                clearLogo()
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Upload className="mx-auto h-8 w-8 text-slate-400 dark:text-gray-500" />
                                        <div>
                                            <p className="text-lg font-medium text-slate-700 dark:text-gray-300">Arrastra el logo aquí</p>
                                            <p className="text-sm text-slate-500 dark:text-gray-400">o haz clic para buscar</p>
                                        </div>
                                        <p className="text-xs text-slate-400 dark:text-gray-500">PNG, JPG, WebP hasta 5MB</p>
                                    </div>
                                )}
                            </div>

                            {logoPreview && (
                                <Button type="submit" disabled={isSubmitting} className="w-full" variant="default">
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar Logo
                                </Button>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Label className="dark:text-gray-200">Logo Actual</Label>
                            <div className="border-2 border-slate-200 dark:border-gray-700 rounded-lg p-6 min-h-[200px] flex items-center justify-center bg-slate-50 dark:bg-gray-800">
                                {business.logo ? (
                                    <div className="text-center space-y-3">
                                        <img
                                            src={business.logo || "/placeholder.svg"}
                                            alt="Logo guardado"
                                            className="max-h-60 w-auto object-contain rounded mx-auto"
                                        />
                                        <p className="text-xs text-slate-500 dark:text-gray-400">Logo guardado</p>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-2">
                                        <div className="h-16 w-16 mx-auto bg-slate-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <Building2 className="h-8 w-8 text-slate-400 dark:text-gray-500" />
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-gray-400">Sin logo guardado</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
