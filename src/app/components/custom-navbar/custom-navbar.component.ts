import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit {

  @ViewChild('sidenav') sidenav;
  constructor() { }

  ngOnInit(): void {
  }

  onToggle()
  {
    this.sidenav.toggle();
  }
  onClose()
  {
    this.sidenav.close();
  }
}
