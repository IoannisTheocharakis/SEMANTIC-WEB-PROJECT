import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialFormModule } from '../../material-form.module';
import { MaterialMinModule } from '../../material-min.module';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  imports: [
    MaterialFormModule,
    MaterialMinModule,
    HeaderComponent,
    RouterModule,
  ],
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  providers: [],
})
export class DefaultComponent implements OnInit {
  sideBarOpen = false;

  constructor() {}

  ngOnInit() {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
