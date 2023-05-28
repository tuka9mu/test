import { Component } from '@angular/core';

import {Apollo, gql} from 'apollo-angular';
import { AuthService } from './components/auth/Service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public auth:AuthService){}
}
