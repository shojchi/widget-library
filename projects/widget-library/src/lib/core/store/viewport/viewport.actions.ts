import { createActionGroup, props } from "@ngrx/store";
import { Breakpoint, DeviceType } from "./viewport.state";

export const ViewportActions = createActionGroup({
    source: 'Viewport',
    events: {
        'Breakpoint Changed': props<{breakpoint: Breakpoint}>(),
        'Device Type Changed': props<{deviceType: DeviceType}>()
    }
})