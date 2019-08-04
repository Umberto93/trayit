import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
    
    @Input() max: number;
    @Input() value: number;
    @Input() avg: boolean;

    stars: Array<any>;
    selected: number;

    ngOnInit() {
        this.stars = new Array(this.max);
        this.selected = Math.floor(this.value);
        this.avg = this.avg || false;
    }

    onMouseEnter(index: number) {
        this.selected = index + 1;
    }

    onMouseLeave() {
        this.selected = Math.floor(this.value);
    }

}
