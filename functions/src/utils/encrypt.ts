import crypto from 'crypto';
import { env } from '../config/env';

const algorithm = 'aes-256-cbc';
const iv = Buffer.alloc(16, 0);

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, env.encription_key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');

  encrypted += cipher.final('hex');

  return encrypted;
}
