import * as esbuild from "esbuild";
import {rimrafSync} from "rimraf";

const commandLine: string[] = process.argv.slice(2);

if (commandLine.length === 0) {
    console.error("Please provide an argument!");
} else if (commandLine[0] === "build") {
    rimrafSync("../../dist/api");

    const settings: esbuild.BuildOptions = {
        entryPoints: ["./src/index.ts"],
        outfile: "../../dist/api/index.js",
        bundle: true,
        minify: true,
        sourcemap: "external",
        platform: "node",
        target: "node18",
    };

    await esbuild.build(settings);
}
