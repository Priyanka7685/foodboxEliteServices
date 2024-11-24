import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meal } from '../../models/meal/meal.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MealService } from '../../shared/meal/meal.service';
import { map } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-view-meals',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './view-meals.component.html',
  styleUrl: './view-meals.component.css'
})
export class ViewMealsComponent {
  viewMeals:Meal[] = []

  constructor(private spinner:NgxSpinnerService,private toastr:ToastrService,private mealS: MealService) {}

  ngOnInit(): void {
      this.getAllMeals()
  }

  getAllMeals() {
    this.spinner.show()
    this.mealS.getAll().snapshotChanges()
    .pipe(
      map(changes => changes.map(a => ({id : a.payload.doc.id, ...a.payload.doc.data()})))
    )

    .subscribe(
    (res)=> {
      this.spinner.hide()
      console.log(res);
      this.viewMeals = res
    },
    (err)=> {
      this.spinner.hide()
      this.toastr.error("Something went wrong","Try Again")
      console.log("Error in fetching meals", err);
      
    }
    )
  }
}
