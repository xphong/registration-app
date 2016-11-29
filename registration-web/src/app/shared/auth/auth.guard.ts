import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RegistrationService } from '../services/registration';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _registrationService: RegistrationService) {}

  canActivate() {
    return this._registrationService.isLoggedIn();
  }
}
