import { DataService } from './data.service';
// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import {JwtHelperService } from '@auth0/angular-jwt'
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { user } from '../nav-menu/user';

(window as any).global = window;

@Injectable()
export class AuthService {
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'St20FNUs3A43T7P5PuUMP9N9u5BMLKjC',
    domain: 'dhanak.auth0.com',
    responseType: 'token id_token',
    audience: 'https://dhanak.auth0.com/userinfo',
    redirectUri: 'http://dhanak-001-site1.ctempurl.com',

    scope: 'openid profile'
  });

  constructor(public router: Router,public dataservice:DataService) {


  }
  // ...
  user:user={name:'',phone:''};
private observer: Observer<string[]>;
userImageChange$: Observable<string[]> = new Observable(obs => this.observer = obs);

  public roles:string[]=["",""];
  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
      //  console.log("authresult",authResult)
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
           //window.location.reload();
           this.getProfile((err, profile) => {
            this.user.name=profile.name
            this.dataservice.addUser(profile.name).subscribe();

          });

      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }

    });

  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.roles=[];
    // Go back to the home route
    this.router.navigate(['/']);
  }
  public isInRole(roleName)
  {

    if(this.roles!=null)
      return this.roles.indexOf(roleName)>-1
      else{
        return false
      }
  }
  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token')
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;

       // console.log(profile.app_metadata.roles);
        var jwtHelper=new JwtHelperService();
        var decodedToken=jwtHelper.decodeToken(idToken);
        this.roles=decodedToken['https://dhanak.com/roles'];
      //  this.observer.next(this.roles)

      }
      cb(err, profile);
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new  Date().getTime() < expiresAt;
  }


}
