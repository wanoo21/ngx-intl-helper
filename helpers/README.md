# Angular Intl API Pipes

This is a collection of pipes for Angular applications that use the [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

It's not meant to be a full replacement of Angular `currency`, `date`, and `number` standard pipes,
but rather a collection of helpers that can extend the functionality.

Default locale is `en-US` and can be changed by providing the `LOCALE_ID` token, or sent as parameter to the pipe.

The pipes will try to use the `Intl` API, and if it's not available, it will fallback to the different approaches, depending on the pipe.
For example, the `DisplayNamesPipe` will send the value of code is being sent to the pipe, while the `ListFormatPipe` will send the value of the array as string.

Keep in mind that the `Intl` API is not supported in all browsers, and the fallbacks are not always the same. 
Check the [caniuse](https://caniuse.com/?search=intl) page for more information.

I have in plan to include [@formatjs polyfills](https://formatjs.io/docs/polyfills) as fallbacks, but it's not implemented yet.

**Supported Intl API features:**
* DisplayNames - [ECMA-402](https://tc39.es/ecma402/#sec-intl-displaynames-constructor) - `displayNames` pipe.
* ListFormat - [ECMA-402](https://tc39.es/ecma402/#sec-intl-listformat-constructor) - `listFormat` pipe.

**Features that are not supported, but are planned:**
* RelativeTimeFormat - [ECMA-402](https://tc39.es/ecma402/#sec-intl-relativetimeformat-constructor)
* PluralRules  - [ECMA-402](https://tc39.es/ecma402/#sec-intl-pluralrules-constructor)
* Collator  - [ECMA-402](https://tc39.es/ecma402/#sec-intl-collator-constructor)
* Segmenter  - [ECMA-402](https://tc39.es/ecma402/#sec-intl-segmenter-constructor)
* getCanonicalLocales()  - [ECMA-402](https://tc39.es/ecma402/#sec-intl.getcanonicallocales)
* supportedValuesOf()  - [ECMA-402](https://tc39.es/ecma402/#sec-intl.supportedvaluesof)

## Installation

```bash
npm i @wanoo21/ngx-intl-helper // not yet published
```

## Usage

Import the module in your `app.module.ts`:

```ts
import { NgxIntlHelperModule } from '@wanoo21/ngx-intl-helper';
 
@NgModule({
  imports: [
    NgxIntlHelperModule
  ]
})
```
Or import each pipe individually in standalone components.

### DisplayNames Pipe

DisplayNames pipe is a wrapper around the [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) API.

Import the pipe in your component as `DisplayNamesPipe`:

```typescript
import { Component } from '@angular/core';
import { DisplayNamesPipe, provideDisplayNamesOptions } from '@wanoo21/ngx-intl-helper';

@Component({
  standalone: true,
  imports: [
    DisplayNamesPipe // Import the pipe as standalone
  ],
  providers: [
    provideDisplayNamesOptions({ // Rewrite default options for the pipe
      localeMatcher: 'lookup',
      style: 'narrow'
    })
  ],
  template: `
    <div>
      <p>DisplayNames pipe</p>
      <p>DisplayNames: {{ 'en' | displayNames: 'language' }}</p>
      <p>DisplayNames: {{ 'en' | displayNames: 'region' }}</p>
      <p>DisplayNames: {{ 'en' | displayNames: 'script' }}</p>
      <p>DisplayNames: {{ 'en' | displayNames: 'currency' }}</p>
    </div>
  `
})
export class AppComponent {
}
```

If an error occurs, the pipe will return the value that was sent to it:

`{{ 'en' | displayNames: 'language' }}` will return `en`.

### ListFormat Pipe

ListFormat pipe is a wrapper around the [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) API.

Import the pipe in your component as `ListFormatPipe`:

```typescript
import { Component } from '@angular/core';
import { ListFormatPipe, provideListFormatOptions } from '@wanoo21/ngx-intl-helper';

@Component({
  standalone: true,
  imports: [
    ListFormatPipe // Import the pipe as standalone
  ],
  providers: [
    provideListFormatOptions({ // Rewrite default options for the pipe
      style: 'long', 
      type: 'conjunction'
    })
  ],
  template: `
    <div>
      <p>ListFormat pipe</p>
      <p>ListFormat: {{ ['en', 'fr', 'de'] | listFormat }}</p>
    </div>
  `
})
export class AppComponent {
}
```

If an error occurs, the pipe will return the value of the array as string:

`{{ ['en', 'fr', 'de'] | listFormat }}` will return `en, fr, de`.

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for more information.


## License

MIT
