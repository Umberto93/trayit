import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonRange } from '@ionic/angular';
import { FeedbackService } from 'src/app/services/server/feedback.service';
import { StorageService } from 'src/app/services/client/storage.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.page.html',
    styleUrls: ['../../home/home.page.scss', '../other.page.scss', './feedback.page.scss'],
})
export class FeedbackPage {

    @ViewChild('feedback') feedback: IonRange;
    feedbackForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private feedbackService: FeedbackService
    ) {
        this.feedbackForm = this.formBuilder.group({
            title: new FormControl('', [
                Validators.maxLength(100),
                Validators.required
            ]),
            comment: new FormControl('', [
                Validators.maxLength(500),
                Validators.required
            ])
        });
    }

    public onSubmit(): void {
        if (this.feedbackForm.valid) {
            this.storageService.getUser().then(user => {
                this.feedbackService.sendFeedback({
                    title: this.feedbackForm.value.title,
                    description: this.feedbackForm.value.comment,
                    reaction: this.feedback.value,
                    userid: user.id
                }).subscribe(feedback => {
                    console.log(feedback);
                });
            });
        }
    }

}
