const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1';

export async function apiFetch<T>(
    path: string,
    opts: RequestInit & { token?: string } = {}
): Promise<T> {
    const { token, headers, ...rest } = opts;
    const res = await fetch(`${API_BASE}${path}`, {
        ...rest,
        headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = (body as any)?.error || (body as any)?.message || `HTTP ${res.status}`;
        throw new Error(msg);
    }
    if (res.status === 204) return undefined as unknown as T;
    return res.json();
}
