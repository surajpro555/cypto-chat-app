import CryptoJS from "crypto-js";

const key = "abcdefghijklmnopqrstuvwxyz012345";

// Encryption function
const encrypt = (text) => {
  return CryptoJS.DES.encrypt(text, key).toString();
};

// Decryption function
const decrypt = (cipherText) => {
  const bytes = CryptoJS.DES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export function DES_Decrypt(message) {
  return decrypt(message);
}

export function DES_Encrypt(message) {
  return encrypt(message);
}
