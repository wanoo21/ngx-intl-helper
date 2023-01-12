import { inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";

/**
 * This pipe is a wrapper around the [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) API.
 * It takes a value and returns the plural category for that value.
 *
 * @example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {PluralRulesPipe} from '@wanoo21/ngx-intl-helper';
 *
 * @Component({
 *  selector: 'app',
 *  standalone: true,
 *  template: `
 *   <p>{{ 1 | pluralRules | async }}</p> // -> one
 *   <p>{{ 2 | pluralRules | async }}</p> // -> two
 * `
 *  imports: [
 *    PluralRulesPipe
 *  ]
 * })
 * ```
 */
@Pipe({
  name: "pluralRules",
  standalone: true
})
export class PluralRulesPipe implements PipeTransform {
  readonly locale = inject(LOCALE_ID);

  /**
   * Transforms the value into a plural category.
   *
   * @param value The value to transform.
   * @param locale Optional, the locale to use for the formatting.
   * @returns The plural category for the value or the value as string in case of errors.
   */
  async transform(value: number, locale?: string): Promise<ReturnType<Intl.PluralRules["select"]> | string> {
    try {
      return new Intl.PluralRules(locale || this.locale).select(value);
    } catch (e) {
      return String(value);
    }
  }
}
