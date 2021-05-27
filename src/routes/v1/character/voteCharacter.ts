import express from 'express'
import voteCharacter from '../../../utils/voteCharacter';

const router = express.Router();

router.get("/", async (req, res, next) => {
   const characterName = req.query.characName as string;
   const walletAddress = req.query.walletAddress as string;
   try {
      if (!characterName || !walletAddress) {
         throw new Error(`incorrect query params: please add character name and wallet address`);
      }
      characterName.trim();
      console.log("cn " + characterName);

      const result = await voteCharacter(characterName, walletAddress);
      if (!result) throw new Error(`character not there in db. or user already voted for character`);
      return res.status(200).json({ success: true, charac: result });
   } catch (err) {
      next(err);
   }
})

export default router;