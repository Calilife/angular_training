import { Component, OnInit } from '@angular/core';


@Component({
  //selector: '[app-servers]', //Attribute selector
  //selector: '.app-servers', // Class selector 
  selector: 'app-servers', // Element selector
  templateUrl: './servers.component.html',
  //template: '<app-server></app-server><app-server></app-server>',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "";
  serverCreated = false;
  serverName = "";
  userName = "";
  servers = ['Testserver', 'Testserver 2']

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);

  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = "Server was created! Name is " + this.serverName;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event) {
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onUpdateUserName(event: Event) {
    this.userName = (<HTMLInputElement>event.target).value;

  }

  onResetUser() {
    this.userName = "";
  }
}
