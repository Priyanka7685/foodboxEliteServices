import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Meal } from '../../../models/meal/meal.model';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MealService } from '../../../shared/meal/meal.service';

@Component({
  selector: 'app-add-meals',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './add-meals.component.html',
  styleUrl: './add-meals.component.css'
})
export class AddMealsComponent {

  constructor(private router: Router, private toastr:ToastrService, private spinner : NgxSpinnerService, private mealS: MealService) {}

  mealSubmit() {
    this.spinner.show()
    this.mealS.addMeal(this.mealObj).then(
      ()=>{
        this.spinner.hide()
        this.toastr.success("Meal Added","Successfully")
        this.router.navigateByUrl('admin/manage-meals')
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went wrong","Please try again")
        console.log("Error in add-meals",err)
        
      }
    )

  }
  mealObj: Meal = {}
}
