export const config = {
    plane: {
        initialJumpSeed: 20,
        gravity: 0.2,
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
        crash: {
            positionIterations: 50, // how many points to create in the motion path
            distance: 50, // distance between each point in the motion path
            ease: "none",
            rotation: {
                ease: "power4.out",
                duration: 2,
                curviness: 0,
            }, 
            movement: {
                ease: "none",
                duration: 3,
                curviness: 0,
            }
        },
        return: {
            duration: 2,
            ease: "none",
        }
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
            beforeFadeOut: 1,
        },
        minScale: 0.8,
        maxScale: 1.2,
        yDifferentiation: 400,
        collisionDistance: 150,
        fadeOut: {
            duration: 4,
            ease: "power4.inOut"
        },
    },
    bg: {
        repeatWidth: -1498,
        moveIncrement: 0.5,
    }
}