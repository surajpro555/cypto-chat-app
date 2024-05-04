import CryptoJS from "crypto-js";

const key = "abcdefghijklmnopqrstuvwxyz012345";

// Encryption function
const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

// Decryption function
const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export function AES_Decrypt(message) {
  return decrypt(message);
}

export function AES_Encrypt(message) {
  return encrypt(message);
}
