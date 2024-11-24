import { Injectable } from '@angular/core';
import { Pricing } from '../../models/pricing/pricing.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})

export class PricingService {

  dbPath:string = '/pricing'

  priceRef:AngularFirestoreCollection<Pricing>
  constructor(private db: AngularFirestore) {
    this.priceRef = db.collection(this.dbPath)
   }

  addPricing(priceObj:Pricing) {
    priceObj.createdAt = Date.now()
    priceObj.status = true;
    return this.priceRef.add({...priceObj})
  }

  getAllPrice():AngularFirestoreCollection<Pricing> {
    return this.db.collection(
      this.dbPath,
      // (ref) => (ref.orderBy('createdAt','asc'))
      (ref) => (ref.where("status", "==", true))

    );
  }

  getSingle(id:any) {
    return this.priceRef.doc(id).valueChanges()

  }
  updateData(id:any, data:any){
    return this.priceRef.doc(id).update(data)

  }
  deleteData(id:any) {
    return this.priceRef.doc(id).delete()
  }
}
