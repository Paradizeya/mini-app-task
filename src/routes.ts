import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  FACT: "fact",
  NAME: "name",
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", []),
      createPanel(DEFAULT_VIEW_PANELS.FACT, `/${DEFAULT_VIEW_PANELS.FACT}`, []),
      createPanel(DEFAULT_VIEW_PANELS.NAME, `/${DEFAULT_VIEW_PANELS.NAME}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
