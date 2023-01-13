import { Component } from "@angular/core";
import { AsyncPipe, JsonPipe, SlicePipe } from "@angular/common";

import {
  CanonicalLocalesPipe,
  DisplayNamesPipe,
  ListFormatPipe, PluralRulesPipe,
  provideDisplayNamesOptions,
  provideListFormatOptions,
  provideRelativeTimeFormatOptions,
  RelativeTimeFormatPipe, SupportedValuesOf
} from "@wanoo21/ngx-intl-helper";

@Component({
  selector: "ngx-intl-helper-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [
    provideDisplayNamesOptions({ style: "long" }),
    provideListFormatOptions({ style: "short" }),
    provideRelativeTimeFormatOptions({ numeric: "auto" })
  ],
  imports: [
    DisplayNamesPipe,
    AsyncPipe,
    ListFormatPipe,
    RelativeTimeFormatPipe,
    PluralRulesPipe,
    CanonicalLocalesPipe,
    SupportedValuesOf,
    JsonPipe,
    SlicePipe
  ]
})
export class NgxIntlHelperComponent {
  locale = "en";
}
