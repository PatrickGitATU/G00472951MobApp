

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  //Controls page routing throughout the application
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService }  from '../services/data.service' ; 
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common'; // needed for ngFor 

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
   imports: [IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,CommonModule] ,
})

export class RecipeDetailsPage implements OnInit{
ingrdntIDHere: string = "";
apiKey= "70759a4f7911402abcc53d3c51d3b759";


//create an instance of router,create an instance for the data service, 
  constructor(private routerRecipeDetails: Router, private dsRecipeDetails: DataService, private mhsRecipeDetails:MyHttpService) { }



optionsHere: HttpOptions = { 

url: "https://api.spoonacular.com/recipes/" + this.ingrdntIDHere + "/information?" + "apiKey="  + this.apiKey 
  }

  




  async ngOnInit() {  

  
   await this.getIngrdntID(); // Fetch updated  value
  
   
  }

//elementIsHidden: boolean = true; //hidden initially
//ingredients:string = "";
//ingredientsInfo!:any;







  async getIngrdntID(){ 


 this.ingrdntIDHere =  await this.dsRecipeDetails.get('ingrdntID'); 

  console.log("Id is " + this.ingrdntIDHere)

 //this.options.url = this.options.url.concat(this.ingredients)
 //let result = await this.mhs.get(this.options)
 //this.ingredientsInfo = result.data.results;


//console.log(this.ingredientsInfo) ///displays the data in console with the "results" field
 //console.log(JSON.stringify(this.ingredientsInfo))


}









}