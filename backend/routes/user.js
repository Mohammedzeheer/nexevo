const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const imagesController=require('../controllers/imagesController')
const upload=require('../middleware/multer')
const jwt=require('../middleware/jwt')

router.post('/register', userController.userSignup);
router.post('/login',userController.userLogin)
router.get('/profile',jwt,userController.profile)
router.post('/reset-password',userController.resetPassword)

router.get('/allimages',jwt,imagesController.getAllImages);
router.post('/upload', upload.array('images'),jwt,imagesController.uploadImage);
router.delete('/deleteimage',imagesController.deleteImage);
router.put('/updateimage',imagesController.updateImageTitle);
router.put('/updateImageOrder',imagesController.updateImageOrder)


module.exports = router;