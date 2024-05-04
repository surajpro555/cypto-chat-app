import { RSA_Encrypt, RSA_Decrypt } from "../utils/RSA";
import { AES_Encrypt, AES_Decrypt } from "../utils/AES";
import { DES_Encrypt, DES_Decrypt } from "../utils/DES";
import { TDES_Encrypt, TDES_Decrypt } from "../utils/TDES";

export function RandomEncrypt(message, type) {

  if (type == "RSA") {
    return RSA_Encrypt(message);
  }

  if (type == "DES") {
    return DES_Encrypt(message);
  }

  if (type == "AES") {
    return AES_Encrypt(message);
  }

  return TDES_Encrypt(message);
}


export function RandomDecrypt(message, type) {

  if (type == "RSA") {
    return RSA_Decrypt(message);
  }

  if (type == "DES") {
    return DES_Decrypt(message);
  }

  if (type == "AES") {
    return AES_Decrypt(message);
  }

  return TDES_Decrypt(message);
}
