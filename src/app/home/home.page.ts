
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { DataService }  from '../services/data.service' ; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
   imports: [IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent,  FormsModule ] ,
})
export class HomePage {

ingredients: string = "";

  constructor() {}


  showRecipesForXYZ(){
    
  }
}
