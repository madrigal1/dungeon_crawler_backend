import express from 'express';
import findAllCharacter from '../../../utils/findAllCharacs';
import findCharacter from '../../../utils/findCharacter';


const router = express();

router.get('/all',async(req,res,next)=>{
    try {
        const character = await findAllCharacter();
        return res.status(200).json({success:true,character});
    }catch(err){
        next(err);
    }
})

router.get('/',async(req,res,next)=>{
    const characName = req.query.name;
    console.log("search parm 1 " + characName);
    try {
        const character = await findCharacter(characName as string);
        if(!character) throw new Error(`No such character with name: ${characName}`);

        return res.status(200).json({success:true,character});
    }catch(err){
        next(err);
    }
})


export default router;
