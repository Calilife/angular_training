import { Component, OnInit } from '@angular/core';

@Component({
  //selector: '[app-servers]', //multiple selector
  //selector: '.app-servers', // class selector 
  selector: 'app-servers', // single selector 
  template: '<app-server></app-server><app-server></app-server>',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
