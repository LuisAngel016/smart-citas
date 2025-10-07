import { CustomHeader } from "@/components/custom/CustomHeader"
import {
    CallToActionSeccion,
    CustomFooter,
    FeaturesSection,
    CustomJumbotron,
    PricingPlans
} from "@/home/components"

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
