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
    const desc = req.body.desc; 
    //const fileHash = await addFileToIpfs(fileName,file);
    const fileHash ="debugging_ongoing";
    const character :ICharacter= {
        name:"test",
        description:desc,
        walletAddress:"debug",
        email:"debug@email.com",
        image:fileHash,
        story:"",
        status:"test",
        votes:0,
        createdAt:new Date().toISOString()
    } 
    await uploadCharacterToDb(character);
   if(!fileHash){
       throw new Error(`Failed to pin image to ipfs`);
   }else {
       console.log(`File Hash${fileHash}`);
   }
    // return res.json({
    //     fileName,
    //     fileHash,
    // })
    return res.render('upload',{fileName,fileHash});
});

export default router;