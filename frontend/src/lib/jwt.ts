function base64UrlDecode(input: string) {
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    const pad = input.length % 4;
    if (pad) input += '='.repeat(4 - pad);
    const decoded = atob(input);
    try {
        return decodeURIComponent(
        decoded
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
    } catch {
        return decoded;
    }
}

export function parseJwt<T = any>(token: string): T | null {
    try {
        const [, payload] = token.split('.');
        return JSON.parse(base64UrlDecode(payload));
    } catch {
        return null;
    }
}
