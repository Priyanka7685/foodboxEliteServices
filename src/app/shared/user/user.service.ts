import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { User } from '../../models/user/user.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  dbPath: string = "/users"
  userRef: AngularFirestoreCollection<User>

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private authS: AuthService,
    private spinner:NgxSpinnerService,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.userRef = db.collection(this.dbPath)

  }


  getAll():AngularFirestoreCollection<User> {
    return this.db.collection(this.dbPath, (ref)=>ref.where('userType','==',2));
  }

  register(data: any) {
    this.spinner.show()
    this.auth.createUserWithEmailAndPassword(data.email, data.password).then(
      (res: any) => {
        this.spinner.hide()
        delete data.password
        data.uid = res.user.uid
        data.createdAt = Date.now()
        data.status = true;
        data.userType = 2
        this.addUser(data)
      },
      (err) => {
        this.spinner.hide()
        console.log("Error in creating user", err);
        this.toastr.error(err.message)
      })
  }
  addUser(data: any) {
    this.spinner.show()
    this.userRef.add({ ...data }).then(
      () => {
        this.spinner.hide()
        this.toastr.success('New account created')
        this.router.navigateByUrl('/login')
      },
      (err) => {
        this.spinner.hide()
        console.log('Error in creating user data', err);
        this.toastr.error('Something went wrong')

      })
  }

  login(email: any, password: any) {
    this.spinner.show()
    this.auth.signInWithEmailAndPassword(email, password).then(
      (res: any) => {
        this.userRef.snapshotChanges().pipe(
          map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
        )
          .subscribe(
            (userArray: any) => {
              let userData = userArray.filter((x: any) => { return x.uid == res.user.uid })[0]
              this.spinner.hide()
              

              if (userData.userType == 1) {
                this.authS.setData(userData)
                this.toastr.success('Welcome Admin')
                this.router.navigateByUrl('/admin/dashboard')
              } else if (userData.userType == 2) {
                if (userData.status == true) {
                  this.authS.setData(userData)
                  this.toastr.success('Welcome ' + userData.name, 'Logged in successfully', {
                    timeOut: 2000
                  })
                  this.router.navigateByUrl('/customer/home')
                }
                else {
                  this.toastr.error('Account In-active, Contact Admin')
                }

              }
              else {
                this.toastr.error('Wrong Credentials')

              }
            },
            (err) => {
              this.spinner.hide()
              this.toastr.error('Something went wrong')
              console.log('Error in finding user data', err);

            })
      },
      (err) => {
        this.spinner.hide()
        this.toastr.error(err.message)
      }
    )
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login')
      this.authS.removeData()
      this.toastr.success("Logged Out Successfully")
    })
  }

  // update profile
  getSingle(id:any) {
  }

  updateData(id:any, data:any) {
    return this.userRef.doc(id).update(data)
    
  }


  deleteData() {}

  // update profile end

}