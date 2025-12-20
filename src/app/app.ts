import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetLibrary } from 'widget-library';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WidgetLibrary],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('Widget Library Demo');
}
