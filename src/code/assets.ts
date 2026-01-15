import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "assetsBundle",
            assets: {
                "test": "assets/images/test.jpg",
                "planeSkeleton": "assets/spine/paperplane.json",
                "planeAtlas": "assets/spine/paperplane.atlas",
                "cloudSkeleton": "assets/spine/clouds.json",
                "cloudAtlas": "assets/spine/clouds.atlas",
            }
        },
    ]
};