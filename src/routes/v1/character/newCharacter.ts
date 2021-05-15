import express from 'express'
import { UploadedFile } from 'express-fileupload';
import ICharacter from '../../../utils/character';
import uploadCharacterToDb from '../../../utils/uploadCharacterToDb';
import addFileToIpfs from '../../../utils/uploadFileToIpfs';
const router = express.Router();

router.post('/',async (req,res)=>{
   if(!req.files){
       throw new Error(`error: no image file recieved in the new character router`);
   }
    const file =  req.files.file as UploadedFile;
    const fileName = req.body.fileName;
    let fileHash;
    try {
       fileHash = await addFileToIpfs(fileName,file);
    }catch(err) {
        throw new Error(err);
    }
    //const fileHash ="debugging_ongoing";
    const character :ICharacter= {
        name:req.body.name,
        description:req.body.desc,
        walletAddress:req.body.walletAddress,
        email:req.body.email,
        image:fileHash,
        isStory: req.body.isStory === "yes"? true:false,
        status:req.body.status,
        votes:0,
        createdAt:new Date().toISOString()
    } 
    const dbCharacter = await uploadCharacterToDb(character);
    console.log(`character:${JSON.stringify(dbCharacter,null,2)}`);
    
   if(!fileHash){
       throw new Error(`Failed to pin image to ipfs`);
   }else {
       console.log(`File Hash${fileHash}`);
   }
    // return res.json({
    //     fileName,
    //     fileHash,
    // })
    return res.render('upload',{fileName:req.body.name,fileHash});
});

export default router;