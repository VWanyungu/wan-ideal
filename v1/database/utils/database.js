import db from "../setup.js";

export class Users {
    static async getAllUsers({ page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;
        const users = await db('users')
            .select('*')
            .limit(limit)
            .offset(offset)
            .orderBy('id');
        
        const total = await db('users').count('* as total');
        
        return {
            users: users,
            pagination: { 
                page: page, 
                limit: limit, 
                total: total[0].total,
                pages: Math.ceil(total[0].total / limit)
            }
        };
    }

    static async getSingleUserByEmail(email) {
        const [user] = await db('users')
            .select('email', 'password_hash')
            .where("email", email )
        
        return {
            userId: user.id,
            email: user.email,
            passwordHash: user.password_hash
        };
    }

    static async createUser(userObj) {
        const [user] = await db('users')
            .insert({
                first_name: userObj.firstName,
                last_name: userObj.lastName,
                email: userObj.email,
                password_hash: userObj.passwordHash,
                username: userObj.username,
                is_verified: userObj.isVerified || 'false',
                role: userObj.role || 'user'
            })
            .returning(['id', 'email', 'password_hash']);

        return {
            userId: user.id,
            email: user.email,
            passwordHash: user.password_hash
        };
    }

    static async updateUserPassword(userObj) {
        try{
            const user = await db('users')
                .update({               
                    password_hash: userObj.passwordHash,
                })
                .where("id", userObj.userId)

            return {
                status: "success",
                error: null
            }

        }catch (err){
            return {
                status: "fail",
                error: err
            }
        }
    }
}  

export class Tokens {
    static async getRefreshToken(token){
      const [refreshToken] = await db('refreshTokens')
            .select('refresh_token')
            .where("refresh_token", token )
      return {
         refreshToken: refreshToken ? refreshToken.refresh_token : null
      }
    
    }
}