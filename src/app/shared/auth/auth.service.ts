import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(data:any) {
    sessionStorage.setItem('isLogin','true')
    sessionStorage.setItem('email',data.email)
    sessionStorage.setItem('userType',data.userType)
    sessionStorage.setItem('name',data.name)
    sessionStorage.setItem('id',data.id)
    sessionStorage.setItem('contact',data.contact)
    sessionStorage.setItem('address',data.address)
    sessionStorage.setItem('status',data.status)
    sessionStorage.setItem('data',JSON.stringify(data))

  }
  getLogin() {
    return sessionStorage.getItem('isLogin')
  }


  getEmail() {
    return sessionStorage.getItem('email')
  }

  getUserType() {
    return sessionStorage.getItem('userType')
  }

  getId() {
    return sessionStorage.getItem('id')
  }

  getData() {
    return JSON.parse(sessionStorage.getItem('data')?? '')
  }
  
  removeData() {
    sessionStorage.clear()
  }

  
}
