import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('isLogin') == 'true' && sessionStorage.getItem('userType') == '1') {
    return true;
  } else {
    return false;
  }
};

// && sessionStorage.getItem('userType') == '1'
