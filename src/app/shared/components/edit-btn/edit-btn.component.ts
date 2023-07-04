import { UploadService } from './../cells/edit-modal/services/upload.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../modal/services/modal.service';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss'],
})
export class EditBtnComponent {
  @Input() editModalId!: string;
  @Input() discardChangesModalId!: string;
  @Input() Header!: string;
  @Input() isEditing: boolean = false;
  @Input() sampleUrl!: string;
  @Input() uploadedFileType!: { name: string };
  @Output() onOptionSelected: EventEmitter<string> = new EventEmitter();
  @Output() onSaveChanges = new EventEmitter();
  @Output() onDiscardChanges = new EventEmitter();
  toggled: boolean = false;
  fileType!: { name: string };
  constructor(
    public modalService: ModalService,
    private UploadService: UploadService
  ) {}

  onOptionEmitted(option: string) {
    this.onOptionSelected.emit(option);
  }

  openModal() {
    this.modalService.toggleModal(this.editModalId);
    this.fileType = { ...this.uploadedFileType };
  }
  onSave() {
    this.onSaveChanges.emit();
  }
  onDiscard() {
    this.onDiscardChanges.emit();
  }
}
