import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../models/user/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user/user.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})

export class UpdateProfileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userS : UserService, private spinner:NgxSpinnerService, private toastr: ToastrService, private router: Router, private authS : AuthService){}

  userId:any
  userObj:User = {}

    ngOnInit(): void {
      this.userId = this.authS.getId()
      this.userObj = this.authS.getData()
    }

    updateProfile() {
      this.spinner.show()
      this.userS.updateData(this.userId, this.userObj).then(() => {
        this.spinner.hide()
        this.toastr.success("Profile updated", "Successfull")

        this.authS.setData(this.userObj)
      },
      (err)=> {
        this.spinner.hide()
        this.toastr.error("Something went wrong")
        console.log("Error in updating profile", err);
        
      })
    
    }

}
