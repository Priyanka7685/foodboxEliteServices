import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Meal } from '../../models/meal/meal.model';
import { CustomBooking } from '../../models/custom-booking/custom-booking.model';
import { CustomBookingsService } from '../../shared/custom-bookings/custom-bookings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PricingService } from '../../shared/pricing/pricing.service';
import { AuthService } from '../../shared/auth/auth.service';
import { MealService } from '../../shared/meal/meal.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-custom-bookings',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FormsModule, DatePipe],
  templateUrl: './manage-custom-bookings.component.html',
  styleUrl: './manage-custom-bookings.component.css'
})
export class ManageCustomBookingsComponent implements OnInit{
  custom : any[] = []
  manageCustomBooking : CustomBooking={}

  constructor(private customS: CustomBookingsService, private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
      this.getAllBooking()
  }

  getAllBooking() {
    this.customS.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as CustomBooking })))
    ).subscribe(
      (res) => {
        this.custom = res
        console.log(res);
      },
      (err) => {
        console.log("Error in getting bookings", err);
        this.toastr.error("Something Went Wrong")
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
        this.customS.updateData(id, {status: status}).then(
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



