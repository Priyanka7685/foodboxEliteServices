import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user/user.model';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user/user.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/auth/auth.service';
import { BookingsService } from '../../shared/bookings/bookings.service';

@Component({
  selector: 'app-manage-customers',
  standalone: true,
  imports: [RouterLink ,DatePipe],
  templateUrl: './manage-customers.component.html',
  styleUrl: './manage-customers.component.css'
})
export class ManageCustomersComponent implements OnInit{
  manageCustomers: User = {}
  customers:any[] = []


    constructor(private spinner: NgxSpinnerService,
      private toastr:ToastrService,
      private userS: UserService,
      private authS : AuthService,
    ) {}

    ngOnInit(): void {
        this.getAllUsers()
    }

    getAllUsers() {
      this.spinner.show()
      let id = sessionStorage.getItem('id')
      this.userS.getAll().snapshotChanges().pipe(
        map(changes=>changes.map(a=>({is:a.payload.doc.id, ...a.payload.doc.data()})))
      )
      .subscribe(
        (res) => {
          this.spinner.hide()
          console.log(res);
          this.customers = res
          
        },
        (err) => {
          this.spinner.hide()
          this.toastr.error("Something went wrong", "Try Again")
          console.log("Error in fetching customers", err);
          
        }
      )
    }

    changeStatusFunc(id: any,status:any) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to change status of this customer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, perform it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.spinner.show()
          // this.mealS.deleteData(id).then(
          this.userS.updateData(id, {status: status}).then(
            () => {
              this.spinner.hide()
              this.toastr.success("Status Changed")
              // this.authS.setData(this.userObj)
              Swal.fire({
                title: "User!",
                text: "Status has been Changed.",
                icon: "success"
              });
            },
            (err) => {
              this.spinner.hide()
              this.toastr.error("Something Went Wrong", "Try Again")
              console.log("Error in updating status", err);
            }
          )
        }
      });
    }



    // block func end
}
