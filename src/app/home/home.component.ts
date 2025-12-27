import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WidgetLibrary } from 'widget-library';

@Component({
  selector: 'app-home',
  imports: [WidgetLibrary, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
