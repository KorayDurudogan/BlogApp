import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPanelComponent } from './error-panel/error-panel.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';

@NgModule({
  declarations: [
    ErrorPanelComponent,
    InfoPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPanelComponent,
    InfoPanelComponent
  ]
})
export class SharedModule { }
