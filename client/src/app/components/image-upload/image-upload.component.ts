import { AuthenticationService } from './../../services/authentication.service';
import { DataService } from './../../services/data.service';
import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Input() imageHeight: number;
  @Input() plantImage: string;
  @Output() imageUploadEvent = new EventEmitter();

  isLoading: boolean = false;
  isMouseOnHover: boolean = false;

  constructor(public dataService: DataService, public authService: AuthenticationService) { }

  uploadImage(imageInput){
    const image = imageInput.target.files[0];
    const key = 'images/' + Date.now().toString() + "_" + image.name;
    this.dataService.uploadfile(image, key);
    this.isLoading = true;
    setTimeout(() => {
      this.plantImage = 'https://s3.amazonaws.com/dig-it-custom-images/' + key;
      this.imageUploadEvent.emit(this.plantImage);
      this.isLoading = false;
    }, 5000);
  }

  onMouseEnter(){
    this.isMouseOnHover = true;
  }

  onMouseLeave(){
    this.isMouseOnHover = false;
  }
}
