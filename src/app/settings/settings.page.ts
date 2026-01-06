import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRadioGroup, IonRadio]
})
export class SettingsPage implements OnInit {

 //Metric===true, US===false.
 //stateMeasurement: boolean = true; 

 radioButtonSelectedValue: string = "metric";
  
  //create an instance of router,create an instance for the data service, 
  constructor( private dsSettings: DataService) { 
    
  }


  async ngOnInit() {

   await this.getMeasureSettingFromStorage();

  }



//Assign the newly selected radiobutton value in storage
async setMeasureSettingInStorage(){

await this.dsSettings.set("radioButtonSt", (this.radioButtonSelectedValue)); //create array in storage
}

async getMeasureSettingFromStorage(){

  let settingsVal = await this.dsSettings.get("radioButtonSt"); //fetch radioButtonSt from storage

  //if there's no radioButtonSt in storage then create one
if(settingsVal===null){
 await this.dsSettings.set("radioButtonSt", (this.radioButtonSelectedValue)); //create array in storage

} else{
  
  this.radioButtonSelectedValue = settingsVal;
}
  

}


}
