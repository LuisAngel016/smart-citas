import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Palette, Shield, User } from "lucide-react"
import { useUserForm } from "@/users/infrastructure/hooks/useUserForm"
import { ProfileHeader, ProfileTab, PreferencesTab, SecurityTab } from "../components"

export const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const { register, handleSubmit, isSubmitting, user, isLoading, imagePreview, handleImageChange } = useUserForm()

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: true,
    })

    console.log(user)

    const onSave = async () => {
        await handleSubmit()
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            handleImageChange(file)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Cargando perfil...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20 flex items-center justify-center">
                <p className="text-muted-foreground">No se pudo cargar el usuario</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
            <main className="container max-w-full px-4 py-8 lg:py-12">
                <ProfileHeader
                    user={user}
                    isEditing={isEditing}
                    isSubmitting={isSubmitting}
                    imagePreview={imagePreview}
                    onEditClick={() => setIsEditing(true)}
                    onSaveClick={onSave}
                    onCancelClick={handleCancel}
                    onFileChange={handleFileChange}
                />

                <div className="mt-10">
                    <Tabs defaultValue="profile" className="space-y-8">
                        <TabsList className="grid w-full max-w-lg grid-cols-3 h-14 bg-muted/50 p-1.5 rounded-xl shadow-sm">
                            <TabsTrigger
                                value="profile"
                                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                            >
                                <User className="h-4 w-4" />
                                <span className="hidden sm:inline">Perfil</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="preferences"
                                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                            >
                                <Palette className="h-4 w-4" />
                                <span className="hidden sm:inline">Preferencias</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                            >
                                <Shield className="h-4 w-4" />
                                <span className="hidden sm:inline">Seguridad</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="space-y-6">
                            <ProfileTab isEditing={isEditing} register={register} user={user} />
                        </TabsContent>

                        <TabsContent value="preferences" className="space-y-6">
                            <PreferencesTab
                                notifications={notifications}
                                setNotifications={setNotifications}
                            />
                        </TabsContent>

                        <TabsContent value="security" className="space-y-6">
                            <SecurityTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
