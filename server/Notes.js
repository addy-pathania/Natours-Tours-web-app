/*
Create Node API for Natours Project

Features
 - User authentication and authorization
 - social sign on
 - Return Natours routes and protect them

 BACKEND

**Files and Functions**

**App.tsx**
- Put app logic

** Index.tsx **
- Put server start logic

**Db.tsx**
- Connect to MongoDB

** Routes **
   User
    - `POST /register` - User registration
    - `POST /login` - User authentication
    - `POST /logout` - User logout (secured)
    - `GET /current-user` - Get current user info (secured)
    - `POST /change-password` - Change user password (secured)
    - `POST /refresh-token` - Refresh access token
    - `GET /verify-email/:verificationToken` - Email verification
    - `POST /forgot-password` - Request password reset
    - `POST /reset-password/:resetToken` - Reset forgotten password
    - `POST /resend-email-verification` - Resend verification email (secured)
   Natours
    

** Model **
    - User model
        - avatar
        - username
        - email
        - password
        - fullname
        - accessToken
        - refreshToken
        - isEmailVerified
        - forgotPasswordToken
        - forgotPasswordExpiry,
        - emailVerificationToken
        - emailVerificationExpiry
        - passwordChangedAt
        - role ['user', 'guide', 'lead guide', 'admin']
    Natours model
        - 
- hooks
    - hash password on save
- methods
    - isPasswordCorrect
    - generateAccessToken
    - genersteRefreshToken
    - generateTemporaryToken
    - changePasswordAfter(boolean)
        - JWTTimestamp should be less than passwordChangedAt

** Controllers **
  Auth.controller
    - generateAccessAndRefreshTokens
        - get user from DB
        - get accessToken and refreshToken
        - save refresh token
        - return access and refresh token
    - RegisterUser
        - get email username and password
        - check if user already exists using username or email
        - generate temporary token
        - save user
        - send verification email
        - send back the created user
    - LoginUser
        - get email and password from req
        - find user in DB
        - validate password
        - generate access and refresh token
        - return user and set access and refresh token in cookies
    - LogoutUser
      - get the user from req
      - Remove access token from DB
      - Delete both cookies
    - getCurrentUser
    - verifyEmail
        - get verification token form url
        - hash it
        - find user in DB with hashed token
    - resendEmailVerification
        - get current user form req
        - check if user already verified
        - generate temp tokens
        - set new token and expiry
        - save the user
        - send email
    - refreshAcessToken
        - get refreshToken
        - verify refreshToken
        - get User
        - check if refreshToken === user.refreshToken
        - generate new access and refresh token
        - save it in DB
        - send it client
    - forgotPassword
        - get email from req
        - geenrate temporary token
        - send email
    - resetForgotPassword
        - get resetToken from url
        - get new password from req
        - hash the resetToken
        - find user with hashed reset token
        - if found set new password
        - update passwordChangedAt
    - changePassword
        - get both old and new password from req
        - get user from DB
        - check if old password is correct
        - set old password as new password


** Middleware **
- verifyJWT
    - get token from req
    - verify/decode token
    - find user with decoded token
    - check changedPasswordAfter
    - attach user to req.user
- validate
- restrictTo
- rate limit ( use package express-rate-limit)
- clean mongo input data ( express-mongo-sanitize)
- xss-clean
- prevent parameter pollution ( hpp )

** Validator **
    - userRegisterValidator
    - userLoginValidator
    - userChangeCurrentPasswordValidator
    - userForgotPasswordValidator

** Utils **
    - Node mailer
    - Error handling class
    - Response class
    - constants

- Security
    - encrypt passwords
    - ecrypt password reset tokens wiht expiry date
    - implmenet rate limiting
    - implement max login attempts
    - store JWT in httpOnly cookies
    - sanitize input data(express-mongo-sanitize and xss-clean)
    - set special http header (use helmet pcakage)
    - limit the data sent in body
    - ALways use HTTPS
    - Use SSL - create certificate
    - Install NDB for debugging

 *** Use Social Sign On ***

 - User
 - Webapp(medium.com)
 - authorization server (google or okta)
 - Resource server (users app)


 - webapp makes a code request to the authorizations servers /authorize endpoint
 - authroization server redirects(302) the user to the authorization servers login page(googles login page)
 - User logs in and with deatils and gives consent to the authentication server
 - authorization server sends a code response to the web app
 - webapp sends back the code + client secret(lives on webapps server) to the authorization server's /token endpoint
 - authroization server sends back the access token
 - this access token gets saved in the browser either in local storage or cookies
 - the access token gets attached to all subsequent requests.

 - Install passport and passport for google
 - setup passport middleware 
    - initialize the new Strategy which will take in AUTH_OPTIONS and verifyCallback
        - AUTH_OPTIONS will have client_id, cliet_secret and callbackUrl
        - verifyCallback will be used to verify the accessToken if we use traditinal auth flow or saving the user data 
          i.e the profile to the database
        - Create the /auth/google/callback' endpoint
            Used to handle
                - THis is the callbakcUrl to which the googgle sends the code response to
                - Then this enpoint with the help of passport sends back the code and clientSecret to google
                - google sends back accessToken and refreshToken
        - Create '/auth/google' endpoint
            - initialize the authentication flow
- Use express-session for maintaining server side session and use cookie-session for client side session
*/
