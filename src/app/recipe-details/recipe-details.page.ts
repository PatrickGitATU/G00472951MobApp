
//Author: Patrick Walsh 
//The project was built using core Angular and Ionic concepts and re-utilised methods that were 
//delivered by Gerard Harrison on the Mobile Applications Module.



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


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
   imports: [IonButton, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, CommonModule, IonList, IonItem, IonLabel, IonButtons, IonIcon] ,
})

export class RecipeDetailsPage implements OnInit{

//Array used to hold recipe ids for favourites list
favArray: string[] = []; 

//Recipe ID returned from storage...updated in Ngoninit
ingrdntIDHere: string = "";

apiKey= "70759a4f7911402abcc53d3c51d3b759";

ingredientsFullDetails!:any; //Holds the data returned from the get request

extendedIngredients:any = []; //Holds array recipe data from the returned objects
 

analyzedInstructionsSteps:any =[]; //Holds array recipe data from the returned objects

buttonFavouriteStatus: boolean = false; //Holds state to determine if a recipe is in the favourites list
buttonStatusText: string = "initial";  //Holds button display text to show if recipe is in the favourites list

//Measurements visibility parameters
elementIsHiddenMeasurements: boolean = true;  //Used on html page to show/hide measurements units
radioButtonValueFromStorage: string = "metric";  //default is metric, when storage is returned it will be reassigned


//create an instance of router,create an instance for the data service, create an instance for the http service 
  constructor(private routerRecipeDetails: Router, private dsRecipeDetails: DataService, private mhsRecipeDetails:MyHttpService) { 
    //addIcons({ logoIonic });
  }


//The Final URL is updated with the new value for "this.ingrdntIDHere" in "async getIngrdntInfo()"
//URL is not complete and only initialsed here
optionsHere: HttpOptions = { 

url: "https://api.spoonacular.com/recipes/" + this.ingrdntIDHere + "/information?" + "apiKey="  + this.apiKey 
  }

  

 
  


//All variables re-initialised after storage values are returned
  async ngOnInit() {  

  await this.initialiseButton(); //initialise button text
   await this.getIngrdntID(); // Fetch updated  value
  
  await  this.getIngrdntInfo();  //fetch full recipe details 

  await this.getFavArrayFromStorage();  //fetch array from storage
  

   await this.getButtonRecipeArrayStatus(); //takes recipe id and compares with value in array in order to find favourite status
    

 await this.getMeasureSettingFromStorage();  //Once fetched it will determine whether metric or us units are shown


  }



//retries the recipe id from storage
 async getIngrdntID(){ 


	 this.ingrdntIDHere =  await this.dsRecipeDetails.get('ingrdntID'); 

	 console.log("Id for ingrdntIDHere is " + this.ingrdntIDHere)

 }




//Gets the recipe details 
async getIngrdntInfo(){
      
  
      console.log("Id for ingrdntIDHere in getIngrdntInfo() is " + this.ingrdntIDHere) 
	  
      //UPDATES THE URL with the value from storage 
      this.optionsHere.url = "https://api.spoonacular.com/recipes/" + this.ingrdntIDHere + "/information?apiKey=" + this.apiKey;
      console.log("URL get request is now " + this.optionsHere.url)

  
      
       let resultHere = await this.mhsRecipeDetails.get(this.optionsHere)  //Retrieves the results from the get request
      this.ingredientsFullDetails = resultHere.data;

      this.extendedIngredients =  resultHere.data.extendedIngredients; //assigns the extendedIngredients attribute from the object returned

      this.analyzedInstructionsSteps = resultHere.data.analyzedInstructions[0].steps //assigns the steps attribute from the inner array element 0
	  
      //this.measures = resultHere.data.extendedIngredients.measures;
      //console.log(this.ingredientsFullDetails) ///displays the object  in console 
	  
	  
      console.log("this is ingredientsFullDetails" + JSON.stringify(this.ingredientsFullDetails))  //displays the data received
      //console.log(JSON.stringify("this is extendedIngredients" + this.extendedIngredients))
}


//Adds,removes the recipe from the favourites array list
 addToFavourites(AddToFaves: string)
{
        let check: boolean = false; 

        console.log("Id for AddToFaves in addToFavourites() is " + AddToFaves);
        console.log("Id for ingrdntIDHere in addToFavourites() is " + this.ingrdntIDHere);

		//loop with IF used to check if the id is in the list, then exits if a match is found
		//Sets this.buttonStatusText depending on what is found in the array
        for (let i = 0; i < this.favArray.length; i++) {

            //REMOVE ELEMENT  //NOTE ==> this.buttonFavouriteStatus state is set during pageload in the function getButtonRecipeArrayStatus()
            if(this.buttonFavouriteStatus===true)
              console.log('Already in favourites so remove now!');
            //IF buttonFavouriteStatus is true, it means it's in the favourites already, 
            // and the button will say remove from favourites
            // so when it is clicked again it is removed from the array
            if (this.favArray[i] === AddToFaves) {  //if the recipe id (AddToFaves) is in the array (favArray[i])
          
            var index = this.favArray.indexOf(AddToFaves); //get index of the element
            this.favArray.splice(index, 1); //remove the element

              console.log('removed from favourites!');     
              this.buttonStatusText = "ADD TO FAVOURITES";
              alert('Removed from favourites!');
			
            // alert('Already in favourites!');
              check =true;
              break;
            }
          }
          

          //ADD ELEMENT
          if(check===false){
            this.favArray.push(AddToFaves)
            console.log('Added to favourites!');
            this.buttonStatusText = "REMOVE FROM FAVOURITES";
            alert('Added to favourites!');
            }
            
            // Save updated array to storage
            this.dsRecipeDetails.set('favArraySt', JSON.stringify(this.favArray));

        console.log("this.favArray is  " + this.favArray);

   }




//Return the favourites array from storage
  async getFavArrayFromStorage(){

       let array = await this.dsRecipeDetails.get('favArraySt'); //fetch array from storage

          //if there's no array in storage then create one
        if(array===null){
        await this.dsRecipeDetails.set('favArraySt', JSON.stringify(this.favArray)); //create array in storage

        } else{
          
          this.favArray = JSON.parse(array);
        }
          

}

//Added for testing
 async initialiseButton(){
	this.buttonStatusText="INITIALSED";
	console.log("button initialised");
 }







