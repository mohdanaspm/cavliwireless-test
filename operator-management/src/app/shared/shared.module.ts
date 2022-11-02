import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from './modules/material-ui/material-ui.module';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DragDropDirective } from './directives/drag-drop.directive';


@NgModule({
  declarations: [
    CommonTableComponent,
    FileUploadComponent,
    DragDropDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule,
  ],
  exports: [FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialUiModule, CommonTableComponent, FileUploadComponent, DragDropDirective]
})
export class SharedModule { }
