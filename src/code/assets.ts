import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "testBundle",
            assets: {
                "test": "assets/images/test.jpg",
            }
        },
    ]
};