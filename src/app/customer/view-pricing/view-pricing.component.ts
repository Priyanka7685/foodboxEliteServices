import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PricingService } from '../../shared/pricing/pricing.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Pricing } from '../../models/pricing/pricing.model';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-view-pricing',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './view-pricing.component.html',
  styleUrl: './view-pricing.component.css'
})
export class ViewPricingComponent {
  login: boolean = false
  viewPrice: Pricing[] = []

  constructor(private spinner:NgxSpinnerService, private toastr: ToastrService, private pricingS: PricingService, private authS: AuthService
  ){}

  ngOnInit(): void {
      this.getAllPricing()
      this.checkLogin()
  }

  checkLogin() {
    if (this.authS.getLogin() == 'true') {
      this.login = true
    }
    else {
      this.login = false
    }
  }

  getAllPricing() {
    this.spinner.show()
    this.pricingS.getAllPrice().snapshotChanges()
    .pipe(
      map(changes=> changes.map(a => ({id: a.payload.doc.id, ...a.payload.doc.data()})))
    )
    .subscribe(
      (res) => {
        this.spinner.hide()
        console.log(res);
        this.viewPrice = res
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went wrong", "Try Again")
        console.log("Error in fetching pricing", err);
        
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
      this.pricingS.updateData(id, {status:false}).then (

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
