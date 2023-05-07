import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;
  isValidUser: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,private router: Router,private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('admin', [Validators.required, Validators.email]),
      password: new FormControl('1234@tuka', [Validators.required]),
    });
  }

  onSubmit() {
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['/main']);  // If valid and route to card
        }
        this.isSubmitted = true;
        this.isValidUser = data; // false show error message
      });
  }

  logout() {
    this.authService.logout();
  }
}
