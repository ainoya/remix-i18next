import type { UNSAFE_RouteModules } from "react-router";
declare global {
    interface Window {
        __reactRouterRouteModules: UNSAFE_RouteModules;
    }
}
/**
 * Get the list of namespaces used by the application server-side so you could
 * set it on i18next init options.
 * @example
 * i18next.init({
 *   ns: getInitialNamespaces(), // this function
 *   // ...more options
 * })
 */
export declare function getInitialNamespaces(): string[];
