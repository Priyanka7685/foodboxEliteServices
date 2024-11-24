import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user/user.service';
import { map } from 'rxjs';
import { Bookings } from '../../models/bookings/bookings.model';
import { BookingsService } from '../../shared/bookings/bookings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './manage-bookings.component.html',
  styleUrl: './manage-bookings.component.css'
})
export class ManageBookingsComponent implements OnInit{
  manageBooking: Bookings = {}
  bookings:any[] = []


  constructor( private bookingS: BookingsService, private toastr:ToastrService, private spinner: NgxSpinnerService) {}
  
  ngOnInit(): void {
      this.getAllBooking()
  }


  getAllBooking() {
    this.bookingS.getAll().snapshotChanges().pipe(
      map(changes=> changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data() as Bookings })))
    ).subscribe(
      (res) => {
        this.bookings = res
        console.log(res);
        
      },
      (err) => {
        console.log("Error in getting bookins", err);
        this.toastr.error("Something went wrong")
        
      }
    )
  }

  changeStatusFunc(id:any, status:any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to change status of this customer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, perform it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        // this.mealS.deleteData(id).then(
        this.bookingS.updateData(id, {status: status}).then(
          () => {
            this.spinner.hide()
            this.toastr.success("Status Changed")
            Swal.fire({
              title: "Booking!",
              text: "Status has been Changed.",
              icon: "success"
            });
          },
          (err) => {
            this.spinner.hide()
            this.toastr.error("Something Went Wrong", "Try Again")
            console.log("Error in deleting Meal", err);
          }
        )
      }
    });
  }

  
}
