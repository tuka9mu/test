import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public authService: AuthService,public router:Router) { }

  ngOnInit(): void {
//   let Roles = this.authService.getRols()
//     if (Roles.includes("SuperAdmin"))
// {
//    console.log('admin')
// }

//       console.log('maker')
//   }

  }


  onLogout(){
    this.authService.signOut();
  }


}
