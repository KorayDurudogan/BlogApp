import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPanelComponent } from './error-panel/error-panel.component';

@NgModule({
  declarations: [
    ErrorPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPanelComponent
  ]
})
export class SharedModule { }
