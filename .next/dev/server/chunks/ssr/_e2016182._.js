module.exports = [
"[project]/lib/actions/authors.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00397db6f111ee51a1e1d3ee55ef6acf01af09bc62":"getAuthors","407da5c05284833d55406323b7f2fc197acca9e51e":"deleteAuthor","40c20e9f78d648eb412025fb7676e6e81427845296":"createAuthor","40f6eef2e3fb7dcefdf19af9a1e3514b3eadfd8551":"getAuthorById","6067266528657722f3610ffa637caf6eada20ae8e1":"updateAuthor"},"",""] */ __turbopack_context__.s([
    "createAuthor",
    ()=>createAuthor,
    "deleteAuthor",
    ()=>deleteAuthor,
    "getAuthorById",
    ()=>getAuthorById,
    "getAuthors",
    ()=>getAuthors,
    "updateAuthor",
    ()=>updateAuthor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api/v1");
const API_KEY = ("TURBOPACK compile-time value", "spx-1234567890abcdef");
async function fetchWithAuth(endpoint, options = {}) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        console.error('No authentication token found');
        throw new Error('No authentication token provided');
    }
    // Check what API_URL contains
    console.log('API_URL:', API_URL);
    console.log('Endpoint:', endpoint);
    console.log('Full URL:', `${API_URL}${endpoint}`);
    const headers = new Headers(options.headers);
    headers.set('x-api-key', API_KEY);
    headers.set('Cookie', `token=${token}`);
    if (!(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include'
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
            console.log('Response not OK, checking error...');
            const errorText = await response.text();
            console.log('Error response:', errorText);
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch  {
                errorData = {
                    message: errorText
                };
            }
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }
        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
async function getAuthors() {
    try {
        return await fetchWithAuth('/admin/authors', {
            cache: 'no-store'
        });
    } catch (error) {
        console.error('Failed to fetch authors:', error);
        return [];
    }
}
async function getAuthorById(id) {
    try {
        console.log('getAuthorById called with ID:', id);
        const author = await fetchWithAuth(`/admin/authors/${id}`, {
            cache: 'no-store'
        });
        console.log('getAuthorById result:', author);
        return author;
    } catch (error) {
        console.error(`Failed to fetch author ${id}:`, error);
        throw error;
    }
}
async function createAuthor(data) {
    return await fetchWithAuth('/admin/authors', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
async function updateAuthor(id, data) {
    // Remove empty fields to avoid sending undefined
    const payload = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.bio !== undefined) payload.bio = data.bio;
    if (data.imageUrl !== undefined) payload.imageUrl = data.imageUrl;
    return await fetchWithAuth(`/admin/authors/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
    });
}
async function deleteAuthor(id) {
    return await fetchWithAuth(`/admin/authors/${id}`, {
        method: 'DELETE'
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuthors, "00397db6f111ee51a1e1d3ee55ef6acf01af09bc62", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuthorById, "40f6eef2e3fb7dcefdf19af9a1e3514b3eadfd8551", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAuthor, "40c20e9f78d648eb412025fb7676e6e81427845296", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAuthor, "6067266528657722f3610ffa637caf6eada20ae8e1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAuthor, "407da5c05284833d55406323b7f2fc197acca9e51e", null);
}),
"[project]/.next-internal/server/app/admin/(dashboard)/authors/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/authors.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/authors.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/admin/(dashboard)/authors/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/authors.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "407da5c05284833d55406323b7f2fc197acca9e51e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAuthor"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f28$dashboard$292f$authors$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$actions$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/(dashboard)/authors/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/actions/authors.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$authors$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/authors.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_e2016182._.js.map