import {Plugin} from 'vite';
import {build} from 'esbuild';
import {resolve} from 'path';

function buildScreenshotServer(): Plugin {
    return {
        name: 'build-screenshot-server',
        buildStart: async () => {
            try {
                await build({
                    entryPoints: [resolve(__dirname, './scripts/screenshot-server.js')],
                    bundle: true,
                    outfile: resolve(__dirname, '../../../dist/api/screenshot-server.js'),
                    platform: 'node',
                    sourcemap: true,
                });
            } catch (err) {
                console.error('Error building screenshot-server.js:', err);
                process.exit(1);
            }
        }
    };
}

export default buildScreenshotServer;
