const CryptoJS = require('crypto-js');

const getKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error('ENCRYPTION_KEY is not set');
  return key;
};

/**
 * Encrypt a plain-text string → base64 ciphertext string
 */
const encrypt = (text) => {
  const encrypted = CryptoJS.AES.encrypt(String(text), getKey());
  return encrypted.toString();
};

/**
 * Decrypt a base64 ciphertext string → plain-text string
 */
const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, getKey());
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * Middleware: decrypt request body fields listed in `fields`
 */
const decryptRequest = (fields = []) => (req, res, next) => {
  try {
    for (const field of fields) {
      if (req.body[field]) {
        req.body[field] = decrypt(req.body[field]);
      }
    }
    next();
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid encrypted payload' });
  }
};

/**
 * Middleware: wrap res.json to encrypt specified response fields
 */
const encryptResponse = (fields = []) => (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (body && body.data && typeof body.data === 'object') {
      for (const field of fields) {
        if (body.data[field] !== undefined) {
          body.data[field] = encrypt(body.data[field]);
        }
      }
    }
    return originalJson(body);
  };
  next();
};

module.exports = { encrypt, decrypt, decryptRequest, encryptResponse };
