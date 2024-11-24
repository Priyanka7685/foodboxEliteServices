import { Component } from '@angular/core';
import { AuthService } from '../../../shared/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  constructor(private auth:AuthService,private router: Router,private toastr:ToastrService, private userS:UserService) {}

  logout() {
    this.userS.logout()
  }
}
