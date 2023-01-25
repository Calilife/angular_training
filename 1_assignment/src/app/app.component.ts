import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '1_assignment';
  buttonClicks = [];
  secretDisplay = false;

  onAddClick() {
    this.secretDisplay = !this.secretDisplay;
    this.buttonClicks.push(this.buttonClicks.length + 1);
  }

}
