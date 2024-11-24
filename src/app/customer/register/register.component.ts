import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user/user.model';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userObj:User = {}

  constructor(private userS : UserService) {}
  
    regSub() {
      this.userS.register(this.userObj)
    }

}
