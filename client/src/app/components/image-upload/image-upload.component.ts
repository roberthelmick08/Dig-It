import { AuthenticationService } from './../../services/authentication.service';
import { DataService } from './../../services/data.service';
import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Input() imageHeight: number;
  @Input() plantImage: string;
  @Output() imageUploadEvent = new EventEmitter();
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  isLoading: boolean = false;
  isMouseOnHover: boolean = false;
  isCropperActive: boolean = false;
  cropperSettings: CropperSettings;
  data: any;

  constructor(public dataService: DataService, public authService: AuthenticationService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.height = 300;
    this.cropperSettings.width = 400;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.cropperDrawSettings.strokeColor = "#423E37";
    this.cropperSettings.cropperDrawSettings.dragIconFillColor = "#D9D9D9";
    this.cropperSettings.cropperDrawSettings.dragIconStrokeColor = "#423E37";
    this.cropperSettings.cropperDrawSettings.strokeWidth = 1;
    this.cropperSettings.cropperDrawSettings.dragIconStrokeWidth = 1;

    this.data = {};
   }

  uploadImage(){
    const image = this.dataURLtoFile(this.data.image, Date.now().toString() + '.jpeg');
    const key = 'images/' + image.name;
    this.dataService.uploadfile(image, key);
    this.isLoading = true;
    setTimeout(() => {
      this.plantImage = 'https://s3.amazonaws.com/dig-it-custom-images/' + key;
      this.imageUploadEvent.emit(this.plantImage);
      this.isLoading = false;
      this.onCancel();
    }, 5000);
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

  onFileChange(event) {
    if(event.target.files.length > 0){
      this.isCropperActive = true;
      var image: any = new Image();
      var file: File = event.target.files[0];
      var myReader: FileReader = new FileReader();
      var that = this;
      myReader.onloadend = (loadEvent:any) => {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);
      };
      myReader.readAsDataURL(file);
    } else{
      this.onCancel();
    }
  }

  onCancel(){
    this.data = {};
    this.isCropperActive = false;
  }

  onMouseEnter(){
    this.isMouseOnHover = true;
  }

  onMouseLeave(){
    this.isMouseOnHover = false;
  }
}
