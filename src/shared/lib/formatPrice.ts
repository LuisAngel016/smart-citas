export function normalizePriceInput(raw?: string): string {
    if (!raw) return ""
    return String(raw).replace(/\D/g, "")
}

export function formatPrice(raw?: string, options?: { locale?: string; currencySymbol?: string }): string {
    // Por defecto usamos la región Estados Unidos (en-US)
    const locale = options?.locale ?? "en-US"
    const symbol = options?.currencySymbol ?? "$"

    const digits = normalizePriceInput(raw)
    if (!digits) return ""

    const n = Number(digits)
    // Formatea sin decimales y con separador de miles
    const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n)
    return `${symbol} ${formatted}`
}

export default formatPrice
