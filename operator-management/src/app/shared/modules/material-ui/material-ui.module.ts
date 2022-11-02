import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const modules = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
];


@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [...modules]
})
export class MaterialUiModule { }
