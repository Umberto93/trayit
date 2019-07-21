import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['../home.page.scss', './login.page.scss'],
})
export class LoginPage {

    loginForm: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public userService: UserService
    ) { 
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [
                Validators.pattern('^[a-z]\\.?[a-z0-9]+@{1}(studenti.)?unisa\\.it$'),
                Validators.required,
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    public ionViewWillEnter(): void {
        this.loginForm.reset();
    }

    public onLogin(): void {
        this.userService.loginWithCredentials({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }).subscribe(
            res => {
                console.log(res);
            }
        )
    }

}
