## Implement user authentication with CRUD

#### module, entities, services, resolvers

(hash the password using bcrypt)

- createAccount
- login
- editProfile
- seeProfile

Create Account

- bcrypt hash password

Login

- bcrypt compare Password
- jwt sign token
- config dotenv

me

- getToken
- middleware apply AppModule
- get userId in verified token and findOne({id})
- userInfo add req['user']

Authentication

@UseGuard()

- GqlExecutionContext
- CanActive
- return boolen

@AuthUser()

- createParamDecorator
- GqlExecutionContext
- return userInfo

editProfile

- PartialType
- password compare and rehash @BeforeUpdate()
