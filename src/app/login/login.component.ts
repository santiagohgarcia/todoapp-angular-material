import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { 
      this.afAuth.authState.subscribe(user => {
        if (user) {
          // User is not logged in
          this.router.navigateByUrl("/home");
        }
      });
    }

  ngOnInit() {
  }

  withGoogle() {
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  withFacebook() {
     this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

}
