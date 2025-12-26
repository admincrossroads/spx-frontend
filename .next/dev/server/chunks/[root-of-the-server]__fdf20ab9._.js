module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/auth/check/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api/v1");
const API_KEY = ("TURBOPACK compile-time value", "spx-1234567890abcdef");
async function GET(request) {
    // #region agent log
    const fs = await __turbopack_context__.A("[externals]/fs/promises [external] (fs/promises, cjs, async loader)");
    const logPath = '.cursor/debug.log';
    const logEntry = JSON.stringify({
        location: 'api/auth/check/route.ts:7',
        message: 'Auth check API entry',
        data: {
            timestamp: Date.now()
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'B'
    }) + '\n';
    await fs.appendFile(logPath, logEntry).catch(()=>{});
    // #endregion
    try {
        // Get token from Authorization header (localStorage flow)
        const authHeader = request.headers.get('Authorization');
        // #region agent log
        const logEntry2 = JSON.stringify({
            location: 'api/auth/check/route.ts:12',
            message: 'Authorization header check',
            data: {
                hasAuthHeader: !!authHeader,
                authHeaderPrefix: authHeader?.substring(0, 20) || 'none'
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'B'
        }) + '\n';
        await fs.appendFile(logPath, logEntry2).catch(()=>{});
        // #endregion
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
        // #region agent log
        const logEntry3 = JSON.stringify({
            location: 'api/auth/check/route.ts:16',
            message: 'Token extracted from Authorization header',
            data: {
                tokenLength: token?.length || 0
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'B'
        }) + '\n';
        await fs.appendFile(logPath, logEntry3).catch(()=>{});
        // #endregion
        if (!token) {
            // #region agent log
            const logEntry5 = JSON.stringify({
                location: 'api/auth/check/route.ts:25',
                message: 'No token found, returning false',
                data: {},
                timestamp: Date.now(),
                sessionId: 'debug-session',
                runId: 'run1',
                hypothesisId: 'B'
            }) + '\n';
            await fs.appendFile(logPath, logEntry5).catch(()=>{});
            // #endregion
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                authenticated: false
            });
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Quick check with backend
        // #region agent log
        const logEntry7 = JSON.stringify({
            location: 'api/auth/check/route.ts:36',
            message: 'Before backend API call',
            data: {
                apiUrl: API_URL?.substring(0, 50) || 'none'
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'B'
        }) + '\n';
        await fs.appendFile(logPath, logEntry7).catch(()=>{});
        // #endregion
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'HEAD',
            headers: {
                'x-api-key': API_KEY,
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });
        // #region agent log
        const logEntry8 = JSON.stringify({
            location: 'api/auth/check/route.ts:46',
            message: 'Backend API response received',
            data: {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'D'
        }) + '\n';
        await fs.appendFile(logPath, logEntry8).catch(()=>{});
        // #endregion
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            authenticated: response.ok
        });
    } catch (error) {
        // #region agent log
        const fs = await __turbopack_context__.A("[externals]/fs/promises [external] (fs/promises, cjs, async loader)");
        const logPath = '.cursor/debug.log';
        const logEntry9 = JSON.stringify({
            location: 'api/auth/check/route.ts:53',
            message: 'Auth check API error caught',
            data: {
                errorMessage: error?.message,
                errorName: error?.name
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'B'
        }) + '\n';
        await fs.appendFile(logPath, logEntry9).catch(()=>{});
        // #endregion
        console.error('Auth check error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            authenticated: false
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fdf20ab9._.js.map