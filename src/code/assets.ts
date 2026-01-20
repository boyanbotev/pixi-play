import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "assetsBundle",
            assets: {
                "bg": "assets/images/bg.png",
                "particle": "assets/images/particle.png",
                "startButton": "assets/images/start.png",
                "planeSkeleton": "assets/spine/paperplane.json",
                "planeAtlas": "assets/spine/paperplane.atlas",
                "cloudSkeleton": "assets/spine/clouds.json",
                "cloudAtlas": "assets/spine/clouds.atlas",
            }
        },
    ]
};