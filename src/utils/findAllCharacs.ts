

import ICharacter from "./character";


import {characdb} from '../database'






const findAllCharacters = async ():Promise<ICharacter[] | undefined> =>{

    let charac= await characdb.query((e: any) => e.name === e.name);
    return charac;
}



export default findAllCharacters;