function provablyFairHash(serverSeed, clientSeed, nonce) {
    return crypto
        .createHmac("sha256", serverSeed)
        .update(`${clientSeed}:${nonce}`)
        .digest("hex");
}

function provablyFairFloat(hash) {


    const slice1 = hash.slice(0, 13);
    const slice2 = hash.slice(13, 26)
    const int1 = parseInt(slice1, 16);
    const int2 = parseInt(slice2, 16)

    const norm1 = (int1 / Math.pow(2, 52)) * 100
    const norm2 = (int2 / Math.pow(2, 52)) * 20

    return Math.max(0, norm1 - norm2);
}

const serverSeed = "YOURSERVERSEED"
const clienSeed = "YOURCLIENTSEED"
let nonce = 0

let roll = provablyFairFloat(provablyFairHash(serverSeed, clienSeed, nonce))
console.log(roll)
