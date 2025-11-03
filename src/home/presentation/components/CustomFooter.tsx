import { Calendar } from "lucide-react"
import { useScrollAnimation } from "@/shared/hooks/use-scroll-animation"
import { Link } from "react-router";


interface FooterLink {
    label: string;
    href?: string;
    to?: string;
}

interface FooterSection {
    title: string;
    href?: FooterLink[];
    links?: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: "Producto",
        href: [
            { label: "Características", href: "#caracteristicas" },
            { label: "Planes", href: "#planes" },
            { label: "Casos de Uso", href: "#" },
        ],
    },
    {
        title: "Empresa",
        links: [
            { label: "Acerca de", to: "/about" },
            { label: "Blog", to: "/blog" },
            { label: "Contacto", to: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacidad", to: "/privacy" },
            { label: "Términos", to: "/terms" },
        ],
    },
];

const COMPANY_NAME = "SmartCitas";
const COMPANY_DESCRIPTION = "Sistema profesional de gestión de citas para tu negocio";

export const CustomFooter = () => {
    const currentYear = new Date().getFullYear();
    const { elementRef, isVisible } = useScrollAnimation();

    return (
        <footer
            ref={elementRef as React.RefObject<HTMLElement>}
            className={`border-t border-border py-8 sm:py-10 md:py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 animate-fade-up animation-duration-[2000ms]' : 'opacity-0 translate-y-10'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    {/* Brand Section */}
                    <div className="text-center sm:text-left">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4 justify-center sm:justify-start">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">{COMPANY_NAME}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{COMPANY_DESCRIPTION}</p>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="text-center sm:text-left">
                            <h3 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">{section.title}</h3>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                                {section.href?.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                                {section.links?.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to!}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
                    <p>&copy; {currentYear} {COMPANY_NAME}. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
