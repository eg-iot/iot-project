import { UploadService } from './../cells/edit-modal/services/upload.service';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { overlay, open } from '../../animations/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [open, overlay],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() Header!: string;
  @Input() ID!: string;
  @Input() width: string = 'thin';
  isShown: boolean = true;
  constructor(
    public modal: ModalService,
    public el: ElementRef,
    private UploadService: UploadService
  ) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  cancelUpload() {
    this.modal.toggleModal(this.ID);
    this.UploadService.uploadFile('');
    this.UploadService.cancelUpload();
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }
}
