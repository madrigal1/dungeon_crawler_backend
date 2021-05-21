import express from 'express'
import deleteCharacter from '../../../utils/deleteCharacter';

const router = express.Router();

router.delete("/",async (req,res,next)=>{
    const characterName = req.query.name as string;
    characterName.trim();
    console.log("cn " + characterName);
    try {
       const result =  await deleteCharacter(characterName as string);
       if(!result) throw new Error(`character not there in db.please vote on valid character.del fail`);
       return res.status(200).json({success:true,message:`${characterName} has been deleted`});
    }catch(err) {
       next(err);
    }
})

export default router;