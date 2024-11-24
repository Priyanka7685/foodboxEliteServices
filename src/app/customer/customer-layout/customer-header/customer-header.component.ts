import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../shared/user/user.service';
import { User } from '../../../models/user/user.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-customer-header',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.css'
})
export class CustomerHeaderComponent implements OnInit {

  login:boolean = false

  constructor(private router: Router, private toastr:ToastrService, private auth:AuthService, private spinner:NgxSpinnerService, private userS:UserService){}

  ngOnInit(): void {
      this.checkLogin()

  }
  
  checkLogin() {
    if(this.auth.getLogin() == 'true') {
      this.login = true
    } else{
      this.login = false
    }
  }

   logout() {
    this.userS.logout()
  }

  manageCustomers:User[] = []

}
