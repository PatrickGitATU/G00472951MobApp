import { Injectable } from '@angular/core';
import { Storage  } from '@ionic/storage-angular';





@Injectable({
  providedIn: 'root'
})
export class DataService { 
  
  constructor(private storage: Storage){

    this.init();
   }

//creates the storage
async init(){    
  await this.storage.create(); 

}

//method to place the values into storage
async set(key: string, value: any){

  await this.storage.set(key, value); 
}


//method to get the values from storage
async get(key: string){

  return   await this.storage.get(key); 
}


  }
