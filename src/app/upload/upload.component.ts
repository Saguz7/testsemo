import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../core/file-upload.service';

import * as Q from '../graphql/queries';
@Component({
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {
  public uploads: any[] = [];
  public loading = false;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit() {
  }
}
