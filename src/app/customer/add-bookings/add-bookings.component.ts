import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user.model';
import { UserService } from '../../shared/user/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pricing } from '../../models/pricing/pricing.model';
import { Bookings } from '../../models/bookings/bookings.model';
import { BookingsService } from '../../shared/bookings/bookings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PricingService } from '../../shared/pricing/pricing.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-add-bookings',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './add-bookings.component.html',
  styleUrl: './add-bookings.component.css'
})
export class AddBookingsComponent implements OnInit{
  userObj:User = {}
  priceObj: Pricing = {}
  minDate:any;
  priceId:any;
  duration:any;
  today:any;
  nextDay:any;

  bookingObj : Bookings = {
    customerId: '',
    customerName:this.authS.getData().name,
    pricingId:'',
    price:'',
    duration:'',
    status:'Pending'
  }

  constructor(private userS : UserService,private bookingS: BookingsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private priceS: PricingService,
    private activatedRoute: ActivatedRoute,
    private authS:AuthService) {}
  

  ngOnInit():void{
    this.bookingObj.customerId = this.authS.getId()
    this.setMinDate();
    this.priceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPrice(this.priceId)
    // this.getDuration(this.duration)a
  }

  getDuration() {}

  setMinDate() {
    this.today = new Date();
    this.nextDay = new Date(this.today);
    this.nextDay.setDate(this.today.getDate() + 1); // Set to next day
    this.minDate = this.nextDay.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  }

  getPrice(id: any) {
    this.spinner.show()
    this.priceS.getSingle(id).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.priceObj = res
        // console.log(this.priceObj)
        this.bookingObj.duration = id
        this.bookingObj.pricingId = id
        this.bookingObj.price = res.price
        this.bookingObj.duration = res.duration
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something Went wrong")
        console.log("Error in getting single pricing", err);
      }
    )
  }

  calcEndDate(event:any){
    // console.log(event.target.value)
    const sdate = event.target.value
    const daycount = Number(this.priceObj.days)
    const today = new Date(sdate);
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daycount);
    this.bookingObj.end = (futureDate.toISOString().substring(0, 10))
    // return futureDate.toISOString().substring(0, 10); // Returns date in 'YYYY-MM-DD' format
  }

  addSubmit() {
    // console.log(this.bookingObj)
    // return
    this.spinner.show()
    this.bookingS.addData(this.bookingObj)
      .then(
        () => {

          this.spinner.hide()
          this.toastr.success("Booking Request Sent", "Successful")
          this.router.navigateByUrl('/customer/view-my-bookings')
        },
        (err) => {
          this.spinner.hide()
          this.spinner.hide()
          this.toastr.error("Something went wrong", "Try again")
          console.log("Error in sending request", err);

        }
      )
  }

}
