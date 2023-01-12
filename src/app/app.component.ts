import { Component } from "@angular/core";
import { AsyncPipe } from "@angular/common";

import {
  DisplayNamesPipe,
  ListFormatPipe, PluralRulesPipe,
  provideDisplayNamesOptions,
  provideListFormatOptions,
  provideRelativeTimeFormatOptions,
  RelativeTimeFormatPipe
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
    PluralRulesPipe
  ]
})
export class NgxIntlHelperComponent {
  locale = "en";
}
