import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomBooking } from '../../models/custom-booking/custom-booking.model';
import { Bookings } from '../../models/bookings/bookings.model';
import { BookingsService } from '../../shared/bookings/bookings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomBookingsService } from '../../shared/custom-bookings/custom-bookings.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-view-my-bookings',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './view-my-bookings.component.html',
  styleUrl: './view-my-bookings.component.css'
})
export class ViewMyBookingsComponent implements OnInit{
  manageBooking: Bookings = {}
  bookings: any[] = []
  manageCustomBooking: CustomBooking = {}
  custombookings: any[] = []

  constructor(private bookingS: BookingsService, private toastr: ToastrService, private spinner: NgxSpinnerService, private customS: CustomBookingsService) { }

  ngOnInit(): void {
    this.getAllBooking()
    this.getCustomBooking()
  }

  getAllBooking() {
    this.bookingS.getMyAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as Bookings })))
    ).subscribe(
      (res) => {
        this.bookings = res
        console.log(res);
      },
      (err) => {
        console.log("Error in getting bookings", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }
  
  getCustomBooking() {
    this.customS.getMyAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() as CustomBooking })))
    ).subscribe(
      (res) => {
        this.custombookings = res
        console.log(res);
      },
      (err) => {
        console.log("Error in getting custom bookings", err);
        this.toastr.error("Something Went Wrong")
      }
    )
  }

}
