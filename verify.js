function provablyFairHash(serverSeed, clientSeed, nonce) {
    return crypto
        .createHmac("sha256", serverSeed)
        .update(`${clientSeed}:${nonce}`)
        .digest("hex");
}

function provablyFairFloat(hash) {

    // First 13 hex chars = 52 bits (safe for JS numbers)
    const slice = hash.slice(0, 13);
    const int = parseInt(slice, 16);

    // Normalize to [0, 1), then scale to [0, 100)
    return (int / Math.pow(2, 52)) * 100;
}

const serverSeed = "YOURSERVERSEED"
const clienSeed = "YOURCLIENTSEED"
let nonce = 0

let roll = provablyFairFloat(provablyFairHash(serverSeed, clienSeed, nonce))
console.log(roll)
