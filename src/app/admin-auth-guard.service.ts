import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService,private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      
      map(user => user.isAdmin)
    );
  }

}
