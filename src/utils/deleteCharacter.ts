import {characdb} from '../database'
import ICharacter from './character';


const deleteCharacter = async (characterName:string):Promise<boolean> => {
    let charac= await characdb.query((e: any) => e.name == characterName);
    if (charac.length <= 0){
      console.log("character not already in db: " + JSON.stringify(charac,null,5));
      return false;
    }
    if(!charac[0]._id) {
        console.log("no id found in the character");
        return false;
    }


    try {
        await characdb.del(charac[0]._id);
        const result =  await characdb.query((e: any) => e.name == e.name);
        console.log(`result: ${JSON.stringify(result, null, 5)}`);
        return true;
    }catch(err) {
        console.log(`delete charac function failure: ${err}`);
        return false;
    }
}

export default deleteCharacter;