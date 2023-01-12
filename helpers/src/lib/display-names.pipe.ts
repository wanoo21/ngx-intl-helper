import { inject, InjectionToken, LOCALE_ID, Pipe, PipeTransform, Provider } from "@angular/core";

type DisplayNamesOptions = Omit<Intl.DisplayNamesOptions, "type">;

/**
 * @internal
 */
const defaultOptions: DisplayNamesOptions = {
  style: "short",
  localeMatcher: "lookup",
  fallback: "code"
};

/**
 * @internal
 */
const DISPLAY_NAMES_INITIALS = new InjectionToken<DisplayNamesOptions>("DISPLAY_NAMES_INITIALS", {
  factory: () => defaultOptions
});

/**
 * Provides a way to inject the options for the DisplayNamesPipe.
 *
 * @param options The options to use for the DisplayNamesPipe.
 * @returns The provider for the DisplayNamesPipe.
 */
export function provideDisplayNamesOptions(options: DisplayNamesOptions): Provider {
  return { provide: DISPLAY_NAMES_INITIALS, useValue: { ...defaultOptions, ...options } };
}

/**
 * This pipe is a wrapper around the [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) API.
 *
 * Check out the [DisplayNamesPipe](https://github.com/wanoo21/ngx-intl-helper/blob/main/helpers/README.md#displaynames-pipe) documentation for more information.
 *
 * @example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {provideDisplayNamesOptions, DisplayNamesPipe} from '@wanoo21/ngx-intl-helper';
 *
 * @Component({
 *  selector: 'app',
 *  standalone: true,
 *  template: `
 *    <p>{{ 'en-US' | displayNames: 'language' | async }}</p> // -> American English
 *    <p>{{ 'US' | displayNames: 'region' | async }}</p> // -> United States
 *  `,
 *  providers: [
 *    // Optional, default options are {style: 'short', localeMatcher: 'lookup', fallback: 'code'}
 *    provideDisplayNamesOptions({style: 'long'})
 *  ],
 *  imports: [
 *    DisplayNamesPipe
*   ]
 * })
 * export class AppComponent {}
 * ```
 * @returns The display name of the code or the code as it is in case of errors.
 */
@Pipe({
  name: "displayNames",
  standalone: true
})
export class DisplayNamesPipe implements PipeTransform {
  readonly defaultOptions = inject(DISPLAY_NAMES_INITIALS);
  readonly locale = inject(LOCALE_ID);

  /**
   * Displays the name of the given code in the given locale.
   *
   * @param code The code to transform.
   * @param type DisplayNamesType to use.
   * @param locale Optional. The locale to use for the transformation. Defaults to LOCALE_ID.
   * @returns The name of the given code in the given locale or the code itself if the name could not be found.
   */
  async transform(code: string, type: Intl.DisplayNamesType, locale?: string | string[]): Promise<ReturnType<Intl.DisplayNames["of"]>> {
    try {
      return new Intl.DisplayNames(locale || this.locale, { ...this.defaultOptions, type }).of(code);
    } catch (e) {
      return code;
    }
  }
}
