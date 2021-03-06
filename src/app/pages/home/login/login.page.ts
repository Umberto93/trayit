import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/server/user.service';
import { IonInput } from '@ionic/angular';
import { NotificationService } from 'src/app/services/client/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['../home.page.scss', './login.page.scss'],
})
export class LoginPage {

    loginForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private notificationService: NotificationService
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
                this.notificationService.showSuccess('Login effettuato con successo!');
                this.router.navigateByUrl('/menu/selection');
            }
        )
    }

    public moveFocus(input: IonInput): void {
        input.setFocus();
    }

}
