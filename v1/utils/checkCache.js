import { Cache } from '../database/utils/cache';
import {Tokens} from "../database/utils/database.js";

export async function isTokenBlacklisted(token){
    const blacklisted = await Cache.get(`blacklist_${token}`)
    if (blacklisted != null){
        return blacklisted
    }
    
    const data = await Tokens.checkBlacklistToken(token)
    switch (data){
        case true: 
            await Cache.set(`blacklist_${token}`, true, {ex: 900})
            return true
        case false:
            await Cache.set(`blacklist_${token}`, false, {ex: 900})
            return false
    }
    
}