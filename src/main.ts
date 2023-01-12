import { bootstrapApplication } from "@angular/platform-browser";

import { NgxIntlHelperComponent } from "./app/app.component";

bootstrapApplication(NgxIntlHelperComponent, {
  providers: []
}).catch(err => console.error(err));
