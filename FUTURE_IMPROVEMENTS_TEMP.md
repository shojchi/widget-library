# 🚀 Future Improvements & Tech Debt (Temporary)

> **Goal:** Capture ideas for enhancements to implement later. Delete items as completed.

## 💾 State Persistence (Hydration)

**Target:** Persist usage preferences (Theme, Language) across browser refreshes.

### Strategy 1: Effects Approach (Beginner)

- **Difficulty:** Low (20-30 mins)
- **Pattern:** Listen for `setTheme`/`setLocale` actions in an Effect -> write to `localStorage`.
- **Implementation:**
  - Create `StorageService` for type-safe reading/writing.
  - Add `ThemeEffects.persistTheme$` listening to `ThemeActions`.
  - Add `APP_INITIALIZER` or `ROOT_EFFECTS_INIT` to rehydrate state on load.

### Strategy 2: Meta-Reducer Approach (Advanced/Pro) 🔴

- **Difficulty:** Medium (45-60 mins)
- **Pattern:** Higher-order reducer wraps the root reducer.
- **Why Better:** Centralized logic, reusable for ANY feature (Redux-style middleware).
- **Implementation:**
  - Create `hydrationMetaReducer`.
  - Intercept `INIT` / `UPDATE` actions to merge `localStorage` state.
  - Configure in `provideStore({ ... }, { metaReducers: [hydrationMetaReducer] })`.

---

## 🛠️ Infrastructure Todo

- [ ] Creating a `StorageService` wrapper (don't use `localStorage` directly!).
- [ ] Implement Theme Persistence (Effect based first).
- [ ] Refactor to Meta-Reducer for global hydration.
