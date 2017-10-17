import { Params, Route } from '@angular/router';

export const RouterFeatureStoreName = 'router';

export interface AppRouterState {
  url: string;
  data: { [name: string]: any };
  fragment?: string;
  queryParams: Params;
  routeConfig?: Route;
}
