import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { ResolvedTheme, ThemeActions } from 'widget-library';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private store = inject(Store);

  private darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  public initializeThemeListener(): void {
    const initialTheme = this.getSystemTheme();

    this.store.dispatch(
      ThemeActions.systemPreferenceChanged({
        systemTheme: initialTheme
      })
    );

    fromEvent<MediaQueryListEvent>(this.darkModeQuery, 'change')
      .pipe(
        map(event =>
          event.matches ? ('dark' as ResolvedTheme) : ('light' as ResolvedTheme)
        ),
        distinctUntilChanged()
      )
      .subscribe(systemTheme => {
        this.store.dispatch(ThemeActions.systemPreferenceChanged({ systemTheme }));
      });
  }

  private getSystemTheme(): ResolvedTheme {
    return this.darkModeQuery.matches ? 'dark' : 'light';
  }
}
