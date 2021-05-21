
import express from 'express'
import findCharacter from './findCharacter';
import newCharacter from './newCharacter'
import voteCharacter from './voteCharacter'
import deleteCharacter from './deleteCharacter'
const router = express.Router();

router.use('/new',newCharacter);
router.use('/vote',voteCharacter);
router.use('/find',findCharacter);
router.use('/delete',deleteCharacter);

export default router;