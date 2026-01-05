
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  //Controls page routing throughout the application
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService }  from '../services/data.service' ; 
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common'; // needed for ngFor 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
   imports: [IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,CommonModule] ,
})
export class HomePage implements OnInit {

elementIsHidden: boolean = true; //hidden initially
ingredients:string = "";
ingredientsInfo!:any;
ingredientID:string="";

//https://api.spoonacular.com/recipes/complexSearch?apiKey=70759a4f7911402abcc53d3c51d3b759&query=rice

apiKey= "70759a4f7911402abcc53d3c51d3b759"    


options: HttpOptions = { 

url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + this.apiKey + "&query="
  }

  



//create an instance of router,create an instance for the data service, 
  constructor(private router: Router, private ds: DataService, private mhs:MyHttpService) { }
  
  
  // this ngOnInit() initialises the search field. Made Async to force a promise
  // in order to have the storage variable reinitialised following previous searches
  // so the field is empty on all page loads instead of just the first time it loads
  async ngOnInit() {  

  //this.ds.set("kw", "");
  //this.getKW();
   await this.ds.set("kw", ""); // Reset kw in storge to a blank string on page load 
   await this.getKW(); // Fetch updated kw value
  
   
  }

//this.ingredients = "ingredients";

  async getKW(){ 


 this.ingredients =  await this.ds.get('kw'); 

 console.log("this.ingredients in async getKW() is " + this.ingredients)

 //this.options.url = this.options.url.concat(this.ingredients)  //not needed here, updated in showRecipesForXYZ()
 //console.log("ingredients search url in getKW() is " + this.options.url) //not needed here, updated in showRecipesForXYZ()

// let result = await this.mhs.get(this.options)  //commented until i can see where url is getting the right value
// this.ingredientsInfo = result.data.results;  //commented until i can see where url is getting the right value




 // this.mhs.get(this.options)
  //this.ingredientsInfo  = await this.mhs.get(this.options)
  //this.ingredientsInfo = result.data.Search;



//console.log(this.ingredientsInfo) ///displays the data in console with the "results" field
 //console.log(JSON.stringify(this.ingredientsInfo))


}





  async showRecipesForXYZ(){

    //hide-show main card of results on home page
    this.elementIsHidden = !this.elementIsHidden;  //toggle the element to visible when the button is pressed

    console.log("this.ingredients in   async showRecipesForXYZ() is = "+ this.ingredients)
    
   //set the value for kw from what was entered
   await  this.ds.set("kw", this.ingredients); //value in storage will be arg1 (arg1, arg2)
    
   //update the url with the value entered into the search
   this.options.url = this.options.url.concat(this.ingredients)
    console.log("ingredients search url in showRecipesForXYZ() is " + this.options.url)
 
   //send the the query 
    let result = await this.mhs.get(this.options)

    //retrieve the query results
    this.ingredientsInfo = result.data.results;


   
   
    // this.ingredients = "";
   //this.router.navigate(['/recipe-details']);

   //console.log(this.ingredientsInfo) ///displays the data in console with the "results" field
 console.log(JSON.stringify(this.ingredientsInfo))
  
  }


async goToRecipeDetails(idPassedFromIngredientObject: string ) {
 this.ingredientID = idPassedFromIngredientObject;
console.log("goToRecipeDetails has ID = "+ idPassedFromIngredientObject)
 await  this.ds.set("ingrdntID", this.ingredientID) //value in storage will be arg1 (arg1, arg2)

this.router.navigate(['/recipe-details']);


   
}

  


}
