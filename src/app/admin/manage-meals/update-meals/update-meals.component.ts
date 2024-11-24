import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Meal } from '../../../models/meal/meal.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MealService } from '../../../shared/meal/meal.service';

@Component({
  selector: 'app-update-meals',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './update-meals.component.html',
  styleUrl: './update-meals.component.css'
})
export class UpdateMealsComponent implements OnInit {
  mealId: any
  mealObj: Meal = {}

  constructor(private activatedRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private MealS: MealService,
    private router: Router) { }

  ngOnInit(): void {
    this.mealId = this.activatedRouter.snapshot.paramMap.get('id')
    this.getSingleMeal(this.mealId)
  }

  getSingleMeal(id: any) {
    this.spinner.show()
    this.MealS.getSingle(id).subscribe(
      (res: any) => {
        this.spinner.hide()
        this.mealObj.day1 = res.day1
        this.mealObj.day2 = res.day2
        this.mealObj.day3 = res.day3
        this.mealObj.day4 = res.day4
        this.mealObj.day5 = res.day5
        this.mealObj.day6 = res.day6
        this.mealObj.day7 = res.day7
        this.mealObj.pricePerDay = res.pricePerDay
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went wrong", "Try again")
        console.log("Error in single meal");

      }
    )

  }

  updateMeal() {
    this.spinner.show()
    this.MealS.updateData(this.mealId, this.mealObj).then(
      (res) => {
        this.spinner.hide()
        this.toastr.success("Meal Updated", "Successful")
        this.router.navigateByUrl('/admin/manage-meals')
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went wrong", "Try again")
        console.log("Error in updating meal", err);

      }
    )
  }

}
