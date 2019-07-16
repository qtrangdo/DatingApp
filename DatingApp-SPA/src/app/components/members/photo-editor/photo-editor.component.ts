import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyServiceService } from 'src/app/_services/alertify-service.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor (
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyServiceService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/" + this.authService.decodeToken.nameid + "/photos",
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => file.withCredentials = false;
    this.uploader.onSuccessItem = (item, res, status, header) => {
      if (res) {
        const data: Photo = JSON.parse(res);
        const photo = {
          id: data.id,
          url: data.url,
          description: data.description,
          dateAdded: data.dateAdded,
          isMain: data.isMain
        };
        this.photos.push(photo);
      }
    }
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodeToken.nameid, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.getMemberPhotoChange.emit(photo.url);
    }, err => this.alertify.error(err))
  }
}
