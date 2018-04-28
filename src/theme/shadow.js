const shadowKeyUmbraOpacity = 0.18
const shadowKeyPenumbraOpacity = 0.12
const shadowAmbientShadowOpacity = 0.1

const shadows = {
    0: [
        [0, 0, 0, 0], // KeyUmbra
        [0, 0, 0, 0], // PenUmbra
        [0, 0, 0, 0]  // Ambient
    ],
    1: [
        [0, 1, 3, 0],
        [0, 1, 1, 0],
        [0, 2, 1, -1]
    ],
    2: [
        [0, 1, 5, 0],
        [0, 2, 2, 0],
        [0, 3, 1, -2]
    ],
    3: [
        [0, 1, 8, 0],
        [0, 3, 4, 0],
        [0, 3, 3, -2]
    ],
    4: [
        [0, 2, 4, -1],
        [0, 4, 5, 0],
        [0, 1, 10, 0]
    ],
    6: [
        [0, 3, 5, -1],
        [0, 6, 10, 0],
        [0, 1, 16, 0]
    ]
}

const createShadowStyles = (shadows = shadows) => {
    const shadowStyles = {}

    for (let k in shadows) {
        const currentShadowStyles = shadows[k]
        const key = currentShadowStyles[0]
        const pen = currentShadowStyles[1]
        const amb = currentShadowStyles[2]

        shadowStyles[k] = [
            `${key[0]}px ${key[1]}px ${key[2]}px ${key[3]}px rgba(0, 0, 0, ${shadowKeyUmbraOpacity}),`,
            `${pen[0]}px ${pen[1]}px ${pen[2]}px ${pen[3]}px rgba(0, 0, 0, ${shadowKeyPenumbraOpacity}),`,
            `${amb[0]}px ${amb[1]}px ${amb[2]}px ${amb[3]}px rgba(0, 0, 0, ${shadowAmbientShadowOpacity})`,
        ]
    }

    return shadowStyles
}


export default createShadowStyles(shadows)