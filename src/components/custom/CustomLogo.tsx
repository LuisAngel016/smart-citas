import { Link } from "react-router"

interface Props {
    subtitle?: string;
}

export const CustomLogo = ({ subtitle = 'Citas' }: Props) => {
    return (
        <Link
            to="/"
            className="flex items-center gap-3 whitespace-nowrap group relative"
        >
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            {/* Logo Icon */}
            <div className="w-10 h-10 relative flex-shrink-0 z-10">
                {/* Animated ring effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 blur-sm" />

                <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg"
                >
                    {/* Outer glow */}
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" className="[stop-color:hsl(var(--primary))]" />
                            <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.7" />
                        </linearGradient>
                    </defs>

                    {/* Calendar shadow */}
                    <rect
                        x="9"
                        y="11"
                        width="32"
                        height="30"
                        rx="4"
                        className="fill-black/20 transition-all duration-300 group-hover:fill-black/30"
                    />

                    {/* Calendar background */}
                    <rect
                        x="8"
                        y="10"
                        width="32"
                        height="30"
                        rx="4"
                        className="fill-background stroke-primary transition-all duration-500 group-hover:stroke-[3]"
                        strokeWidth="2"
                        filter="url(#glow)"
                    />

                    {/* Calendar header with gradient */}
                    <rect
                        x="8"
                        y="10"
                        width="32"
                        height="8"
                        rx="4"
                        fill="url(#calendarGradient)"
                        className="transition-all duration-500 group-hover:h-[10]"
                    />

                    {/* Calendar rings with pulse effect */}
                    <circle
                        cx="16"
                        cy="10"
                        r="2"
                        className="fill-background transition-all duration-300 group-hover:r-[2.5]"
                    />
                    <circle
                        cx="32"
                        cy="10"
                        r="2"
                        className="fill-background transition-all duration-300 group-hover:r-[2.5]"
                    />

                    {/* Calendar dots decoration */}
                    <circle cx="14" cy="24" r="1.5" className="fill-primary/40 transition-all duration-300 group-hover:fill-primary/60" />
                    <circle cx="20" cy="24" r="1.5" className="fill-primary/40 transition-all duration-300 group-hover:fill-primary/60" />
                    <circle cx="28" cy="24" r="1.5" className="fill-primary/40 transition-all duration-300 group-hover:fill-primary/60" />
                    <circle cx="34" cy="24" r="1.5" className="fill-primary/40 transition-all duration-300 group-hover:fill-primary/60" />
                    <circle cx="14" cy="32" r="1.5" className="fill-primary/40 transition-all duration-300 group-hover:fill-primary/60" />
                    <circle cx="20" cy="32" r="1.5" className="fill-primary/40 transition-all duration-300 group-hover:fill-primary/60" />
                    <circle cx="28" cy="32" r="1.5" className="fill-primary/40 transition-all duration-300 group-hover:fill-primary/60" />

                    {/* Clock/time indicator in center */}
                    <circle
                        cx="24"
                        cy="27"
                        r="7"
                        className="fill-primary/10 stroke-primary transition-all duration-500 group-hover:fill-primary/20 group-hover:r-[8]"
                        strokeWidth="2"
                    />

                    {/* Clock hands with rotation effect */}
                    <line
                        x1="24"
                        y1="27"
                        x2="24"
                        y2="22"
                        className="stroke-primary transition-all duration-500 group-hover:stroke-[2.5]"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="24"
                        y1="27"
                        x2="28"
                        y2="27"
                        className="stroke-primary transition-all duration-500 group-hover:stroke-[2.5]"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    {/* Center dot */}
                    <circle
                        cx="24"
                        cy="27"
                        r="1.5"
                        className="fill-primary transition-all duration-300 group-hover:r-[2]"
                    />

                    {/* Checkmark overlay with smooth animation */}
                    <path
                        d="M18 27L22 31L30 23"
                        className="stroke-primary opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:stroke-[3]"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Text Logo */}
            <div className="flex items-center gap-0.5 relative z-10">
                <span
                    className="
                        text-2xl
                        font-black 
                        tracking-tight
                        bg-gradient-to-br from-primary via-primary to-primary/70
                        bg-clip-text text-transparent
                        transition-all duration-500
                        group-hover:from-primary 
                        group-hover:via-primary/90 
                        group-hover:to-primary
                        group-hover:tracking-wide
                        relative
                        after:absolute 
                        after:bottom-0 
                        after:left-0 
                        after:w-0 
                        after:h-0.5 
                        after:bg-primary 
                        after:transition-all 
                        after:duration-500
                        group-hover:after:w-full
                    "
                >
                    Smart
                </span>
                <span
                    className="
                        text-2xl
                        font-extralight
                        text-muted-foreground/80
                        transition-all duration-500
                        group-hover:text-foreground
                        group-hover:font-light
                        group-hover:tracking-wide
                    "
                >
                    {subtitle}
                </span>
            </div>
        </Link>
    )
}
