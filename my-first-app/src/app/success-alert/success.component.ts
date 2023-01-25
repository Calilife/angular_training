import { Component } from '@angular/core';

@Component({
  selector: 'app-successAlertComponet', // Element selector
  templateUrl: './success.component.html',
  styles: [
    `
  p {
    padding: 20px; 
    background-color: green;
    border: 2px solid black; 
    display: none; 
  }
`
  ]
})
export class SuccessAlertComponent {

}