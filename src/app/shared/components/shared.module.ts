import { NgModule } from '@angular/core';
import { CellsComponent } from './cells/cells.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditBtnComponent } from './edit-btn/edit-btn.component';
import { EditModalComponent } from './cells/edit-modal/edit-modal.component';
import { ModalComponent } from './modal/modal.component';
import { DiscardChangesComponent } from './cells/discard-changes/discard-changes.component';
import { LoaderComponent } from './loader/loader.component';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  declarations: [
    HeaderComponent,
    CellsComponent,
    EditBtnComponent,
    EditModalComponent,
    ModalComponent,
    DiscardChangesComponent,
    LoaderComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, RouterModule, TooltipModule.forRoot()],
  exports: [HeaderComponent, CellsComponent, LoaderComponent],
})
export class SharedModule {}
