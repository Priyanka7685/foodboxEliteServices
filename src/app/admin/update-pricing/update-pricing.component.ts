import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Pricing } from '../../models/pricing/pricing.model';
import { PricingService } from '../../shared/pricing/pricing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-pricing',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './update-pricing.component.html',
  styleUrl: './update-pricing.component.css'
})
export class UpdatePricingComponent implements OnInit {

  priceId:any
  priceObj:Pricing = {}

  constructor(private activatedRoute: ActivatedRoute, 
    private pricingS:PricingService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router ) {}

    ngOnInit(): void {
        this.priceId = this.activatedRoute.snapshot.paramMap.get('id')
        this.getSinglePrice(this.priceId)
    }

  updatePricing() {
    this.spinner.show()
    this.pricingS.updateData(this.priceId, this.priceObj).then (
      (res) => {
        this.spinner.hide()
        this.toastr.success("Pricing updated", "Successful")
        this.router.navigateByUrl("admin/manage-pricing")
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went wrong", "Try Again")
        console.log("Error in updating price", err);
        
      }
    )

  }
  getSinglePrice(id:any) {
    this.spinner.show()
    this.pricingS.getSingle(id).subscribe (
      (res:any) => {
        this.spinner.hide()
        this.priceObj.duration = res.duration
        this.priceObj.description = res.description
        this.priceObj.price = res.price
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error("Something went wrong", "Try Again")
        console.log("Error in single price");
        
      }
    )

  }
}
