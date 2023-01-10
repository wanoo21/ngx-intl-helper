import { inject, InjectionToken, LOCALE_ID, Pipe, PipeTransform, Provider } from "@angular/core";

const defaultOptions: Intl.ListFormatOptions = {
  style: 'long', type: 'conjunction'
}

const LIST_FORMAT_INITIALS = new InjectionToken<Intl.ListFormatOptions>('LIST_FORMAT_INITIALS', {
  factory: () => defaultOptions
});

export function provideListFormatOptions(options: Intl.ListFormatOptions): Provider {
  return { provide: LIST_FORMAT_INITIALS, useValue: { ...defaultOptions, ...options } };
}

@Pipe({
  name: 'listFormat',
  standalone: true
})
export class ListFormatPipe implements PipeTransform {
  readonly defaultOptions = inject(LIST_FORMAT_INITIALS);
  readonly locale = inject(LOCALE_ID);

  async transform(value: Iterable<string>, locale?: string | string[]): Promise<string> {
    try {
      return new Intl.ListFormat(locale || this.locale, this.defaultOptions).format(Array.from(value));
    } catch (e) {
      return Array.from(value).join(', ');
    }
  }
}