  //Checks if the recipe id (ingrdntIDHere) is in the fave array already and sets the fave button text state accordingly
  async getButtonRecipeArrayStatus(){
        

        console.log(" getButtonRecipeArrayStatus() is running ");
          
            for (let i = 0; i < this.favArray.length; i++) {
              if (this.favArray[i] === this.ingrdntIDHere) {
                console.log('Array value is ' + this.favArray[i]);
                console.log('this.ingrdntIDHere value is ' + this.ingrdntIDHere);
                this.buttonFavouriteStatus =true;
                this.buttonStatusText = "REMOVE FROM FAVOURITES";
                break;
              }
			  
            
            
            }

            if (this.buttonFavouriteStatus === false)
              {
                this.buttonStatusText="ADD TO FAVOURITES";
            }

        }   




//Get radio button value for measurements
async getMeasureSettingFromStorage(){

		let settingsVal = await this.dsRecipeDetails.get("radioButtonSt"); //fetch radioButtonSt from storage

		//if there's no radioButtonSt in storage then create one...  null if not set in storage
		if(settingsVal===null){
		await this.dsRecipeDetails.set("radioButtonSt", (this.radioButtonValueFromStorage)); //create key in storage with default "metric"

		} 

		else{

			this.radioButtonValueFromStorage = settingsVal;
		}

		//Measurement state (this.elementIsHiddenMeasurements) determines whether us or metric settings will display
		if( this.radioButtonValueFromStorage=== "metric"){   
				this.elementIsHiddenMeasurements = true;}
		else{
			this.elementIsHiddenMeasurements = false;
		  }

		}



		  

}