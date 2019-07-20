import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['../home.page.scss', './signup.page.scss'],
})
export class SignupPage {

    inputIsValid: boolean;
    signupForm: FormGroup;

    constructor(
        public formBuilder: FormBuilder
    ) {
        this.inputIsValid = false;
        this.signupForm = formBuilder.group({
            firstname: new FormControl('', [
                Validators.minLength(3),
                Validators.maxLength(18),
                Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z])?[a-zA-Z]*)*$'),
                Validators.required
            ]),
            lastname: new FormControl('', [
                Validators.minLength(2),
                Validators.maxLength(30),
                Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z])?[a-zA-Z]*)*$'),
                Validators.required
            ]),
            email: new FormControl('', [
                Validators.pattern('^[a-z]\\.?[a-z0-9]+@{1}(studenti.)?unisa\\.it$'),
                Validators.required,
            ], //this.validateEmailNotTaken.bind(this)
            ),
            password: new FormControl('', [
                Validators.minLength(8),
                Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).*$'),
                Validators.required
            ])
        });
    }

    public onSignup(event: Event): void {
        console.log(event);
        event.preventDefault();
        if (this.signupForm.invalid) {
            return;
        }
    }

}
