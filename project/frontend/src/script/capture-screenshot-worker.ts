import {exec} from 'child_process';

export function captureScreenshot(url: string, clip: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const scriptPath = './capture-screenshot.ts';

        exec(`node ${scriptPath} ${url} '${JSON.stringify(clip)}'`, (error, stdout, stderr) => {
            if (error) {
                reject(`exec error`);
                return;
            }

            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }

            resolve(stdout);
        });
    });
}
