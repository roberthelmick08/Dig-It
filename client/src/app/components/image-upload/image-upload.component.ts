import { AuthenticationService } from './../../services/authentication.service';
import { DataService } from './../../services/data.service';
import { Component, Output, Input, EventEmitter, ViewChild, OnInit } from '@angular/core';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() imageWidth: number;
  imageHeight: number;
  @Input() plantImage: string;
  @Output() imageUploadEvent = new EventEmitter();
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  isLoading: boolean = false;

  isMouseOnHover: boolean = false;
  isCropperActive: boolean = false;
  cropperSettings: CropperSettings;
  data: any;

  constructor(public dataService: DataService, public authService: AuthenticationService) {
    this.data = {};
   }

  ngOnInit(){
    this.imageHeight = this.imageWidth * 0.75;

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.height = this.imageHeight;
    this.cropperSettings.width = this.imageWidth;
    this.cropperSettings.croppedHeight = this.imageHeight;
    this.cropperSettings.croppedWidth = this.imageWidth;
    this.cropperSettings.canvasHeight = this.imageHeight;
    this.cropperSettings.canvasWidth = this.imageWidth;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.cropperDrawSettings.strokeColor = "#423E37";
    this.cropperSettings.cropperDrawSettings.dragIconFillColor = "#D9D9D9";
    this.cropperSettings.cropperDrawSettings.dragIconStrokeColor = "#423E37";
    this.cropperSettings.cropperDrawSettings.strokeWidth = 1;
    this.cropperSettings.cropperDrawSettings.dragIconStrokeWidth = 1;
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
