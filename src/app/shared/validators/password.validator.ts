import { AbstractControl, ValidatorFn } from '@angular/forms';

export function comparePasswords(): ValidatorFn {
  return (control: AbstractControl) => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    return confirmPassword?.value !== password?.value
      ? { notMatched: true }
      : null;
  };
}

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    let validationTests: any = {
      hasNumber: /\d/.test(control.value),
      hasUpperCase: /[A-Z]/.test(control.value),
      hasLowerCase: /[a-z]/.test(control.value),
      strongLength: /^(\w{5,15})$/.test(control.value),
    };
    let invalidTest: any = {};

    for (let test in validationTests) {
      if (!validationTests[test]) {
        invalidTest[test] = true;
      }
    }
    return Object.keys(invalidTest).length ? invalidTest : null;
  };
}
