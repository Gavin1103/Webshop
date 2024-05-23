import {Plugin} from 'vite';
import fs from 'fs-extra';
import path from 'path';

function copyEnvPlugin(): Plugin {
    return {
        name: 'vite-plugin-copy-env',
        apply: 'build',
        closeBundle() {
            const envProductionPath = path.resolve(__dirname, '../../.env.production');
            const envDestinationPath = path.resolve(__dirname, '../../../../dist/web/.env');

            console.log(`Copying from ${envProductionPath} to ${envDestinationPath}`);

            if (fs.existsSync(envProductionPath)) {
                fs.copySync(envProductionPath, envDestinationPath);
                console.log('.env.production has been copied to dist/web/.env');
            } else {
                console.error('Error: .env.production file does not exist.');
            }
        }
    };
}

export default copyEnvPlugin;
