import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/server/user.service';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['../home.page.scss', './signup.page.scss'],
})
export class SignupPage {

    signupForm: FormGroup;

    constructor(
        public router: Router,
        public formBuilder: FormBuilder,
        public userService: UserService
    ) {
        this.signupForm = this.formBuilder.group({
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
            ], this.emailValidator.bind(this)
            ),
            password: new FormControl('', [
                Validators.minLength(8),
                Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).*$'),
                Validators.required
            ]),
            diet: new FormControl('standard')
        });
    }

    public ionViewWillEnter(): void {
        this.signupForm.reset();
        this.signupForm.patchValue({ diet: 'standard' });
    }

    public emailValidator(control: AbstractControl): Promise<any> {
        return this.userService.checkEmail(control.value).catch(() => {
            return true;
        });
    }

    public onSignup(): void {
        if (this.signupForm.valid) {
            this.userService.signup({
                firstname: this.signupForm.value.firstname,
                lastname: this.signupForm.value.lastname,
                password: this.signupForm.value.password,
                email: this.signupForm.value.email,
                diet: this.signupForm.value.diet
            }).subscribe(
                () => {
                    this.router.navigateByUrl('/login');
                }
            )
        }
    }

    public moveFocus(input: IonInput): void {
        input.setFocus();
    }

}
