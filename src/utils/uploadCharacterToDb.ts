import ICharacter from "./character";


import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import { Options } from "ipfs-core/src/components";
import crypto from 'crypto'

const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    }
  }

const initIPFSInstance = async () => {
    return await IPFS.create(ipfsOptions as Options);
};


const getId = ():string =>{
   return crypto.randomBytes(64).toString("hex");
}


const uploadCharacterToDb = async (character:ICharacter):Promise<ICharacter> =>{
    let charac=undefined;
   initIPFSInstance().then(async (ipfs)=>{
    const orbitdb = await OrbitDB.createInstance(ipfs);

    // Create / Open a database
    const db = await orbitdb.docstore("characters", { indexBy: "walletAddress" });
    await db.load();

    //check if character already exists
    charac= await db.query((e: any) => e.walletAddress == character.walletAddress);
    console.log("character already in db: " + JSON.stringify(charac,null,4));
    if (charac.length != 0){
      await orbitdb.disconnect();
      return charac;
    }
      

    // Add an entry
    const hash = await db.put({ _id: getId(), ...character });
    console.log(hash);


    //Query character
    charac = await db.query((e: any) => e.walletAddress == character.walletAddress);



    // Output full db
    const result = await db.query((e: any) => e == e);
    console.log(`result: ${JSON.stringify(result, null, 4)}`);
    await orbitdb.disconnect();
   });
    return charac;
}


export default uploadCharacterToDb;