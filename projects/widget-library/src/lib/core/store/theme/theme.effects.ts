import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { tap, filter, map } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';
import { ThemeActions } from './theme.actions';
import { ThemePreference } from './theme.state';

@Injectable()
export class ThemeEffects {
  private actions$ = inject(Actions);
  private storage = inject(StorageService);

  persistTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ThemeActions.setPreference),
        tap(({ preference }) => this.storage.setItem('theme-preference', preference))
      ),
    { dispatch: false }
  );

  initTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => this.storage.getItem('theme-preference') as ThemePreference),
      filter((preference) => !!preference),
      map((preference) => ThemeActions.setPreference({ preference }))
    )
  );
}