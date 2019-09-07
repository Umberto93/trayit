import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    @Input() max: number;
    @Input() value: number;
    @Input() avg: boolean;
    @Input() disabled: boolean;
    @Output() change: EventEmitter<any>;

    stars: Array<any>;
    selected: number;

    constructor() {
        this.change = new EventEmitter();
    }

    ngOnInit() {
        this.stars = new Array(this.max);
        this.selected = Math.floor(this.value);
        this.avg = this.avg || false;
    }

    public onMouseEnter(index: number): void {
        if (!this.disabled) {
            this.selected = index + 1;
        }
    }

    public onMouseLeave(): void {
        if (!this.disabled) {
            this.selected = Math.floor(this.value);
        }
    }

    public onClick(): void {
        if (!this.disabled) {
            this.change.emit(this.selected);
        }
    }

}
