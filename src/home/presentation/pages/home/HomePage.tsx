import {
    CallToActionSeccion,
    CustomFooter,
    FeaturesSection,
    CustomJumbotron,
    PricingPlans
} from "@/home/presentation/components"
import { CustomHeader } from "../../components/CustomHeader"

export const HomePage = () => {
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
