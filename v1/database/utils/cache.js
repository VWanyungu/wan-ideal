import redis from "../cacheSetup.js";
import 'dotenv/config';

export class Cache {
   static async set(key, value) {
        await redis.set(key, value, {ex: process.env.TOKEN_EXPIRY_SECONDS});        
   }

   static async get(key) {
       return await redis.get(key);
   }

   static async del(key) {
       return await redis.del(key);
   }
}  