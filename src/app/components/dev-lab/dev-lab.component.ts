import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphQLService } from './graphql.service';
import { Store } from '@ngrx/store';
import {
  selectAllTasks,
  selectLoading,
  selectError
} from '@lib/features/task-classic/store/task-classic.selectors';
import { TaskClassicActions } from '@lib/features/task-classic/store/task-classic.actions';
import { TaskStatus, TaskPriority } from '@lib/features/task-classic/models/task.model';
import {
  // Theme (you already have these)
  ThemeActions,
  selectResolvedTheme,
  selectThemePreference,
  selectIsDarkMode,

  // Viewport (you already have these)
  selectBreakpoint,
  selectDeviceType,
  selectIsTablet,
  selectIsMobile,
  selectIsDesktop,

  // 🆕 Loading State
  LoadingActions,
  selectIsLoading,
  selectAllOperations,

  // 🆕 Widget Registry
  WidgetRegistryActions,
  selectAllWidgets,
  selectAllLoadedWidgets,
  selectIsAnyWidgetLoading,

  // 🆕 App Metadata
  AppMetadataActions,
  selectEnvironment,
  selectLocale,
  selectFeatureFlags,

  // 🆕 Notifications
  NotificationsActions,
  NotificationKey,
  selectVisibleToasts,
  selectToastCount,

  // 🆕 Auth
  AuthActions,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
  selectAuthError,
  LoadingProcess
} from 'widget-library';

/**
 * Development Lab Component
 *
 * A visual interface for testing GraphQL queries and mutations.
 * This helps you explore the mock GraphQL API before integrating it into widgets.
 */
@Component({
  selector: 'app-dev-lab',
  imports: [CommonModule, FormsModule],
  templateUrl: './dev-lab.component.html',
  styleUrl: './dev-lab.component.css'
})
export class DevLabComponent {
  private readonly graphqlService = inject(GraphQLService);
  private readonly store = inject(Store);

  /**
   * Example queries to help users get started
   */
  readonly examples = [
    {
      name: 'Get All Tasks',
      query: `query tasks {
  tasks {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}`,
      variables: '{}'
    },
    {
      name: 'Get Task by ID',
      query: `query task($id: ID!) {
  task(id: $id) {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}`,
      variables: '{\n  "id": "1"\n}'
    },
    {
      name: 'Create Task',
      query: `mutation createTask($input: TaskInput!) {
  createTask(input: $input) {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}`,
      variables: `{
  "input": {
    "title": "New Task",
    "description": "Task description",
    "status": "TODO",
    "priority": "MEDIUM"
  }
}`
    }
  ];

  // Signals for reactive state (defined after examples to avoid initialization order issues)
  query = signal<string>(this.getDefaultQuery());
  variables = signal<string>('{}');
  result = signal<any>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // NgRx Store signals
  tasks$ = this.store.select(selectAllTasks); // Observable
  ngrxLoading$ = this.store.select(selectLoading);
  ngrxError$ = this.store.select(selectError);

  // Theme Store selectors
  theme$ = this.store.select(selectResolvedTheme);
  preference$ = this.store.select(selectThemePreference);
  isDarkMode$ = this.store.select(selectIsDarkMode);

  // Viewport Store selectors
  breakpoint$ = this.store.select(selectBreakpoint);
  deviceType$ = this.store.select(selectDeviceType);
  isMobile$ = this.store.select(selectIsMobile);
  isTablet$ = this.store.select(selectIsTablet);
  isDesktop$ = this.store.select(selectIsDesktop);

  // Loading Store selectors
  isLoading$ = this.store.select(selectIsLoading);
  activeOperations$ = this.store.select(selectAllOperations);

  // Widget Registry Store selectors
  allWidgets$ = this.store.select(selectAllWidgets);
  loadedWidgets$ = this.store.select(selectAllLoadedWidgets);
  isAnyWidgetLoading$ = this.store.select(selectIsAnyWidgetLoading);

  // App Metadata Store selectors
  environment$ = this.store.select(selectEnvironment);
  locale$ = this.store.select(selectLocale);
  featureFlags$ = this.store.select(selectFeatureFlags);

  // Notification Store selectors
  visibleToasts$ = this.store.select(selectVisibleToasts);
  toastCount$ = this.store.select(selectToastCount);

  // Auth Store selectors
  authStatus$ = this.store.select(selectAuthStatus);
  authUser$ = this.store.select(selectAuthUser);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  authError$ = this.store.select(selectAuthError);

  /**
   * Execute the current query
   */
  executeQuery(): void {
    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);

    let parsedVariables: Record<string, any> = {};

    // Parse variables
    try {
      parsedVariables = JSON.parse(this.variables());
    } catch (e) {
      this.error.set('Invalid JSON in variables');
      this.loading.set(false);
      return;
    }

