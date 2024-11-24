import { Injectable } from '@angular/core';
import { Meal } from '../../models/meal/meal.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})

export class MealService {

  dbPath:string = '/Meals'

  mealRef: AngularFirestoreCollection<Meal>
  constructor(private db:AngularFirestore) {
    this.mealRef = db.collection(this.dbPath)
   }

  addMeal (mealObj:Meal) {   //new function created
    mealObj.createdAt = Date.now()
    mealObj.status = true;
    return this.mealRef.add({...mealObj})
  }

  getAll() : AngularFirestoreCollection<Meal> {
    return this.db.collection(this.dbPath,
      // (ref) => (ref.orderBy('createdAt','asc'))
      (ref) => (ref.where("status", "==", true))

    );
  }

  getSingle(id:any) {
    return this.mealRef.doc(id).valueChanges()

  }
  updateData(id:any, data:any) {
    return this.mealRef.doc(id).update(data)

  }
  deleteData(id:any) {
    return this.mealRef.doc(id).delete()
  }
}
