`https://www.youtube.com/watch?v=f55qeKGgB_M&list=PLpPqplz6dKxW5ZfERUPoYTtNUNvrEebAR&index=19`

- Setup firebase then
> npm install firebase
- The hooks useAuthState:
>npm install react-firebase-hooks
- Implemented the login/logout logic.

Ep 16: Go to firebase database with production mode
install `react-hook-form yup @hookform/resolvers`
Add the create form then connect to the firebase firestore
* Change the firestore Rules for the read/write/update/delete permisson

EP-17: getDocs, collection...
New firestore collection for likes: User cannot like the their own post
Prevent the like duplicate user when they re-liked n times -> delete like if unlike.

EP-18: Deploying a Firebase React App:
npm install -g firebase-tools
firebase login
firebase init
Select the Hosting: Configure files for Firebase... option (Space then Enter)
"What do you want to use as your public directory?" `build`