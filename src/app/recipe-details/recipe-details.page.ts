

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  //Controls page routing throughout the application
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonImg, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { DataService }  from '../services/data.service' ; 
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common'; // needed for ngFor 
import { async } from 'rxjs';

import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';


//import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
   imports: [IonButton, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, CommonModule, IonList, IonItem, IonLabel, IonButtons, IonIcon] ,
})

export class RecipeDetailsPage implements OnInit{

favArray: string[] = [];

//Recipe ID returned from storage...updated in Ngoninit
ingrdntIDHere: string = "";

apiKey= "70759a4f7911402abcc53d3c51d3b759";

ingredientsFullDetails!:any;

  extendedIngredients:any = [];
 // measures:any = [];

analyzedInstructionsSteps:any =[];

buttonFavouriteStatus: boolean = false;
buttonStatusText: string = "initial";

//create an instance of router,create an instance for the data service, 
  constructor(private routerRecipeDetails: Router, private dsRecipeDetails: DataService, private mhsRecipeDetails:MyHttpService) { 
    //addIcons({ logoIonic });
  }


//The Final URL is updated with the new value for "this.ingrdntIDHere" in "async getIngrdntInfo()"
//URL is not complete and only initialsed here
optionsHere: HttpOptions = { 

url: "https://api.spoonacular.com/recipes/" + this.ingrdntIDHere + "/information?" + "apiKey="  + this.apiKey 
  }

  




  async ngOnInit() {  

  await this.initialiseButton();
   await this.getIngrdntID(); // Fetch updated  value
  
  await  this.getIngrdntInfo();  //fetch full recipe details 

  await this.getFavArrayFromStorage();  //fetch array from storage
  

   await this.getButtonRecipeArrayStatus(); //takes recipe id and compares with value in array in order to find favourite status

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

this.analyzedInstructionsSteps = resultHere.data.analyzedInstructions[0].steps
//this.measures = resultHere.data.extendedIngredients.measures;
//console.log(this.ingredientsFullDetails) ///displays the object  in console 
 console.log("this is ingredientsFullDetails" + JSON.stringify(this.ingredientsFullDetails))  //displays the data received
//console.log(JSON.stringify("this is extendedIngredients" + this.extendedIngredients))
}



 addToFavourites(AddToFaves: string)
{
 let check: boolean = false; 

 console.log("Id for AddToFaves in addToFavourites() is " + AddToFaves);
 console.log("Id for ingrdntIDHere in addToFavourites() is " + this.ingrdntIDHere);

 for (let i = 0; i < this.favArray.length; i++) {
    if (this.favArray[i] === AddToFaves) {
  
      console.log('Already in favourites favourites!');
      alert('Already in favourites!');
      check =true;
      break;
    }
  }
  
  if(check===false){
    this.favArray.push(AddToFaves)
    console.log('Added to favourites!');
    alert('Added to favourites!');
    }



     // Save updated array to storage
    this.dsRecipeDetails.set('favArraySt', JSON.stringify(this.favArray));

console.log("this.favArray is  " + this.favArray);

  }


async getFavArrayFromStorage(){

  let array = await this.dsRecipeDetails.get('favArraySt'); //fetch array from storage

  //if there's no array in storage then create one
if(array===null){
 await this.dsRecipeDetails.set('favArraySt', JSON.stringify(this.favArray)); //create array in storage

} else{
  
  this.favArray = JSON.parse(array);
}
  

}

 async initialiseButton(){
 this.buttonStatusText="INITIALSED";
  console.log("button initialised");
 }


    async getButtonRecipeArrayStatus(){
        
      for (let i = 0; i < this.favArray.length; i++) {
        if (this.favArray[i] === this.ingrdntIDHere) {
          console.log('Array value is ' + this.favArray[i]);
          console.log('this.ingrdntIDHere value is ' + this.ingrdntIDHere);
          this.buttonFavouriteStatus =true;
          this.buttonStatusText = "REMOVE FROM FAVOURITES";
          break;
        }
        else{
          this.buttonStatusText="ADD TO FAVOURITES";
          break;
        }

      }   
    }

}