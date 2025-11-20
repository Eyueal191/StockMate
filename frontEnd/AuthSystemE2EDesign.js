/*
This is the Authentication E2E Design Logic Description.
FrontEnd.
1. signUp page where user's name, email and password will be collected and sent to the backend signUp controller
BackEnd.
1. signUp controller where it grab user's name, email and password from the incoming request from the frontEnd
   it  does - check if the user is registered before
            - generate Access token and refresh Token using userId as payload
            - hashPassword
            - save accessToken and refreshToken on the database
            - generateVerifyOTP send it to the userEmail and save it to the db.
            - then finally send access token as part of body and refreshToken as cookie
FrontEnd.
2. verifyEmailOTP it grab the opt sent to the email from the backend to the userEmail and send opt + email to the backend
BackEnd.
2. verifyEmailOtp controller grab opt + email then it get the userBy it's email and check if the otp is expired or not if not it make the verifyEmail OTP to null and
verify the user and save it to the db.
FrontEnd.
1. LogIn
 it grab user email + password and send it to the backend
BackEnd.
2. logIn Controller It grab email and password and check if the user's authenticated User if it's it send back
refershToken + accessToken as cookie and part of body and the LogIn page grab the accessToken+ userEmail and it will save it to the localStorage.
FrontEnd.
1.ForgotPassword Page. It grab the user's email and send it to forgotPasswordController
if it succeeded it redirect the user to verifyPasswordOTP page
BackEnd.
2. ForgotPassword Controller. It grab user email from the frontEnd and generate passwordOTP then it save the opt to db and send to user Email too.
FrontEnd.
1. VerifyPasswordOTP page. it grab passwordOTP and email from the user and send it to the backend

BackEnd.
verifyPasswordOTP controller. it grab the passwordOTP + email from the user and check if it's valid and not expired 
then save it to database.
FrontEnd.
1. PasswordReset Page. email + newPassword will be sent to the backend
if succeed redirect to the logIn Page.
BackEnd. 
2. PassswordReset Controller.  grab email and newPassword.
                               - check if user Exist.
                               - hashPassword and save it to the database
ResendOTP button In VerifyEmailOTP page
FrontEnd.
1. verifyEmailOTPResend send the userEmail to the getnewVerfiyEmailOTP controller.
BackEnd.
2. getnewVerfiyEmailOTP controller 
grab user email and send new otp with new expiryDate to user's email
ResendOPT button In forgotPasswordOTP page.
1. verifyPasswprdOTPResend send the userEmail to the getnewVerfiyEmailOTP controller.
BackEnd.
2. getnewVerfiyPasswordOTP controller 
grab user email and send new otp with new expiryDate to user's email
so tomorrow my Job will be to wrap up E2E Authentication System.
then I'll be able to proceed to master mongoDB + mongoose with practical approach then
I'll move to design my backend for these Entities 
1. Items
2. Sale
3. Category
4.
5.
6.
7.
8.
9.
10.
*/