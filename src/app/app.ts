import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectThemePreference, ThemeActions, ThemePreference } from 'widget-library';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private store = inject(Store);
  protected readonly title = signal('Widget Library Demo');

  themePreference = toSignal(this.store.select(selectThemePreference));

  changeTheme() {
    const current = this.themePreference();

    const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';

    this.store.dispatch(ThemeActions.setPreference({ preference: next }));
  }
}
