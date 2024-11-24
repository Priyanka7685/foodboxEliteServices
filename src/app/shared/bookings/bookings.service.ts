import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Bookings } from '../../models/bookings/bookings.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  dbPath: string = "/Bookings"

  bookingRef:AngularFirestoreCollection<Bookings>

  constructor(private db: AngularFirestore, private authS : AuthService) {
    this.bookingRef = db.collection(this.dbPath)
  }

  addData(data : any) {
    data.createdAt = Date.now()
    return this.bookingRef.add({...data})
  }

  getAll() {
    return this.db.collection(this.dbPath)
  }

  getMyAll() {
    return this.db.collection(this.dbPath,
      (ref)=>(ref.where("customerId", "==", this.authS.getId()))
    )
  }

  getSingle(id:any) {
    return this.bookingRef.doc(id).valueChanges()
  }

  updateData(id:any,data:any) {
    return this.bookingRef.doc(id).update(data);
  }

  deleteData(id: any) {
    return this.bookingRef.doc(id).delete()
  }

}
