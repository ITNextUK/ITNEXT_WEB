// ─────────────────────────────────────────────────────────────────────────────
// ITNEXT API Service
// Centralised fetch wrapper for all backend calls.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

// ── Helpers ──────────────────────────────────────────────────────────────────

function getToken(): string | null {
    return localStorage.getItem('adminToken');
}

async function request<T = any>(
    path: string,
    options: RequestInit = {},
    auth = false
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (auth) {
        const token = getToken();
        if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(json?.message || `Request failed: ${res.status}`);
    }
    return json;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authApi = {
    login: (email: string, password: string) =>
        request<{ data: { token: string; user: { email: string; name: string; role: string } } }>(
            '/auth/login',
            { method: 'POST', body: JSON.stringify({ email, password }) }
        ),

    me: () => request('/auth/me', {}, true),
};

// ── Insights (Blog Posts) ─────────────────────────────────────────────────────

export const insightsApi = {
    /** GET /api/insights — all posts (admin: all, public: published only) */
    getAll: (params?: { status?: string; category?: string; search?: string }) => {
        const q = new URLSearchParams(params as any).toString();
        return request<{ data: { insights: any[]; total: number } }>(`/insights${q ? `?${q}` : ''}`, {}, true);
    },

    /** GET /api/insights/:slug */
    getBySlug: (slug: string) =>
        request<{ data: { insight: any } }>(`/insights/${slug}`),

    /** POST /api/insights — create */
    create: (post: any) =>
        request<{ data: { insight: any } }>('/insights', {
            method: 'POST',
            body: JSON.stringify(post),
        }, true),

    /** PUT /api/insights/:id — update */
    update: (id: string, post: any) =>
        request<{ data: { insight: any } }>(`/insights/${id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
        }, true),

    /** DELETE /api/insights/:id */
    delete: (id: string) =>
        request(`/insights/${id}`, { method: 'DELETE' }, true),

    /** POST /api/insights/:id/like */
    like: (id: string) =>
        request<{ data: { likes: number } }>(`/insights/${id}/like`, { method: 'POST' }),

    /** POST /api/insights/:id/share */
    share: (id: string) =>
        request<{ data: { shares: number } }>(`/insights/${id}/share`, { method: 'POST' }),
};

// ── Site Content ──────────────────────────────────────────────────────────────

export const contentApi = {
    /** GET /api/content */
    get: () => request<{ data: { content: any } }>('/content'),

    /** PUT /api/content */
    update: (content: any) =>
        request<{ data: { content: any } }>('/content', {
            method: 'PUT',
            body: JSON.stringify(content),
        }, true),
};

// ── Upload ────────────────────────────────────────────────────────────────────

export const uploadApi = {
    /** POST /api/upload/image — multipart/form-data */
    image: async (file: File): Promise<string> => {
        const token = getToken();
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`${BASE_URL}/upload/image`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.message || 'Upload failed');
        return json.data.url as string;
    },
};

// ── Newsletter ────────────────────────────────────────────────────────────────

export const newsletterApi = {
    /** POST /api/newsletter/subscribe */
    subscribe: (email: string) =>
        request('/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),
};

// ── Admin Management ─────────────────────────────────────────────────────────

export const adminApi = {
    /** GET /api/admin/admins — list all admin users */
    getAdmins: () =>
        request<{ data: { admins: any[]; total: number; page: number; pages: number } }>(
            '/admin/admins', {}, true
        ),

    /** POST /api/admin/admins — create new admin (returns generated password) */
    createAdmin: (data: { name: string; email: string }) =>
        request<{ data: { admin: any; generatedPassword: string } }>(
            '/admin/admins',
            { method: 'POST', body: JSON.stringify(data) },
            true
        ),

    /** PUT /api/admin/admins/:id — update admin details */
    updateAdmin: (id: string, data: { name?: string; email?: string; isActive?: boolean }) =>
        request<{ data: { admin: any } }>(
            `/admin/admins/${id}`,
            { method: 'PUT', body: JSON.stringify(data) },
            true
        ),

    /** PUT /api/admin/admins/:id/reset-password — reset password (returns new generated password) */
    resetPassword: (id: string) =>
        request<{ data: { generatedPassword: string } }>(
            `/admin/admins/${id}/reset-password`,
            { method: 'PUT' },
            true
        ),

    /** DELETE /api/admin/admins/:id — delete admin */
    deleteAdmin: (id: string) =>
        request(`/admin/admins/${id}`, { method: 'DELETE' }, true),
};
