# Angular Intl API Pipes

This is a collection of pipes for Angular applications that use the [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

It's not meant to be a full replacement of Angular `currency`, `date`, and `number` standard pipes,
but rather a collection of helpers that can extend the functionality.

Default locale is `en-US` and can be changed by providing the `LOCALE_ID` token, or sent as parameter to the pipe.

The pipes will try to use the `Intl` API, and if it's not available, it will fall back to the different approaches, depending on the pipe.
For example, the `DisplayNamesPipe` will send the value of code is being sent to the pipe, while the `ListFormatPipe` will send the value of the array as string.

Keep in mind that the `Intl` API is not supported in all browsers, and the fallbacks are not always the same. 
Check the [caniuse](https://caniuse.com/?search=intl) page for more information.

I have in plan to include [@formatjs polyfills](https://formatjs.io/docs/polyfills) as fallbacks, but it's not implemented yet.

**Supported Intl API features:**
* DisplayNames - [ECMA-402](https://tc39.es/ecma402/#sec-intl-displaynames-constructor) - `displayNames` pipe.
* ListFormat - [ECMA-402](https://tc39.es/ecma402/#sec-intl-listformat-constructor) - `listFormat` pipe.
* RelativeTimeFormat - [ECMA-402](https://tc39.es/ecma402/#sec-intl-relativetimeformat-constructor) - `relativeTimeFormat` pipe.
* PluralRules  - [ECMA-402](https://tc39.es/ecma402/#sec-intl-pluralrules-constructor) - `pluralRules` pipe.
* getCanonicalLocales()  - [ECMA-402](https://tc39.es/ecma402/#sec-intl.getcanonicallocales) - `canonicalLocales` pipe.
* supportedValuesOf()  - [ECMA-402](https://tc39.es/ecma402/#sec-intl.supportedvaluesof) - `supportedValuesOf` pipe.

## Why I decided to wrap all pipes into async functions?

This is ahead of time solution to lazy load the [Intl API polyfills](https://formatjs.io/docs/polyfills), depending on the pipe that is being used. This way, the polyfills are not loaded if they are not needed.
This is not a perfect solution, but it's the best I could come up with for now. If you have a better idea, **please let me know**.

I might remove this in the future, if I find a better solution on how to load the polyfills or **weather to load the polyfills or not**.

## Maybe some breaking (or not) changes in the future

* Remove `async` from pipes (depending on the polyfills' solution).
* Add configuration to load polyfills or not.
* Add pipe configurations as argument (for example, `{{ 1 | pluralRules: { type: 'ordinal' } }}`).
* Add support for `Intl.DateTimeFormat` (maybe).
* Add some other global configuration (maybe).

## Installation

```bash
npm i @wanoo21/ngx-intl-helper
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

## Supported pipes

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
      <p>DisplayNames: {{ 'en' | displayNames: 'language' | async }}</p>
      <p>DisplayNames: {{ 'en' | displayNames: 'region' | async }}</p>
      <p>DisplayNames: {{ 'en' | displayNames: 'script' | async }}</p>
      <p>DisplayNames: {{ 'en' | displayNames: 'currency' | async }}</p>
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
      <p>ListFormat: {{ ['en', 'fr', 'de'] | listFormat | async }}</p>
    </div>
  `
})
export class AppComponent {
}
```

If an error occurs, the pipe will return the value of the array as string:

`{{ ['en', 'fr', 'de'] | listFormat }}` will return `en, fr, de`.

### RelativeTimeFormat Pipe

RelativeTimeFormat pipe is a wrapper around the [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) API.

Import the pipe in your component as `RelativeTimeFormatPipe`:

```typescript
import { Component } from '@angular/core';
import { RelativeTimeFormatPipe, provideRelativeTimeFormatOptions } from '@wanoo21/ngx-intl-helper';

@Component({
  standalone: true,
  imports: [
    RelativeTimeFormatPipe // Import the pipe as standalone
  ],
  providers: [
    provideRelativeTimeFormatOptions({ // Rewrite default options for the pipe
      numeric: 'auto',
      style: 'long'
    })
  ],
  template: `
    <div>
      <p>RelativeTimeFormat pipe</p>
      <p>RelativeTimeFormat: {{ 1 | relativeTimeFormat: 'day' | async }}</p>
    </div>
  `
})
export class AppComponent {
}
```
if an error occurs, the pipe will return the value that was sent to it:

{{ 1 | relativeTimeFormat: 'day' }}` will return `1`.

### PluralRules Pipe

PluralRules pipe is a wrapper around the [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) API.

Import the pipe in your component as `PluralRulesPipe`:

```typescript
import { Component } from '@angular/core';
import { PluralRulesPipe, providePluralRulesOptions } from '@wanoo21/ngx-intl-helper';

@Component({
  standalone: true,
  imports: [
    PluralRulesPipe // Import the pipe as standalone
  ],
  providers: [
    providePluralRulesOptions({ // Rewrite default options for the pipe
      type: 'ordinal'
    })
  ],
  template: `
    <div>
      <p>PluralRules pipe</p>
      <p>PluralRules: {{ 1 | pluralRules | async }}</p>
    </div>
  `
})
export class AppComponent {
}
```

If an error occurs, the pipe will return the value that was sent to it:

`{{ 1 | pluralRules }}` will return `1`.

### CanonicalLocales Pipe

CanonicalLocales pipe is a wrapper around the [Intl.getCanonicalLocales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales) API.

Import the pipe in your component as `CanonicalLocalesPipe`:

```typescript
import { Component } from '@angular/core';
import { CanonicalLocalesPipe } from '@wanoo21/ngx-intl-helper';

@Component({
  standalone: true,
  imports: [
    CanonicalLocalesPipe // Import the pipe as standalone
  ],
  template: `
    <div>
      <p>CanonicalLocales pipe</p>
      <p>CanonicalLocales: {{ ['en', 'fr', 'de'] | canonicalLocales | async }}</p>
    </div>
  `
})
export class AppComponent {
}
```

If an error occurs, the pipe will return an empty array:

`{{ ['en', 'fr', 'de'] | canonicalLocales }}` will return `[]`.

### SupportedValuesOf Pipe

SupportedValuesOf pipe is a wrapper around the [Intl.supportedValuesOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf) API.

Import the pipe in your component as `SupportedValuesOfPipe`:

```typescript
import { Component } from '@angular/core';
import { SupportedValuesOfPipe } from '@wanoo21/ngx-intl-helper';

@Component({
  standalone: true,
  imports: [
    SupportedValuesOfPipe // Import the pipe as standalone
  ],
  template: `
    <div>
      <p>SupportedValuesOf pipe</p>
      <p>SupportedValuesOf: {{ 'currency' | supportedValuesOf | async }}</p>
    </div>
  `
})
export class AppComponent {
}
```

If an error occurs, the pipe will return an empty array:

`{{ 'currency' | supportedValuesOf }}` will return `[]`.

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for more information.


## License

MIT
