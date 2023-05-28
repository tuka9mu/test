import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string= ""
  password:string= ""
  LogForm = this.formBuilder.group({
    username: 'ahmed.shakour',
    password: '123456'
  });

  loginform = true;

  constructor(public authservices: AuthService, private formBuilder: FormBuilder) { }
  user: User = {
    id: 0,
    username: "",
    password: ""
  }
  ngOnInit(): void {
    console.log(this.authservices.Islogin())
  }
  signin(){
    console.log(this.loginform )
   // this.authservices.signIn(this.person)
  }
  onSubmit(){
    let username = this.LogForm.get('username')?.value
    let password = this.LogForm.get('password')?.value

    console.log(username);

    console.log(password);

    this.user.username = username ||''
    this.user.password = password ||''

    this.authservices.signIn(this.user)


  }


}
