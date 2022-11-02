import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent{

  @Input()
  multiple: boolean = false;
  @Input()
  fileType: string | undefined;
  @Input() dragDropEnabled = true;
  @Output() filesChanged = new EventEmitter();
  @Output() filesRemoved = new EventEmitter();

  @ViewChild('fileInput')
  inputRef!: ElementRef<HTMLInputElement>;

  uploadedItem: any;

  constructor() {
  }

  addFiles(file: any): void {
    this.uploadedItem = file
    console.log(file);
    this.filesChanged.emit(file);
  }

  handleFileDrop(event: DragEvent) {
    if (event?.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      this.inputRef.nativeElement.files = files;
      this.addFiles(files);
    }
  }

  remove(event: any) {
    this.inputRef.nativeElement.value = '';
    this.uploadedItem = !this.uploadedItem;
    event.preventDefault();
    this.filesRemoved.emit();
  }

}
