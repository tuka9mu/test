import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import {Apollo, gql} from 'apollo-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public authService: AuthService){}
}
