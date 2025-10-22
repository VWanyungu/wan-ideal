# **IDEAL B**

## **Project structure**

```javascript
v1
	---database
		---utils
		cacheSetup.js
		dbSetup.js
		
	---middlewares
		token.js
		
	---migrations

	---routers
		forgotPasswordRouter.js
		loginRouter.js
		logoutRouter.js
		refreshTokenRouter.js
		resetUserPasswordRouter.js
		signUpRouter.js
		usersRouter.js
		
	---seeds

	---tests
		
	---utils
		checkCache.js
		generateJwtToken.js
		hashPassword.js
		sendMail.js
	
middlewares
	version.js

index.js
knexfile.js
package.json
README.md
```

## **Dependencies**

1.  @upstash/redis: interact with hosted redis db
2.  bcrypt: hashing passwords
3.  dotenv: hide sensitive data
4.  express: node backend framework
5.  jsonwebtoken: creating and using token to pass information between front and backend
6.  knex: query builder to track db migrations
7.  nodemailer: send mail from code
8.  nodemon: dev dependency to restart server automatically on changes
9.  pg: interact with postgres db

## **Middlewares**

1.  Version middlware:  looks for version header and direct to appropriate server
2.  Token middlware: check for the token header in every request, checks validity and whether it is blacklisted before forwarding to the nect router

# **Login**

**Endpoint**: baseUrl/login

```javascript
const payload = {
	"email": "doe@gmail.com",
	"password": "somepassword"
}
```

**Execution**

1.  Check whether user exists in the database. If not, send error message

```javascript
const user = await Users.getSingleUserByEmail(email)
```

1.  If the user is in the database, check if the passwords match, if not send error message

```javascript
bcrypt.compare(password, user.passwordHash, async function(err, result) {})
```

1.  If the passwords match, generate and send an access and refresh token to the user. Store refresh token in db.

```javascript
const {token, refreshToken} = generateJwtToken(payload, "all")
```

# **Logout**

**Endpoint:** baseUrl/forgot-password

```javascript
const payload = {
	"token": "suhasdkhlhaskhaskchsd9eyf924yr92hfweodfh",
	"refreshToken": "sdgsDGSIdaSKDHASKDHI8y6r29r29r2sidfhasidh"
}
```

**Execution**

1.  Delete refresh token from the database

```javascript
await Tokens.deleteRefreshToken(refreshToken)
```

1.  Blacklist the access token by creating a key in the cache for it

```javascript
await Cache.set(`blacklist_${token}`, true, {ex: 900})
```

1.  Add the token to the blacklisted token table in the database

```javascript
await Tokens.blacklistToken(token)
```

# **Forgot password**

**Endpoint:** baseUrl/forgot-password

```javascript
const payload = {
	"email": "doe@gmail.com"
}
```

**Execution**

1.  Check if the email exists in the db, if not send and error message

```javascript
const user = await Users.getSingleUserByEmail(email)
```

1.  If the email exists, generate a forgot password token to be used during password reset

```javascript
const {forgotPasswordToken} = generateJwtToken(payload, "forgotPassword") 
```

1.  After generating the forgot password token, send to the user's email. 

```javascript
const sendRes = await sendPasswordResetMail({
	to: user.email,
	subject: 'Calibre Software Solutions - Password Reset',
	html: `<p>${process.env.FRONTEND_URL}/reset-			        	password/${forgotPasswordToken}</p>`
})
```

# **Reset password**

**Endpoint:** baseUrl/reset-password/:token

```javascript
const payload = {
	"password": "somenewpassword"
}
```

**Execution:**

1.  Verify the token passed as parammeter

```javascript
jwt.verify(resetToken, process.env.FORGOT_PASSWORD_TOKEN_SECRET, async (err, user) => {})
```

1.  If the token is valid, hash the password passed in the request body

```javascript
const hashedPassword = await hashPassword(req.body.password);
```

1.  Update the hashed password in the database

```javascript
const updateRes = await Users.updateUserPassword(userObj)
```

# **Refresh access token**

**Endpoint:** baseUrl/token

```javascript
const payload = {
	"refreshToken": "hss79439y834hskhsdfkhd904u3r2ur02hdklfh"
}
```

**Execution:**

1.  Check if the refresh token is in the db

```javascript
const {refreshToken} = await Tokens.getRefreshToken(inputRefreshToken)
```

1.  Verify the refresh token

```javascript
jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {})
```

1.  If the token is valid, generate a new access token and send to the user

```javascript
const {token} = generateJwtToken(payload, "token")  
```