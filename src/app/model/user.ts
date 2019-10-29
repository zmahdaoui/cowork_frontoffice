export class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: String;
    birthday: string;
    date_inscription: string;
    client:boolean;

    constructor(id: number, first_name: string, last_name: string, email: string, password: string, confirmPassword: String, birthday: string, date_inscription: string, client: boolean){
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.birthday = birthday;
      this.date_inscription = date_inscription;
      this.client = client;
    }
  }
export class LoginResponse {
    status: number;
    result: User;
    message: string;

    constructor(status: number, result: User, message= ''){
      this.status = status;
      this.result = result;
      this.message = message;
    }
}