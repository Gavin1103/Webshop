import {defineConfig, loadEnv} from "vite";
import {resolve} from "path";
import {globSync} from "glob";
import eslint from "vite-plugin-eslint";
import checker from "vite-plugin-checker";

export default defineConfig((config) => {

    const env: Record<string, string> = loadEnv(config.mode, process.cwd(), "VITE");

    const viteConfiguration: any = Object.entries(env).reduce((prev, [key, val]) => {
        return {
            ...prev,
            [key.substring("VITE_".length)]: val,
        };
    }, {});

    let htmlFiles: string[];

    if (config.mode === "development") {
        htmlFiles = globSync("**/*.html", {
            cwd: resolve(__dirname, "./wwwroot"),
        });
    } else {
        htmlFiles = globSync("wwwroot/**/*.html", {
            cwd: resolve(__dirname, "./"),
        });
    }

    const input: any = {};
    htmlFiles.forEach((e: string, i: number) => {
        input[`app_${i}`] = resolve(e);
    });

    const {VITE_DOCKER_HOST} = env;

    return {
        base: "./",
        root: "wwwroot",
        appType: "spa",
        resolve: {
            alias: {
                "/src": resolve(__dirname, "./src"),
            },
        },
        build: {
            sourcemap: true,
            rollupOptions: {
                input: input,
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
            eslint({
                overrideConfigFile: '../../.eslintrc.js',
            }),
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
