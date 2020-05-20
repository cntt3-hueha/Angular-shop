import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { AppUser } from './modules/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private user: UserService,
    private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) { 
    this.user$ = afAuth.authState;
  }
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const data = await this.afAuth.auth.signInWithPopup(provider);
    this.user.save(data.user);
  }
  logout(){
    this.afAuth.auth.signOut()
  }
  get appUser$(): Observable<AppUser> {  
    return this.user$.pipe(
      switchMap(user => {
        if(user) return this.userService.get(user.uid)
        return of(null);
      })
    )
  }
  
}
