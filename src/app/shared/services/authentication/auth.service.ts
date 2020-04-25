import {Injectable, NgZone} from '@angular/core';
import {Observable}         from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth}            from 'firebase/app';
import {Router}           from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private smallBatchDevsEmail = 'smallbatchdevs@gmail.com';

  public user$: Observable<firebase.User> = this.afAuth.user.pipe(shareReplay(1));

  constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((res) => {
        console.log('AuthService::Successful login', res);
        return this.ngZone.run(() => this.router.navigate(['/']));
        }).catch(err => {
        console.log('AuthService::Failed login', err);
      });
  }

  isSmallBatchDevsLoggedIn(): boolean {
    return this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.email === this.smallBatchDevsEmail;
  }

  logout() {
    this.afAuth.auth.signOut().then(
      this.router.navigate['/']
    );
  }

}
