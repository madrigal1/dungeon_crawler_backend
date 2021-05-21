import ICharacter from "./character";


import crypto from 'crypto'

import {characdb,orbitdb} from '../database'



const getId = ():string =>{
   return crypto.randomBytes(64).toString("hex");
}


const uploadCharacterToDb = async (character:ICharacter):Promise<ICharacter| undefined> =>{

    // Create / Open a database
    //check if character already exists
    let charac= await characdb.query((e: any) => e.name == character.name);
    if (charac.length != 0){
      console.log("character already in db: " + JSON.stringify(charac,null,5));
      //return {...charac[0]};
      return undefined;
    }


    // Add an entry
    const hash = await characdb.put({ _id: getId(), name:character.name, ...character });
    console.log(hash);


    //Query character
    charac = await characdb.query((e: any) => e.name == character.name);

    console.log(`New created charac: ${JSON.stringify(charac,null,5)}`)

    console.log(`Output full db`);
    // Output full db
    const result =  await characdb.query((e: any) => e.name == e.name);
    console.log(`result: ${JSON.stringify(result, null, 5)}`);
    return {...charac[0]};
}


export default uploadCharacterToDb;