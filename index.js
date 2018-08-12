const path = require("path");
const cpx = require("cpx");

module.exports = bundler => {
    bundler.on("bundled", async bundle => {
        const pkg = await bundle.entryAsset.getPackage();
        const rootDir = bundle.entryAsset.options.rootDir;
        const bundleDir = path.dirname(bundle.name);
        const glob = "resources" in pkg && "glob" in pkg.resources ? pkg.resources.glob : "resources/**";
        const destination = "resources" in pkg && "destination" in pkg.resources ? pkg.resources.destination : "resources";
        const inputGlob = path.join(rootDir, glob);
        const outputDir = path.join(bundleDir, destination);

        if (bundler.hmr) {
            const watcher = cpx.watch(inputGlob, outputDir)
                .on("watch-ready", () => {
                    console.log(`Watching resources...`);

                    watcher
                        .on("copy", event => {
                            console.log(`Resource copied: ${event.srcPath}`);
                            bundler.hmr.emitUpdate([bundle.entryAsset]);
                        })
                        .on("remove", event => {
                            console.log(`Resource removed: ${event.path}`);
                            bundler.hmr.emitUpdate([bundle.entryAsset]);
                        });
                });
        } else {
            cpx.copy(inputGlob, outputDir, () => {
                console.log("Copied resources.");
            });
        }
    });
};