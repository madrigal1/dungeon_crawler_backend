import ICharacter from "./character";


import crypto from 'crypto'

import {characdb,} from '../database'






const findCharacter = async (character:string):Promise<ICharacter| undefined> =>{

    // Create / Open a database
    //check if character already exists
    const result =  await characdb.query((e: any) => e.name === e.name);
    console.log(`result: ${JSON.stringify(result, null, 5)}`);

    //console.log("search param " + JSON.stringify(character,null,4))
    let charac= await characdb.query((e: any) => e.name === character);
    if (charac.length == 0){
      console.log("character not in db: " + JSON.stringify(charac,null,4));
      //return {...charac[0]};
      return undefined;
    }

    return {...charac[0]};
}



export default findCharacter;