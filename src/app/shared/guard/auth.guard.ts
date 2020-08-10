import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot,
  CanActivate, 
  Router
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private auth: AuthService
  ){ }
  
  canActivate(route: ActivatedRouteSnapshot){
    const expectedRole = route.data.role
    if (this.auth.userType == expectedRole) {
      return true
    }
    else {
      return this.router.navigate(['/auth/login'])
    }
  }
  
}
