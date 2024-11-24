import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meal } from '../../models/meal/meal.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MealService } from '../../shared/meal/meal.service';
import { map } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-meals',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './manage-meals.component.html',
  styleUrl: './manage-meals.component.css'
})
export class ManageMealsComponent implements OnInit{

  manageMeals:Meal[] = []

  constructor(private spinner:NgxSpinnerService,private toastr:ToastrService,private mealS: MealService, ) {}

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
      this.manageMeals = res
    },
    (err)=> {
      this.spinner.hide()
      this.toastr.error("Something went wrong","Try Again")
      console.log("Error in fetching meals", err);
      
    }
    )
  }

  deleteFunc(id:any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
    // this.mealS.deleteData(id).then (
      this.mealS.updateData(id, {status:false}).then (

      (res) => {
        this.spinner.hide()
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Meal deleted", "Successful")
        console.log("Error in deleting data", err);
        
      }
    )
  }
    });
  }

 
}

