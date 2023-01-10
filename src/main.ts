import { bootstrapApplication } from "@angular/platform-browser";
import { LOCALE_ID } from "@angular/core";

import { NgxIntlHelperComponent } from "./app/app.component";

bootstrapApplication(NgxIntlHelperComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: "ro-MD" }
  ]}
).catch(err => console.error(err));
