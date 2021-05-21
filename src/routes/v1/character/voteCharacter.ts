import express from 'express'
import voteCharacter from '../../../utils/voteCharacter';

const router = express.Router();

router.get("/",async (req,res,next)=>{
    const characterName = req.query.name as string;
    characterName.trim();
    console.log("cn " + characterName);
    try {
       const result =  await voteCharacter(characterName as string);
       if(!result) throw new Error(`character not there in db.please vote on valid character`);
       return res.status(200).json({success:true,charac:result});
    }catch(err) {
       next(err);
    }
})

export default router;