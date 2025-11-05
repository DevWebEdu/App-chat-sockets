export type RegisterForm  = {
    fullname : string
    username : string
    email   : string
    password : string
    password_confirmation : string
}


export type LoginForm = Pick<RegisterForm,"password"|"email">


export type userResponseType= {
    data : {
      fullname : string
      username : string
      email : string
      error: string
      _id : string
     // socketid : string
    } ,
    success : boolean
} 