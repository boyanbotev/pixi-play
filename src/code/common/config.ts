export const config = {
    speedMultiplier: 1.25,
    increaseAmount: 0.00019,
    plane: {
        flapLength: 0.25,
        initialJumpSeed: 20,
        gravity: 0.6,
        topPadding: 40,
        bottomPadding: 40,
        defaultMix: 0.3,
        animationSwitch: 0.5,
        rotation: {
            up: {
                angle: -30,
                duration: 0.12,
                ease: "power1.inOut",
            },
            down: {
                angle: 30,
                duration: 0.9,
                ease: "power1.inOut",
            }
        },
        scale: 0.6,
        spineData: {
            skeleton: 'planeSkeleton',
            atlas: 'planeAtlas',
        },
        tint: 0xFFEFDE,
        crash: {
            positionIterations: 50, // how many points to create in the motion path
            distance: 50, // distance between each point in the motion path
            lerpSmoothing: 0.1, // how quickly to approach the target angle
            ease: "none",
            rotation: {
                ease: "power4.out",
                duration: 2,
                curviness: 0,
            }, 
            movement: {
                ease: "none",
                duration: 2.5,
                curviness: 0,
            }
        },
        return: {
            duration: 1.5,
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
        move: {
            duration: 7,
            ease: "none",
            betweenSpawnDistance: 12,
            baseSpeed: 8,
        },
        minAnimation: 1,
        animations: 7,
        tint: 0x2f2627,
        delays: {
            beforeFadeOut: 1,
        },
        minScale: 0.8,
        maxScale: 1.2,
        yDifferentiation: 400,
        yAdjustments: [ -400, -400, -300, -200, -100, 0, 100, 200, 300, 300, 300, 300, 300],
        collisionDistance: 150,
        fadeOut: {
            duration: 2,
            ease: "power4.inOut"
        },
    },
    bg: {
        repeatWidth: -1498,
        moveIncrement: 1,
    },
    startButton: {
        width: 500,
        height: 200,
    },
    loaderBar: {
        fillColor: 0x94c6b4,
        borderColor: 0x4e3846,
        borderWidth: 12,
        widthMultiplier: 0.8,
        heightMultiplier: 0.08,
    },
    particles: {
        offset: {
            x: -30, //was -30
            y: -10, // was -10
        },
        startAlpha:0.1,
        startScale: 0.8,
        tween: {
            tint: 0xFF5500,
            duration: 0.4,
            baseSpeed: 300,
        }
    }
}