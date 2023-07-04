import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../modal/services/modal.service';

@Component({
  selector: 'app-discard-changes',
  templateUrl: './discard-changes.component.html',
  styleUrls: ['./discard-changes.component.scss'],
})
export class DiscardChangesComponent {
  @Input() ID!: string;
  @Output() onDiscardConfirm = new EventEmitter();
  constructor(private modalService: ModalService) {}
  onDiscard() {
    this.onDiscardConfirm.emit();
    this.closeModal();
  }
  closeModal() {
    this.modalService.toggleModal(this.ID);
  }
}
