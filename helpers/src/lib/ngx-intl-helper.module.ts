import { NgModule } from "@angular/core";

import { DisplayNamesPipe } from "./display-names.pipe";
import { ListFormatPipe } from "./list-format.pipe";
import { PluralRulesPipe } from "./plural-rules.pipe";
import { RelativeTimeFormatPipe } from "./relative-time-format.pipe";
import { CanonicalLocalesPipe, SupportedValuesOf } from "./methods.pipe";

/**
 * This module exports all the pipes from the library.
 */
@NgModule({
  imports: [DisplayNamesPipe, ListFormatPipe, PluralRulesPipe, RelativeTimeFormatPipe, CanonicalLocalesPipe, SupportedValuesOf],
  exports: [DisplayNamesPipe, ListFormatPipe, PluralRulesPipe, RelativeTimeFormatPipe, CanonicalLocalesPipe, SupportedValuesOf]
})
export class NgxIntlHelperModule {
}
