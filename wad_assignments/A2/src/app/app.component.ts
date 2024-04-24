import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngProj1';
  displayedValue: any;  // New property to store the value

  getValues(val: any) {
    this.displayedValue = val;  // Store the value in the property
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  

}
