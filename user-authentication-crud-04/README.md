## Implement user authentication with CRUD

#### module, entities, services, resolvers

(hash the password using bcrypt)

- createAccount
- login
- editProfile
- seeProfile

usersModule
usersResolver
usersService

userEntity

Dtos

UseGuard

jwtmiddleware
implement NestMiddleware, NestModule, graphqlContext, Global

authGuard
authUser

me

createAccount - hash Password using bcrypt

    @BeforeInsert()
    @BeforeUpdate()

login - compare password

editProfile - useGuard

    @UseGuard()

seeProfile - authUser

    @CreateDecorator

hashPassword()
comparePassword()
createJwt()
hashJwt()

Create Account - Entity - Dto - Resolver - Service - passwordHash - token?
