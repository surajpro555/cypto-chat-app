import CryptoJS from "crypto-js";

const key1 = "abcdefghijklmnopqrstuvwxyz012467";
const key2 = "kkudefgh3843ggeifef89er88r012345";
const key3 = "hbr0540reuiehfegfeelmnopq4543000";

// Encryption function
const encrypt = (text, key) => {
  return CryptoJS.DES.encrypt(text, key).toString();
};

// Decryption function
const decrypt = (cipherText, key) => {
  const bytes = CryptoJS.DES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export function TDES_Decrypt(message) {
  return decrypt(decrypt(decrypt(message, key3), key2), key1);
}

export function TDES_Encrypt(message) {
  return encrypt(encrypt(encrypt(message, key1), key2), key3);
}
