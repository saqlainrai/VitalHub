const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');

// Encryption
function encryptAES(text, key, iv) {
    const cipher = createCipheriv('aes-256-cbc', key, iv); // Correct algorithm
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decryption
function decryptAES(encryptedText, key, iv) {
    const decipher = createDecipheriv('aes-256-cbc', key, iv); // Correct algorithm
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Generate Key and IV
const key = randomBytes(32); // 32 bytes for AES-256
const iv = randomBytes(16);  // 16 bytes IV for CBC

let keyS = "eoxXA4CZur9JyKUYYFMq4EbqLG5o7oXgKQpc/4VV0OQ=";
let ivS = "MnYf35BakNCAwmhhl1JQEA==";

// console.log("Key:", keyS);
// console.log("IV:", ivS);

let recK = Buffer.from(keyS, 'base64')
let recI = Buffer.from(ivS, 'base64')

// Encrypt and Decrypt
const message = "9163facea34b2c0e8722012c2d32058e";
const message1 = "12345678"
console.log(encryptAES(message1, recK, recI))
// console.log(decryptAES(message, recK, recI))
// try {
//     const encrypted = encryptAES(message, key, iv);
//     console.log("Encrypted:", encrypted);

//     const decrypted = decryptAES(encrypted, recK, recI);
//     console.log("Decrypted:", decrypted);
// } catch (error) {
//     console.error("Error:", error.message);
// }


// Passwords: [
//     {
//         _id: new ObjectId('677bf19e7fc162da935bfe08'),
//         site: 'LinkedIn',
//         email: 'saqlainmansab786@gmail.com',
//         password: '123Abc$$%',
//         userId: new ObjectId('6712b613abfb4ad85f770072'),
//         createdAt: 2025-01-06T15:07: 10.324Z,
//         updatedAt: 2025-01-06T15:07: 10.324Z,
//         __v: 0
//     },
//     {
//         _id: new ObjectId('677bf1d17fc162da935bfe0c'),
//         site: 'Google',
//         email: 'saqlainmansab786@gmail.com',
//         password: '321Dsa#@!',
//         userId: new ObjectId('6712b613abfb4ad85f770072'),
//         createdAt: 2025-01-06T15:08:01.241Z,
//         updatedAt: 2025-01-06T15:08:01.241Z,
//         __v: 0
//     },
//     {
//         _id: new ObjectId('677bf1e97fc162da935bfe0e'),
//         site: 'Facebook',
//         email: 'saqlainmansab786@gmail.com',
//         password: 'HHfam@786',
//         userId: new ObjectId('6712b613abfb4ad85f770072'),
//         createdAt: 2025-01-06T15:08: 25.272Z,
//         updatedAt: 2025-01-06T15:08: 25.272Z,
//         __v: 0
//     }
// ]