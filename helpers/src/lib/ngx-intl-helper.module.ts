import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayNamesPipe } from "./display-names.pipe";
import { ListFormatPipe } from "./list-format.pipe";

@NgModule({
  imports: [CommonModule, DisplayNamesPipe, ListFormatPipe],
  exports: [DisplayNamesPipe, ListFormatPipe],
})
export class NgxIntlHelperModule {}
