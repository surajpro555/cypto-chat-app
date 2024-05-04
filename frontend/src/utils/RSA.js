let public_key;
let private_key;
let n;

function setkeys() {
  let prime1 = 31;
  let prime2 = 41;

  //console.log(prime1+" "+prime2);

  n = prime1 * prime2;
  let fi = (prime1 - 1) * (prime2 - 1);
  let e = 2;

  while (true) {
    if (gcd(e, fi) === 1) break;
    e++;
  }

  public_key = e;

  let d = 2;
  while (true) {
    if ((d * e) % fi === 1) break;
    d++;
  }
  private_key = d;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function encrypt(message) {
  let e = public_key;
  let encrypted_text = 1;

  while (e--) {
    encrypted_text *= message;
    encrypted_text %= n;
  }

  return encrypted_text;
}

function decrypt(encrypted_text) {
  let d = private_key;
  let decrypted = 1;

  while (d--) {
    decrypted *= encrypted_text;
    decrypted %= n;
  }

  return decrypted;
}

function encoder(message) {
  let form = [];

  for (let i = 0; i < message.length; i++) {
    form.push(encrypt(message.charCodeAt(i)));
  }
  
  let str="";

  for(let i=0;i<form.length;i++)
  {
      let s=String(form[i]);
      while(s.length<5)
      {
        s='0'+s;
      }
      str=str.concat(s)
  }
  return str;
}

function decoder(encoded_str) {
  encoded_str = encoded_str?.match(/.{1,5}/g);
  let encoded=[];
  for (let i = 0; i < encoded_str?.length; i++) {
    encoded.push(Number(encoded_str[i]));
  }

  let s = "";

  for (let i = 0; i < encoded?.length; i++) {
    s += String.fromCharCode(decrypt(encoded[i]));
  }
  return s;
}

export function RSA_Decrypt(message) {
  setkeys();
  return decoder(message);
}

export function RSA_Encrypt(message) {
  setkeys();
  return encoder(message);
}