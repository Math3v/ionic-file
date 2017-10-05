import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File, Entry } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataDirectory: string = '';
  applicationDirectory: string = '';
  createdFile: string = '';
  copiedFile: string = '';
  resultError: string = '';

  constructor(
    public navCtrl: NavController,
    private file: File
  ) { }

  ionViewDidEnter() {
    const fileName = (new Date()).getMilliseconds().toString();
    this.dataDirectory = this.file.dataDirectory;
    this.applicationDirectory = this.file.applicationDirectory;

    this.file.createFile(
      this.file.dataDirectory,
      fileName,
      true
    ).then((entry: Entry) => {
      this.createdFile = entry.nativeURL;
      return this.file.copyFile(
        this.file.dataDirectory,
        fileName,
        this.file.dataDirectory,
        `${fileName}_copy`
      )
    }).then((entry: Entry) => {
      this.copiedFile = entry.nativeURL;
    }).catch(err => {
      this.resultError = JSON.stringify(err);
    });
  }
}
