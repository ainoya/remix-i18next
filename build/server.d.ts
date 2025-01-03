import { type BackendModule, type DefaultNamespace, type FlatNamespace, type InitOptions, type KeyPrefix, type Module, type Namespace, type NewableModule, type TFunction } from "i18next";
import type { Cookie, EntryContext, SessionStorage } from "react-router";
type FallbackNs<Ns> = Ns extends undefined ? DefaultNamespace : Ns extends Namespace ? Ns : DefaultNamespace;
export interface LanguageDetectorOption {
    /**
     * Define the list of supported languages, this is used to determine if one of
     * the languages requested by the user is supported by the application.
     * This should be be same as the supportedLngs in the i18next options.
     */
    supportedLanguages: string[];
    /**
     * Define the fallback language that it's going to be used in the case user
     * expected language is not supported.
     * This should be be same as the fallbackLng in the i18next options.
     */
    fallbackLanguage: string;
    /**
     * If you want to use a cookie to store the user preferred language, you can
     * pass the Cookie object here.
     */
    cookie?: Cookie;
    /**
     * If you want to use a session to store the user preferred language, you can
     * pass the SessionStorage object here.
     * When this is not defined, getting the locale will ignore the session.
     */
    sessionStorage?: SessionStorage;
    /**
     * If defined a sessionStorage and want to change the default key used to
     * store the user preferred language, you can pass the key here.
     * @default "lng"
     */
    sessionKey?: string;
    /**
     * If you want to use search parameters for language detection and want to
     * change the default key used to for the parameter name,
     * you can pass the key here.
     * @default "lng"
     */
    searchParamKey?: string;
    /**
     * The order the library will use to detect the user preferred language.
     * By default the order is
     * - searchParams
     * - cookie
     * - session
     * - header
     * If customized, a an extra `custom` option can be added to the order.
     * And finally the fallback language.
     */
    order?: Array<"searchParams" | "cookie" | "session" | "header" | "custom">;
    /**
     * A function that can be used to find the locale based on the request object
     * using any custom logic you want.
     * This can be useful to get the locale from the URL pathname, or to query it
     * from the database or fetch it from an API.
     * @param request The request object received by the server.
     */
    findLocale?(request: Request): Promise<string | Array<string> | null>;
}
export interface RemixI18NextOption {
    /**
     * The i18next options used to initialize the internal i18next instance.
     */
    i18next?: Omit<InitOptions, "react" | "detection"> | null;
    /**
     * @deprecated Use `plugins` instead.
     * The i18next backend module used to load the translations when creating a
     * new TFunction.
     */
    backend?: NewableModule<BackendModule<unknown>> | BackendModule<unknown>;
    /**
     * The i18next plugins used to extend the internal i18next instance
     * when creating a new TFunction.
     */
    plugins?: NewableModule<Module>[] | Module[];
    detection: LanguageDetectorOption;
}
export declare class RemixI18Next {
    private options;
    private detector;
    constructor(options: RemixI18NextOption);
    /**
     * Detect the current locale by following the order defined in the
     * `detection.order` option.
     * By default the order is
     * - searchParams
     * - cookie
     * - session
     * - header
     * And finally the fallback language.
     */
    getLocale(request: Request): Promise<string>;
    /**
     * Get the namespaces required by the routes which are going to be rendered
     * when doing SSR.
     *
     * @param context The EntryContext object received by `handleRequest` in entry.server
     *
     * @example
     * await instance.init({
     *   ns: i18n.getRouteNamespaces(context),
     *   // ...more options
     * });
     */
    getRouteNamespaces(context: EntryContext): string[];
    /**
     * Return a TFunction that can be used to translate strings server-side.
     * This function is fixed to a specific namespace.
     *
     * @param requestOrLocale The request object or the locale string already detected
     * @param namespaces The namespaces to use for the T function. (Default: `translation`).
     * @param options The i18next init options and the key prefix to prepend to translation keys.
     */
    getFixedT<N extends FlatNamespace | readonly [FlatNamespace, ...FlatNamespace[]] = DefaultNamespace, KPrefix extends KeyPrefix<FallbackNs<N>> = undefined>(locale: string, namespaces?: N, options?: Omit<InitOptions, "react"> & {
        keyPrefix?: KPrefix;
    }): Promise<TFunction<FallbackNs<N>, KPrefix>>;
    getFixedT<N extends FlatNamespace | readonly [FlatNamespace, ...FlatNamespace[]] = DefaultNamespace, KPrefix extends KeyPrefix<FallbackNs<N>> = undefined>(request: Request, namespaces?: N, options?: Omit<InitOptions, "react"> & {
        keyPrefix?: KPrefix;
    }): Promise<TFunction<FallbackNs<N>, KPrefix>>;
    private createInstance;
}
/**
 * The LanguageDetector contains the logic to detect the user preferred language
 * fully server-side by using a SessionStorage, Cookie, URLSearchParams, or
 * Headers.
 */
export declare class LanguageDetector {
    private options;
    constructor(options: LanguageDetectorOption);
    private isSessionOnly;
    private isCookieOnly;
    detect(request: Request): Promise<string>;
    private get defaultOrder();
    private fromSearchParams;
    private fromCookie;
    private fromSessionStorage;
    private fromHeader;
    private fromCustom;
    private fromSupported;
}
export {};
