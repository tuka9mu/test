import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}
  isAuthenticate: boolean = false;

  login(email: string, password: string): Observable<boolean> {
    if (email === 'admin' && password === '1234@tuka') {
      this.isAuthenticate = true;
      return of(true);
    }
    return of(false);
  }

  logout(){
    this.isAuthenticate = false;
    this.router.navigate(['']);
  }

}
