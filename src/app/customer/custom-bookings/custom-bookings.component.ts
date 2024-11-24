import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal/meal.model';
import { CustomBooking } from '../../models/custom-booking/custom-booking.model';
import { CustomBookingsService } from '../../shared/custom-bookings/custom-bookings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PricingService } from '../../shared/pricing/pricing.service';
import { MealService } from '../../shared/meal/meal.service';
import { AuthService } from '../../shared/auth/auth.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-custom-bookings',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './custom-bookings.component.html',
  styleUrl: './custom-bookings.component.css'
})
export class CustomBookingsComponent implements OnInit{
  breakfastPrice:number = 0
  lunchPrice:number = 0
  dinnerPrice:number = 0
  meals:Meal[]=[]
  subPrice:string = ''
  startDate:any
  customSubmit(){}
  customObj : CustomBooking = {
    customerId:'',
    customerName:this.authS.getData().name,
    breakfast:'0',
    lunch:'0',
    dinner:'0',
    days:'1',
    finalPrice:'0',
    status:false,
  }

  constructor(private custombookingS: CustomBookingsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private priceS: PricingService,
    private activatedRoute: ActivatedRoute,
    private authS:AuthService, 
  private mealS:MealService) { }

  ngOnInit():void{
    this.getMealData()
    // this.gettoday()
    this.customObj.customerId = this.authS.getId()
  }

  getMealData(){
    this.spinner.show()
    this.mealS.getAll().snapshotChanges().pipe(
      map(changes=>changes.map(c=>({id:c.payload.doc.id,...c.payload.doc.data() as Meal})))
    ).subscribe(
      (res)=>{
        this.spinner.hide()
        this.meals = res

        this.breakfastPrice = Number(this.meals.filter((x:any)=>{return x?.typeNo == 1})[0].pricePerDay)
        this.lunchPrice = Number(this.meals.filter((x:any)=>{return x?.typeNo == 2})[0].pricePerDay)
        this.dinnerPrice = Number(this.meals.filter((x:any)=>{return x?.typeNo == 3})[0].pricePerDay)
      },
    (err)=>{
      this.spinner.hide()
      console.log("Error in getting meals");
      this.toastr.error("Something Went Wrong")
    })
  }

  getCalc(){
    const breakF = Number(this.customObj.breakfast)
    const lun = Number(this.customObj.lunch)
    const dine = Number(this.customObj.dinner)

    const fp = ((breakF*this.breakfastPrice)+(lun*this.lunchPrice)+(dine*this.dinnerPrice))*(Number(this.customObj.days))

    this.subPrice = String(fp)
    this.customObj.finalPrice = String(fp)

  }

  gettoday(){
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = String(todayDate.getMonth() + 1).padStart(2, '0');
    const day = String(todayDate.getDate()).padStart(2, '0');
    this.customObj.start = `${year}-${month}-${day}`;
    this.customObj.end = `${year}-${month}-${day}`;
  }

  caldays(event:any)
    {
      this.startDate = event.target.value
      
      this.calcDaysFinal(this.startDate)
    }

    calcDaysFinal(startDate:any){
      const days = Number(this.customObj.days)

      const today = new Date(startDate);
      const futureDate = new Date(today);
      if(days>1)
      {
        futureDate.setDate(today.getDate() + (days-1));
        this.customObj.end = (futureDate.toISOString().substring(0, 10))
      }
      else{
        this.customObj.end = startDate
      }
    }

    calbill(){
      this.customObj.finalPrice = String(Number(this.subPrice)*Number(this.customObj.days))
      if(!!this.startDate) this.calcDaysFinal(this.startDate)
    }

    addSubmit() {
      // console.log(this.customObj)
      // return
      this.spinner.show()
      this.custombookingS.addData(this.customObj)
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
