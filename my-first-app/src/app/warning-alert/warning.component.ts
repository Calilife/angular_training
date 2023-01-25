import { Component, OnInit } from '@angular/core';

@Component({
    //selector: '[app-servers]', //Attribute selector
    //selector: '.app-servers', // Class selector 
    selector: 'app-warningAlertComponent', // Element selector
    templateUrl: './warning.component.html',
    //template: '<app-server></app-server><app-server></app-server>',
    styles: [`
        p {
        padding: 20px; 
        background-color: red;
        border: 2px solid black;
        display: none;
      }
    `]
})
export class WarningAlertComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
