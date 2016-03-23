import { Control } from 'angular2/common';

interface ValidationResult {
  [key: string]: boolean;
}

export class RegistrationValidator {
  static startsWithNumber(control: Control): ValidationResult {
    if (control.value !== '' && !isNaN(control.value.charAt(0))) {
      return {'startsWithNumber': true};
    }

    return null;
  }

  static alphaNumericValues(control: Control): ValidationResult {
    let regex = /^[A-Za-z0-9]*$/;

    if (!regex.test(control.value)) {
      return {'alphaNumericValues': true };
    }

    return null;
  }

  static validatePassword(control: Control): ValidationResult {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!regex.test(control.value)) {
      return { 'validatePassword': true };
    }

    return null;
  }
}
