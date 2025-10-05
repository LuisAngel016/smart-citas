import {
    CallToActionSeccion,
    CustomFooter,
    CustomHeader,
    FeaturesSection,
    CustomJumbotron,
    PricingPlans
} from "@/home/components"

export const HomePage = () => {
    return (
        <>
            {/* Header */}
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
