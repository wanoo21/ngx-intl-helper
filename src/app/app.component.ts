import { Component } from '@angular/core';
import { AsyncPipe } from "@angular/common";

import {
  DisplayNamesPipe,
  ListFormatPipe,
  provideDisplayNamesOptions,
  provideListFormatOptions
} from "@wanoo21/ngx-intl-helper";

@Component({
  selector: "ngx-intl-helper-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  providers: [
    provideDisplayNamesOptions({ style: "long" }),
    provideListFormatOptions({ style: 'long', type: 'disjunction' })
  ],
  imports: [
    DisplayNamesPipe,
    AsyncPipe,
    ListFormatPipe
  ]
})
export class NgxIntlHelperComponent {
  locale = 'en';
}
