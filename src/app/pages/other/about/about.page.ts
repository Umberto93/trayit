import { Component } from '@angular/core';
import { team } from './team';
import { Team } from 'src/app/interfaces/team';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['../other.page.scss', './about.page.scss'],
})
export class AboutPage {

    team: Array<Team>

    constructor() { }

    public ionViewWillEnter(): void {
        this.team = team;
    }

}
