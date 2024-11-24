import { CanActivateFn } from '@angular/router';

export const customerGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('isLogin') == 'true' && sessionStorage.getItem('userType') == '2') {
    return true;
  } else {
    return false;
  }
};

// && sessionStorage.getItem('userType') == '2'
