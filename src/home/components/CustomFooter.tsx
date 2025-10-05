import { Calendar } from "lucide-react"


interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: "Producto",
        links: [
            { label: "Características", href: "#caracteristicas" },
            { label: "Planes", href: "#planes" },
            { label: "Casos de Uso", href: "#" },
        ],
    },
    {
        title: "Empresa",
        links: [
            { label: "Acerca de", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contacto", href: "#contacto" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacidad", href: "#" },
            { label: "Términos", href: "#" },
        ],
    },
];

const COMPANY_NAME = "SmartCitas";
const COMPANY_DESCRIPTION = "Sistema profesional de gestión de citas para tu negocio";

export const CustomFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">{COMPANY_NAME}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{COMPANY_DESCRIPTION}</p>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-foreground mb-3">{section.title}</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} {COMPANY_NAME}. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
