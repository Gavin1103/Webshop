import {defineConfig, loadEnv} from "vite";
import {resolve} from "path";
import checker from "vite-plugin-checker";
import eslintPlugin from "vite-plugin-eslint";
import buildScreenshotServer from "./src/vite-plugin-build-screenshot-server";

export default defineConfig((config) => {

    const env: Record<string, string> = loadEnv(config.mode, process.cwd(), "VITE");

    const viteConfiguration: any = Object.entries(env).reduce((prev, [key, val]) => {
        return {
            ...prev,
            [key.substring("VITE_".length)]: val,
        };
    }, {});

    const {VITE_DOCKER_HOST} = env;

    return {
        base: "./",
        root: resolve(__dirname, "./wwwroot"),
        appType: "spa",
        resolve: {
            alias: {
                "/src": resolve(__dirname, "./src"),
            },
        },
        build: {
            sourcemap: true,
            rollupOptions: {
                input: resolve(__dirname, "./wwwroot/index.html"),
            },
            outDir: resolve(__dirname, "../../dist/web"),
            emptyOutDir: true,
        },
        esbuild: {
            supported: {
                "top-level-await": true,
            },
        },
        plugins: [
            checker({typescript: true}),
            eslintPlugin({
                overrideConfigFile: '.eslintrc.js',
            }),
            buildScreenshotServer()
        ],
        define: {
            viteConfiguration: viteConfiguration,
        },
        server: {
            host: VITE_DOCKER_HOST || "localhost",
            watch: {
                ignored: ['!**/node_modules/**'],
                usePolling: true,
            },
            strictPort: true,
            port: 3000,
        },
        preview: {
            strictPort: true,
            port: 3000,
        },
    };
});
