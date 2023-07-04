import { UploadService } from './services/upload.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../modal/services/modal.service';

interface IFileType {
  'Destination Performance': string;
  'Destination Satisfaction': string;
  'Environmental Performance': string;
  'Environmental Satisfaction': string;
  'Activities Satisfaction': string;
  'Activities Insensitivity': string;
  'Emotional / Feelings Experience': string;
  'Suggested Behaviors': string;
}
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  @Input() ID!: string;
  @Input() sampleUrl!: string;
  @Input() uploadedFileType!: { name: string };
  @Output() onOptionSelect: EventEmitter<string> = new EventEmitter();
  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  isUploading: boolean = false;
  fileReady: boolean = false;
  uploadedFileName: string = '';
  uploadedFile!: File;
  fileTypes: IFileType = {
    'Destination Performance': 'DestinationQualityPerformance',
    'Destination Satisfaction': 'DestinationQualitySatisfaction',
    'Environmental Performance': 'EnvironmentalQualityPerformance',
    'Environmental Satisfaction': 'EnvironmentalQualitySatisfaction',
    'Activities Satisfaction': 'ExperienceQualityPerformance',
    'Activities Insensitivity': 'ExperienceQualitySatisfaction',
    'Emotional / Feelings Experience': 'ExperienceQualityPerformance',
    'Suggested Behaviors': 'ExperienceQualityPerformance',
  };
  fileType!: string;
  constructor(
    private modalService: ModalService,
    private UploadService: UploadService
  ) {
    this.UploadService.getUploadStatus().subscribe((canceled) => {
      if (canceled) {
        this.fileReady = false;
        this.inputFile.nativeElement.value = '';
      }
    });
    this.UploadService.getUploadeFile().subscribe((name) => {
      this.uploadedFileName = name;
    });
  }

  onSelect(option: string) {
    this.onOptionSelect.emit(option);
    this.modalService.toggleModal(this.ID);
  }

  handleFileUpload($event: any) {
    const file: File = ($event.target as any).files[0];
    this.uploadedFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.fileReady = true;
      this.UploadService.uploadFile(file.name);
    };
  }

  onUpload() {
    this.modalService.toggleModal(this.ID);
    this.UploadService.onFileUpload(
      this.uploadedFile,
      this.fileTypes[this.uploadedFileType.name as keyof IFileType]
    );
  }
  resetInputValue() {
    this.fileReady = false;
    this.inputFile.nativeElement.value = '';
    this.UploadService.uploadFile('');
  }
  closeModal() {
    this.modalService.toggleModal(this.ID);
    this.resetInputValue();
  }
}
