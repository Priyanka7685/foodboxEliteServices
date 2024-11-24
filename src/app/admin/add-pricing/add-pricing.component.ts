import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Pricing } from '../../models/pricing/pricing.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PricingService } from '../../shared/pricing/pricing.service';

@Component({
  selector: 'app-add-pricing',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './add-pricing.component.html',
  styleUrl: './add-pricing.component.css'
})
export class AddPricingComponent {

  constructor(private router:Router,private toastr:ToastrService, private spinner: NgxSpinnerService,private priceS:PricingService){}

  addPricing() {
    this.spinner.show() 
    this.priceS.addPricing(this.priceObj).then(
      ()=>{
        this.spinner.hide()
        this.toastr.success("New Pricing has been added","Successful")
        this.router.navigateByUrl('/admin/manage-pricing')
      },
      (err) =>{
        this.spinner.hide()
        this.toastr.error("You may have entered something wrong","Try again")
        console.log("Error in adding prices",err);
        
      }
    )
    
  }
  priceObj:Pricing = {}
 }
