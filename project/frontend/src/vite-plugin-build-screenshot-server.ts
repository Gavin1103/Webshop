import {Plugin} from 'vite';
import {build} from 'esbuild';
import {resolve} from 'path';

function buildScreenshotServer(): Plugin {
    return {
        name: 'build-screenshot-server',
        buildStart: async () => {
            try {
                await build({
                    entryPoints: [resolve(__dirname, './script/temp-screenshot-server.js')],
                    bundle: true,
                    outfile: resolve(__dirname, '../../../dist/api/temp-screenshot-server.js'),
                    platform: 'node',
                    sourcemap: true,
                });
            } catch (err) {
                console.error('Error building temp-screenshot-server.js:', err);
                process.exit(1);
            }
        }
    };
}

export default buildScreenshotServer;
