import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from 'src/app/model/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = {};
  UserRole: String[] = [];

  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo, public router: Router) {
    this.apollo = this.apolloProvider.use('addwafariz');
  }
  public getSignIn(user: User): Observable<User> {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            UserSignIn(data:
              {
                  id: 0,
                  username:"${user.username}",
                  password:"${user.password}",
                }
              )
            {
              id
              username
              password
             RoleForUser{
    Role{
      name
    }
  }
            }
          }
        `,
      })
      .valueChanges.pipe(
        map((result: any) => result?.data),
        map((data) => data?.UserSignIn)
      );
  }

  signIn(user: User) {
    console.log(user);
    this.getSignIn(user).subscribe((data: any) => {
      user = data;
      console.log(data);
      localStorage.setItem('access_token', data.password);
      localStorage.setItem('username', data.username);
      var roles = data.RoleForUser.map((name: any) => name?.data);
      this.UserRole = roles;
      localStorage.setItem('user_roles', JSON.stringify(roles)); //store colors
      console.log(roles);
      this.currentUser = data;
      console.log(
        '----------------------------------------------------------------------------'
      );
      console.log(this.currentUser);
      this.router.navigate(['/dashboard']);
    });
  }

  GetUsername() {
    return localStorage.getItem('username') || '';
  }
  public getRols() {
    return JSON.parse(localStorage.getItem('user_roles') || '') || [];
  }
  signOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }
  Islogin() {
    if (localStorage.getItem('username')) {
      return true;
    } else {
      return false;
    }
  }
}
