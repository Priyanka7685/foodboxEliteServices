import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = 'abc@gmail.com'
  password: string = ''

  constructor(private router:Router,
  private toastr: ToastrService,
  private auth:AuthService, 
  private spinner: NgxSpinnerService, 
  private userS:UserService) {}

  loginSubmit() {
    this.userS.login(this.email, this.password)
  }
}


