import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import {
  WidgetLibrary,
  ThemeActions,
  selectResolvedTheme,
  selectThemePreference,
  selectIsDarkMode
} from 'widget-library';

@Component({
  selector: 'app-home',
  imports: [WidgetLibrary],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
