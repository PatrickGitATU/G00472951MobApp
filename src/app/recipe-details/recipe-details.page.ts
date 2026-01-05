

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  //Controls page routing throughout the application
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonImg } from '@ionic/angular/standalone';
import { DataService }  from '../services/data.service' ; 
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common'; // needed for ngFor 

//import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
   imports: [IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, CommonModule, IonList, IonItem, IonLabel] ,
})

export class RecipeDetailsPage implements OnInit{
ingrdntIDHere: string = "";
apiKey= "70759a4f7911402abcc53d3c51d3b759";

ingredientsFullDetails!:any;

  extendedIngredients:any = [];
  measures:any = [];


//create an instance of router,create an instance for the data service, 
  constructor(private routerRecipeDetails: Router, private dsRecipeDetails: DataService, private mhsRecipeDetails:MyHttpService) { }


//The Final URL is updated with the new value for "this.ingrdntIDHere" in "async getIngrdntInfo()"
//URL is not complete and only initialsed here
optionsHere: HttpOptions = { 

url: "https://api.spoonacular.com/recipes/" + this.ingrdntIDHere + "/information?" + "apiKey="  + this.apiKey 
  }

  




  async ngOnInit() {  

  
   await this.getIngrdntID(); // Fetch updated  value
  
  await  this.getIngrdntInfo();  //fetch full recipe details 

  }

//elementIsHidden: boolean = true; //hidden initially
//ingredients:string = "";
//ingredientsInfo!:any;







  async getIngrdntID(){ 


 this.ingrdntIDHere =  await this.dsRecipeDetails.get('ingrdntID'); 

  console.log("Id for ingrdntIDHere is " + this.ingrdntIDHere)

 //this.options.url = this.options.url.concat(this.ingredients)
 //let result = await this.mhs.get(this.options)
 //this.ingredientsInfo = result.data.results;


//console.log(this.ingredientsInfo) ///displays the data in console with the "results" field

 //console.log(JSON.stringify(this.ingredientsInfo))


  }


async getIngrdntInfo()

{
 //this.ingredients =  await this.ds.get('kw'); 

 
console.log("Id for ingrdntIDHere in getIngrdntInfo() is " + this.ingrdntIDHere) 
 this.optionsHere.url = "https://api.spoonacular.com/recipes/" + this.ingrdntIDHere + "/information?apiKey=" + this.apiKey;
  console.log("URL get request is now " + this.optionsHere.url)

 //this.optionsHere.url = this.optionsHere.url
 
  let resultHere = await this.mhsRecipeDetails.get(this.optionsHere)  //
 this.ingredientsFullDetails = resultHere.data;
this.extendedIngredients =  resultHere.data.extendedIngredients;
this.measures = resultHere.data.extendedIngredients.measures;
//console.log(this.ingredientsFullDetails) ///displays the object  in console with the "results" field
 console.log("this is ingredientsFullDetails" + JSON.stringify(this.ingredientsFullDetails))  //displays the data
//console.log(JSON.stringify("this is extendedIngredients" + this.extendedIngredients))
}











}

