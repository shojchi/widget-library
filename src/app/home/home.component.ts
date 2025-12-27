import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WidgetLibrary } from 'widget-library';

/**
 * Home Component
 *
 * Landing page for the widget library demo application.
 * Displays the widget library and provides navigation to other features.
 */
@Component({
  selector: 'app-home',
  imports: [WidgetLibrary, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
