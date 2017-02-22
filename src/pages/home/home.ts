import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {
  NavController,
  AlertController,
  ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.songs = af.database.list('/songs');
  }

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'To Do Item',
      message: "Enter a To Do item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.push({
              title: data.title,
              status: false
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeSong(songId: string){
    this.songs.remove(songId);
  }

  updateSong(songId, songTitle){
  let prompt = this.alertCtrl.create({
    title: 'To Do Item',
    message: "Update the name for this To Do Item",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: songTitle
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.update(songId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

updateStatus(songId, songStatus){
  if(songStatus == false){
    this.songs.update(songId,{
      status: true
    });
  }
  else if(songStatus == true){
    this.songs.update(songId,{
      status: false
    });
  }
}

}