    // Execute query
    this.graphqlService.execute(this.query(), parsedVariables).subscribe({
      next: response => {
        this.loading.set(false);
        this.result.set(response);
      },
      error: err => {
        this.loading.set(false);
        this.error.set(err.message || 'An error occurred');
      }
    });
  }

  /**
   * Load an example query
   */
  loadExample(example: (typeof this.examples)[0]): void {
    this.query.set(example.query);
    this.variables.set(example.variables);
    this.result.set(null);
    this.error.set(null);
  }

  /**
   * Get the default query to show on load
   */
  private getDefaultQuery(): string {
    return this.examples[0].query;
  }

  /**
   * Format JSON for display
   */
  formatJson(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  // NgRx Store Actions
  loadTasksFromStore(): void {
    this.store.dispatch(TaskClassicActions.loadTasks());
  }

  createTaskViaStore(): void {
    this.store.dispatch(
      TaskClassicActions.createTask({
        input: {
          title: 'Task from NgRx',
          description: 'Created via store',
          status: TaskStatus.TODO,
          priority: TaskPriority.HIGH
        }
      })
    );
  }

  // Theme Store Actions
  setLight(): void {
    this.store.dispatch(ThemeActions.setPreference({ preference: 'light' }));
  }

  setDark(): void {
    this.store.dispatch(ThemeActions.setPreference({ preference: 'dark' }));
  }

  setSystem(): void {
    this.store.dispatch(ThemeActions.setPreference({ preference: 'system' }));
  }

  simulateSystemChange(systemTheme: 'light' | 'dark'): void {
    this.store.dispatch(ThemeActions.systemPreferenceChanged({ systemTheme }));
  }

  // ==================== Loading Store Actions ====================
  startLoadingOperation(operationName: string): void {
    const process = {
      id: crypto.randomUUID(),
      operationName,
      message: `Starting ${operationName}...`
    } as LoadingProcess;
    this.store.dispatch(LoadingActions.startLoading({ process, startedAt: Date.now() }));
  }

  completeLoadingOperation(operationName: string): void {
    this.store.dispatch(LoadingActions.completeLoading({ operationName }));
  }

  clearAllLoadingOperations(): void {
    this.store.dispatch(LoadingActions.clearAllLoadings());
  }

  // ==================== Widget Registry Actions ====================
  registerWidget(id: string): void {
    this.store.dispatch(WidgetRegistryActions.registerWidget({ id }));
  }

  setWidgetLoading(id: string): void {
    this.store.dispatch(WidgetRegistryActions.widgetLoading({ id }));
  }

  setWidgetLoaded(id: string): void {
    this.store.dispatch(WidgetRegistryActions.widgetLoaded({ id, loadedAt: Date.now() }));
  }

  setWidgetError(id: string, errorMessage: string): void {
    this.store.dispatch(WidgetRegistryActions.widgetError({ id, errorMessage }));
  }

  unregisterWidget(id: string): void {
    this.store.dispatch(WidgetRegistryActions.unregisterWidget({ id }));
  }

  // ==================== App Metadata Actions ====================
  changeLocale(locale: string): void {
    this.store.dispatch(AppMetadataActions.setLocale({ locale }));
  }

  changeEnvironment(environment: 'development' | 'staging' | 'production'): void {
    this.store.dispatch(AppMetadataActions.setEnvironment({ environment }));
  }

  toggleFeature(feature: 'enableBetaWidgets' | 'enableAnalytics' | 'debugMode'): void {
    this.store.dispatch(AppMetadataActions.toggleFeature({ feature }));
  }

  // ==================== Notification Actions ====================
  showSuccessToast(): void {
    this.store.dispatch(
      NotificationsActions.showToast({
        toastType: 'success',
        message: 'Operation successful!',
        key: NotificationKey.GENERIC_SUCCESS,
        duration: 3000,
        timestamp: Date.now()
      })
    );
  }

  showErrorToast(): void {
    this.store.dispatch(
      NotificationsActions.showToast({
        toastType: 'error',
        message: 'Something went wrong!',
        key: NotificationKey.GENERIC_ERROR,
        duration: 5000,
        timestamp: Date.now()
      })
    );
  }

  dismissToast(key: NotificationKey): void {
    this.store.dispatch(NotificationsActions.dismissToast({ key }));
  }

  dismissAllToasts(): void {
    this.store.dispatch(NotificationsActions.dismissAllToasts());
  }

  // ==================== Auth Actions ====================
  login(username: string, password: string): void {
    this.store.dispatch(AuthActions.login({ username, password }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  clearAuthError(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  // In dev-lab.component.ts
  getWidgetStatusClass(status: string): string {
    const baseClasses = 'ml-3 px-2 py-1 text-xs rounded font-semibold';

    switch (status) {
      case 'idle':
        return `${baseClasses} bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900`;
      case 'loading':
        return `${baseClasses} bg-yellow-500 text-gray-900 dark:bg-yellow-400 dark:text-gray-900`;
      case 'ready':
        return `${baseClasses} bg-green-500 text-white dark:bg-green-400 dark:text-gray-900`;
      case 'error':
        return `${baseClasses} bg-red-500 text-white dark:bg-red-400 dark:text-gray-900`;
      default:
        return baseClasses;
    }
  }
}
