import { AuthService } from 'src/app/core/services/auth.service';
import { Component, Input } from '@angular/core';
import { IData } from '../../models/cell';
import { ModalService } from '../modal/services/modal.service';
import { formatPercent } from '@angular/common';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.scss'],
})
export class CellsComponent {
  @Input() data!: IData;
  editModalId: string = 'edit-modal-id';
  isEditing: boolean = false;
  Header!: string;
  isAdmin: boolean = false;
  sampleFile!: string;
  modalId!: string;
  modalHeader!: string;
  uploadedFileType!: { name: string };
  constructor(
    public modalService: ModalService,
    private AuthService: AuthService
  ) {
    if (localStorage.getItem('access-token'))
      this.AuthService.getUserRole().subscribe(
        (admin) => (this.isAdmin = admin)
      );
  }
  onOptionSelected() {
    this.isEditing = true;
    let inputs: any = document.querySelectorAll('input.cell');
    inputs[0].focus();
    inputs[0].classList.add('active');
  }
  onEdit(input: HTMLInputElement) {
    let inputs: any = document.querySelectorAll('input.cell');
    inputs.forEach((input: HTMLInputElement) => {
      input.classList.remove('active');
    });
    input.classList.add('active');
  }

  discardChanges() {
    let inputs: any = document.querySelectorAll('input.cell');
    inputs.forEach((input: HTMLInputElement) => {
      input.classList.remove('active');
    });
    this.isEditing = false;
  }

  viewList(index: number) {
    const mapsList = document.querySelectorAll('ul.maps-list');
    if (index === -1) mapsList.forEach((list) => list.classList.remove('open'));
    else {
      mapsList.forEach((list) => list.classList.remove('open'));
      mapsList[index].classList.add('open');
    }
  }

  prepareSampleFiles(data: IData, id: string, col: string) {
    this.sampleFile = '';
    this.modalId = '';
    this.modalHeader = '';
    this.modalId = id.replace(/\s/g, '-')?.replace('/', '').toLowerCase();
    switch (col) {
      case 'left':
        this.sampleFile = data.sampleFiles.performance;
        this.modalHeader = data.leftCellName as string;
        this.uploadedFileType = { name: data.leftCellName as string };
        break;
      case 'right':
        this.sampleFile = data.sampleFiles.satisfaction;
        this.modalHeader = data.rightCellName as string;
        this.uploadedFileType = { name: data.rightCellName as string };
    }
    this.modalService.toggleModal(this.modalId);
  }

  getBiggestValue(array: any[]) {
    const values = array.map((data) => data.value);
    return Math.max(...values);
  }

  formateValue(value: number) {
    if (value < 0.1) {
      return formatPercent(value, 'en-US', '1.0');
    } else if (value > 0.1 && value < 1) {
      return formatPercent(value, 'en-US', '1.2');
    } else return formatPercent(value / 100, 'en-US', '1.2');
  }
}
