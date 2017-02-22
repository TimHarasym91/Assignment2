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
  toDos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.toDos = af.database.list('/toDos');
  }

  addToDo(){
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
            this.toDos.push({
              title: data.title,
              status: false
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeToDo(toDoId: string){
    this.toDos.remove(toDoId);
  }

//
  updateToDo(toDoId, toDoTitle){
  let prompt = this.alertCtrl.create({
    title: 'To Do Item',
    message: "Update the name for this To Do Item",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: toDoTitle
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
          this.toDos.update(toDoId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}

updateStatus(toDoId, toDoStatus){
  if(toDoStatus == false){
    this.toDos.update(toDoId,{
      status: true
    });
  }
  else if(toDoStatus == true){
    this.toDos.update(toDoId,{
      status: false
    });
  }
}

}
