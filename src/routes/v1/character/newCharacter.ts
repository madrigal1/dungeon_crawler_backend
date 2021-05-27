import express from 'express'
import { UploadedFile } from 'express-fileupload';
import ICharacter from '../../../utils/character';
import uploadCharacterToDb from '../../../utils/uploadCharacterToDb';
import addFileToIpfs from '../../../utils/uploadFileToIpfs';
const router = express.Router();

router.post('/',async (req,res,next)=>{
    let fileHash;
    try {
        if(!req?.files)
            throw new Error(`error: no image file recieved in the new character router`);
        const file =  req.files.file as UploadedFile;
        const fileName = req.body.name;
        fileHash = await addFileToIpfs(fileName,file);
    }catch(err) {
        next(err);
    }
    //const fileHash ="debugging_ongoing";
    const character :ICharacter= {
        name:req.body.name.trim(),
        description:req.body.desc,
        walletAddress:req.body.walletAddress,
        email:req.body.email,
        image:fileHash,
        isStory: req.body.isStory === "yes"? true:false,
        status:req.body.status,
        votes:[],
        createdAt:new Date().toISOString()
    } 
    const dbCharacter = await uploadCharacterToDb(character);
    console.log(`character:${JSON.stringify(dbCharacter,null,2)}`);
    try {
        if(!fileHash)
            throw new Error(`Failed to pin image to ipfs`);
         console.log(`File Hash${fileHash}`);

        if(!dbCharacter)
            throw new Error(`character ${character.name} already exists`);
        res.status(200).json({success:true,charac:dbCharacter});
    }catch(err) {
        next(err);
    }
  
    // return res.json({
    //     fileName,
    //     fileHash,
    // })
    //return res.render('upload',{fileName:req.body.name,fileHash});
});

export default router;