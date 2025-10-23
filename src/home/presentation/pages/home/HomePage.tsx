import {
    CallToActionSeccion,
    CustomFooter,
    FeaturesSection,
    CustomJumbotron,
    PricingPlans
} from "@/home/presentation/components"
import { CustomHeader } from "../../components/CustomHeader"
import { useAuthStore } from "@/auth/store/auth.store"

export const HomePage = () => {

    const { authStatus } = useAuthStore()
    console.log(authStatus)
    return (
        <>
            <CustomHeader />

            {/* Hero Section */}
            <CustomJumbotron />

            {/* Features Section */}
            <FeaturesSection />

            {/* Pricing Section */}
            <PricingPlans />

            {/* CTA Section */}
            <CallToActionSeccion />

            {/* Footer */}
            <CustomFooter />
        </>
    )
}
