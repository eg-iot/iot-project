import { ModalService } from './../../../modal/services/modal.service';
import { DataService } from './../../../../../core/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private uploadedFileName: BehaviorSubject<string> = new BehaviorSubject('');
  private isUploadCanceled: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private fileType: BehaviorSubject<string> = new BehaviorSubject('');
  private readonly url: string =
    'https://iot-project2023-backend.onrender.com/upload';
  constructor(
    private HttpClient: HttpClient,
    private ToastrService: ToastrService,
    private DataService: DataService,
    private ModalService: ModalService
  ) {}

  changeFileType(type: string) {
    this.fileType.next(type);
  }
  getFileType() {
    return this.fileType;
  }
  uploadFile(name: string) {
    this.uploadedFileName.next(name);
  }
  cancelUpload() {
    this.isUploadCanceled.next(true);
  }

  getUploadStatus() {
    return this.isUploadCanceled;
  }
  getUploadeFile() {
    return this.uploadedFileName;
  }

  onFileUpload(file: File, header: string) {
    let formData = new FormData();
    formData.append('file', file);

    this.HttpClient.post(this.url, formData, {
      headers: {
        'X-Filename-Header': header,
        'x-update-indicator-header': 'true',
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    }).subscribe({
      next: (res: any) => {
        this.ToastrService.success('New data fetched succesfully!');
        this.ToastrService.success(res.message);
        this.DataService.setFetchingData(true);
        this.uploadedFileName.next('');
      },
      error: (err: any) => {
        this.uploadedFileName.next('');

        if (err instanceof HttpErrorResponse)
          this.ToastrService.error(err.error.message);
        else this.ToastrService.error(err);
      },
    });
  }
}
