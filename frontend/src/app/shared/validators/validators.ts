import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, Form } from '@angular/forms';

export function RepeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.confirm_password.value;

  return password === passwordConfirmation ? null : {passwordNotEqual: true};
}