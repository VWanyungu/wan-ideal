1. Naming
- standard

2. Response structures
{
                    status: "success",
                    data: {response},
                    message: "Users retrieved successfully"
                }

3. Status codes
200 - success, 500 - server error, 400 - input error, 404 - not found

4. Versioning
- version check middleware

5. Pagination
- page and limit set in queries

6. Authentication
 - tokens created on login, deleted on logout, refresh token stored in db

7. Access control
- set user from toke, check role

8. Validation X

9. Hashing
- bcrypt

10. Rate limiting
 - to be done at reverse proxy level