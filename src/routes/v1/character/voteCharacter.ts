import express from 'express'
import voteCharacter from '../../../utils/voteCharacter';

const router = express.Router();

router.get("/:name",async (req,res)=>{
    const characterName = req.params.name;
    try {
       const res =  await voteCharacter(characterName);
       if(!res) throw new Error(`character not there in db.please vote on valid character`)
    }catch(err) {
        throw new Error(err);
    }
})

export default router;