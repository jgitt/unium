export const getPathParts = (queryPath) => {
    const lastSlash = queryPath.lastIndexOf('/');
    const gameObjectData = queryPath.substring(lastSlash + 1);

    const gameObjectParts = gameObjectData.split('.');

    let properties = undefined;

    if (gameObjectParts[2]) {
        properties = gameObjectParts[2];
        for (let i = 3; i < gameObjectParts.length; i++) {
            properties = `${properties}.${gameObjectParts[i]}`;
        }
    }

    return {
        path: queryPath.substring(0, lastSlash),
        gameObject: gameObjectParts[0] || undefined,
        component: gameObjectParts[1] || undefined,
        properties,
    };
}

export const getDeepValueFromObject = (dataObject, keyPath) => {
    const keyPathParts = keyPath.split('.');

    let currentValue = dataObject;

    for (let i in keyPathParts) {
        if (currentValue[keyPathParts[i]]) {
            currentValue = currentValue[keyPathParts[i]];
        }
        else {
            currentValue = undefined;
            break;
        }
    }

    return currentValue;
}

export const setDeepValueInObject = (dataObject, keyPath, value) => {
    let didSucceed = false;
    const keyPathParts = keyPath.split('.');
    let lastThing = dataObject;

    for (let i = 0; i < keyPathParts.length; i++) {
        if (!(keyPathParts[i] in lastThing)) break;

        if (i == keyPathParts.length - 1) {
            lastThing[keyPathParts[i]] = value;
            didSucceed = true;
            break;
        }
        lastThing = lastThing[keyPathParts[i]];
    }

    return didSucceed;
}