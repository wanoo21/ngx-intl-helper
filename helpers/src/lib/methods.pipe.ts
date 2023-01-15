import { Pipe, PipeTransform } from "@angular/core";

/**
 * This pipe is a wrapper around the [Intl.getCanonicalLocales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales) method.
 *
 * Check out the [CanonicalLocalesPipe](https://github.com/wanoo21/ngx-intl-helper/blob/main/helpers/README.md#canonicallocales-pipe) documentation for more information.
 */
@Pipe({
  name: "canonicalLocales",
  standalone: true
})
export class CanonicalLocalesPipe implements PipeTransform {

  /**
   * Transforms a locale or array of locales into an array of canonicalized language tags.
   *
   * @param locales A string with a BCP 47 language tag, or an array of such strings.
   * @returns An array containing the canonicalized language tags or an empty array if the input is invalid.
   */
  async transform(locales: string | string[]): Promise<string[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Intl.getCanonicalLocales(locales);
    } catch (e) {
      return [];
    }
  }
}

/**
 * This pipe is a wrapper around the [Intl.supportedValuesOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf) method.
 *
 * Check out the [SupportedValuesOfPipe](https://github.com/wanoo21/ngx-intl-helper/blob/main/helpers/README.md#supportedvaluesof-pipe) documentation for more information.
 */
@Pipe({
  name: "supportedValuesOf",
  standalone: true
})
export class SupportedValuesOf implements PipeTransform {

  /**
   * Transforms a key into an array containing the supported calendar, collation, currency, numbering systems, or unit values supported by the implementation.
   *
   * @param key A key string indicating the category of values to be returned. This is one of: "calendar", "collation", "currency","numberingSystem", "timeZone", "unit"
   * @returns An array containing the supported values for the key or an empty array if the input is invalid.
   */
  async transform(key: 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit'): Promise<string[]> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Intl.supportedValuesOf(key);
    } catch (e) {
      return [];
    }
  }
}
