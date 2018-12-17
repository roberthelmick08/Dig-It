import { DataService } from './../../services/data.service';
import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  @Input() plantImage: string;

  @Output() imageUploadEvent = new EventEmitter();

  isMouseOnHover: boolean = false;

  constructor(public dataService: DataService) { }

  uploadImage(imageInput){
    const image = imageInput.target.files[0];
    const key = 'images/' + Date.now().toString() + "_" + image.name;
    this.dataService.uploadfile(image, key);
    setTimeout(() => {
      this.plantImage = 'https://s3.amazonaws.com/dig-it-custom-images/' + key;
      this.imageUploadEvent.emit(this.plantImage);
    }, 5000);
  }

  onMouseEnter(){
    this.isMouseOnHover = true;
  }

  onMouseLeave(){
    this.isMouseOnHover = false;
  }
}
