module.exports = [
"[project]/lib/actions/tags.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"008c59471a38c3ea047221efd94e66318f0a293ec9":"getTags","401223a6431f211c086ac953f86a7fab5394b31697":"deleteTag","4035329bf6de2e8069125b9a01a41319c706978850":"getTagById","408a3b161645a3a96d145d3cdbbff6c72e241a1ff8":"createTag","60fd9dc6a2d16ee632bfb408c21a1d386f749d0c1a":"updateTag"},"",""] */ __turbopack_context__.s([
    "createTag",
    ()=>createTag,
    "deleteTag",
    ()=>deleteTag,
    "getTagById",
    ()=>getTagById,
    "getTags",
    ()=>getTags,
    "updateTag",
    ()=>updateTag
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
        throw new Error('No authentication token provided');
    }
    const headers = new Headers(options.headers);
    headers.set('x-api-key', API_KEY);
    headers.set('Cookie', `token=${token}`);
    if (!(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include'
    });
    if (!response.ok) {
        const errorData = await response.json().catch(()=>({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    return response.json();
}
async function getTags() {
    try {
        return await fetchWithAuth('/admin/tags', {
            cache: 'no-store'
        });
    } catch (error) {
        console.error('Failed to fetch tags:', error);
        return [];
    }
}
async function getTagById(id) {
    try {
        return await fetchWithAuth(`/admin/tags/${id}`, {
            cache: 'no-store'
        });
    } catch (error) {
        console.error(`Failed to fetch tag ${id}:`, error);
        throw error;
    }
}
async function createTag(data) {
    return await fetchWithAuth('/admin/tags', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
async function updateTag(id, data) {
    return await fetchWithAuth(`/admin/tags/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
}
async function deleteTag(id) {
    return await fetchWithAuth(`/admin/tags/${id}`, {
        method: 'DELETE'
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTags, "008c59471a38c3ea047221efd94e66318f0a293ec9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTagById, "4035329bf6de2e8069125b9a01a41319c706978850", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTag, "408a3b161645a3a96d145d3cdbbff6c72e241a1ff8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTag, "60fd9dc6a2d16ee632bfb408c21a1d386f749d0c1a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTag, "401223a6431f211c086ac953f86a7fab5394b31697", null);
}),
"[project]/.next-internal/server/app/admin/(dashboard)/tags/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/tags.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tags$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/tags.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/admin/(dashboard)/tags/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/actions/tags.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "401223a6431f211c086ac953f86a7fab5394b31697",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tags$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTag"],
    "408a3b161645a3a96d145d3cdbbff6c72e241a1ff8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tags$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTag"],
    "60fd9dc6a2d16ee632bfb408c21a1d386f749d0c1a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tags$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTag"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f28$dashboard$292f$tags$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$actions$2f$tags$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/(dashboard)/tags/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/actions/tags.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$tags$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/tags.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_d50785e1._.js.map