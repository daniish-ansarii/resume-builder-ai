export const getExternalUrl = (value) => {
    const raw = value?.trim();
    if (!raw) return "";
    const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
        const url = new URL(candidate);
        return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
    } catch {
        return "";
    }
};

export const getContactHref = (type, value) => {
    const raw = value?.trim();
    if (!raw) return "";
    if (type === "email") return `mailto:${raw}`;
    if (type === "phone") {
        const number = raw.replace(/[^\d+]/g, "");
        return number ? `tel:${number}` : "";
    }
    if (type === "linkedin" || type === "website") return getExternalUrl(raw);
    return "";
};
