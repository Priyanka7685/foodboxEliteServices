import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CustomBooking } from '../../models/custom-booking/custom-booking.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomBookingsService {
  dbPath: string = "/CustomBookings"

  customBookingRef:AngularFirestoreCollection<CustomBooking>

  constructor(private db: AngularFirestore, private authS : AuthService) {
    this.customBookingRef = db.collection(this.dbPath)
  }

  addData(data: any) {
    data.joinedAt = Date.now()
    return this.customBookingRef.add({ ...data })
  }

  getAll() {
    // return this.custombookingRef;
    // return this.db.collection(this.dbPath, (ref)=>(ref.where("status","==",true)))
    return this.db.collection(this.dbPath)
  }
  
  getMyAll() {
    // return this.custombookingRef;
    return this.db.collection(this.dbPath, (ref)=>(ref.where("customerId","==",this.authS.getId())))
  }

  getSingle(id:any) {
    return this.customBookingRef.doc(id).valueChanges()
  }

  updateData(id:any,data:any) {
    return this.customBookingRef.doc(id).update(data);
  }

  deleteData(id: any) {
    return this.customBookingRef.doc(id).delete()
  }
}
