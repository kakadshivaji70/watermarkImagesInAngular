import { Component } from '@angular/core';
import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'my-app';
  bikeImage: string = '../assets/Grey.JPG';
  selectedImage: string = null;
  selectedLogo: string = null;
  bookmarkText: string= null;

  onAnySelectedFile(event: any, type: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if (type == 'image')
          this.selectedImage = event.target['result'];
        else if (type == 'logo')
          this.selectedLogo = event.target['result'];
      }
    }
  }

  addLogoWatermark() {
    if (this.selectedImage == null) {
      alert('Please select image');
      return;
    }

    if (this.selectedLogo == null) {
      alert('Please select logo');
      return;
    }

    watermark([this.selectedImage, this.selectedLogo])
      .image(watermark.image.upperLeft(0.5)) // Or lowerRight() for no opacity
      .then(function (img) {
        document.getElementById('processedImage1').appendChild(img);
      });
  }

  addTextWatermark() {
    if (this.selectedImage == null) {
      alert('Please select image');
      return;
    }

    if (this.bookmarkText == null) {
      alert('Please enter bookmark text');
      return;
    }

    watermark([this.selectedImage])
      .image(watermark.text.lowerRight(this.bookmarkText, '40px serif', '#f12', 0.5)) // Or lowerRight() for no opacity
      .then(function (img) {
        document.getElementById('processedImage2').appendChild(img);
      });
  }
}
