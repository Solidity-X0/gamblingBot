const crypto = require("node:crypto");


function provablyFairHash(serverSeed, clientSeed, nonce) {
    return crypto
        .createHmac("sha256", serverSeed)
        .update(`${clientSeed}:${nonce}`)
        .digest("hex");
}

function provablyFairFloat(hash) {

    // First 13 hex chars = 52 bits (safe for JS numbers)
    const slice1 = hash.slice(0, 13);
    const slice2 = hash.slice(13, 26);
    const slice3 = hash.slice(26, 39);
    const int1 = parseInt(slice1, 16);
    const int2 = parseInt(slice2, 16)
    const int3 = parseInt(slice3, 16);

    const norm1 = (int1 / Math.pow(2, 52)) * 100
    const norm2 = (int2 / Math.pow(2, 52)) * 20
    const norm3 = (int3 / Math.pow(2, 52)) * 50

    let res = Math.max(0, norm1 - norm2)
    if (res == 0) {
        return norm3
    }
    if (res > 50) {
        return norm3 + 50
    }
    
    return res
}
