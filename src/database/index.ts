
import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import { Options } from "ipfs-core/src/components";


const ipfsOptions = {
    EXPERIMENTAL: {
      pubsub: true
    }
  }


let ipfs:any,orbitdb:any,characdb:any;
(async()=>{
     ipfs = await IPFS.create(ipfsOptions as Options);
     orbitdb = await OrbitDB.createInstance(ipfs);
     characdb = await orbitdb.docstore("characters",{ indexBy: '_id' });
      characdb.load();
})()

export {
    ipfs,
    orbitdb,
    characdb,
}



