export const config = {
    plane: {
        initialJumpSeed: 23,
        gravity: 0.23,
        topPadding: 40,
        bottomPadding: 40,
        defaultMix: 0.3,
        animationSwitch: 0.5,
        rotation: {
            maxSpeed: 100,
            minSpeed: -100,
            upAngle: -180,
            downAngle: 180,
            smoothing: 0.1,
        },
        scale: 0.6,
        spineData: {
            skeleton: 'planeSkeleton',
            atlas: 'planeAtlas',
        },
        tint: "0xFFEEDD",
    },
    obstacles: {
        spineData: {
            skeleton: 'cloudSkeleton',
            atlas: 'cloudAtlas',
        },
        startPosition: {
            x: 2000,
            y: 500,
        },
        endPosition: {
            x: -900,
            y: 500,
        },
        duration: 5,
        minAnimation: 1,
        animations: 7,
        tint: "0x333333",
        delays: {
            betweenSpawn: 1.4,
        },
        minScale: 0.8,
        maxScale: 1.2,
        yDifferentiation: 400,
        collisionDistance: 150,
    },
    bg: {
        repeatWidth: -1500,
        moveIncrement: 0.5,
    }
}