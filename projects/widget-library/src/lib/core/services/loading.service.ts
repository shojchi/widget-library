import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';
import { LoadingActions, LoadingProcess } from 'widget-library';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private store = inject(Store);

  withLoading<T>(
    operations$: Observable<T>,
    operationName: string,
    message?: string
  ): Observable<T> {
    const process: LoadingProcess = {
      operationName,
      message
    };

    this.store.dispatch(
      LoadingActions.startLoading({
        process,
        startedAt: Date.now()
      })
    );

    return operations$.pipe(
      finalize(() => {
        this.store.dispatch(
          LoadingActions.completeLoading({
            operationName
          })
        );
      })
    );
  }
}
