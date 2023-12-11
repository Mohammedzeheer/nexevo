const Images = require('../models/imagesModel');
const cloudinary = require('../helpers/cloudinary')
const util = require('util');


const uploadImage = async (req, res) => {
  try {
    const titles = JSON.parse(req.body.titles);
    const files = req.files;
    const userId = req.UserId;
    const imageDetails = [];

    let existingImages = await Images.findOne({ UserId: userId });

    if (!existingImages) {
      existingImages = new Images({
        UserId: userId,
        imageDetails: [],
      });
    }

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const title = titles[i] || file.originalname;

      const result = await cloudinary.uploader.upload(file.path);
      const newImageDetail = {
        image: result.secure_url,
        title: title,
      };
      imageDetails.push(newImageDetail);
    }

    existingImages.imageDetails = [...existingImages.imageDetails, ...imageDetails];

    const savedImages = await existingImages.save();

    res.json({ message: 'Images uploaded successfully', images: savedImages });
  } catch (err) {
    console.error('Error uploading images:', err);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};



const getAllImages = async (req, res) => {
    try {
     const userId = req.UserId; 
      if (userId) {
        const user = await Images.find({UserId:userId});
        if (userId) {
          return res.json({user});
        } else {
          return res.status(404).json({ message: "Turf not found" });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };


  const deleteImage = async (req, res) => {
    const { imageUrl } = req.body;    
    try {
      const filter = { "imageDetails.image": imageUrl };
      const update = { $pull: { imageDetails: { image: imageUrl } } };
  
      const deletedImage = await Images.findOneAndUpdate(filter, update, { new: true });
      
      if (!deletedImage) {
        return res.status(404).json({ message: 'Image not found' });
      }
      await deleteIfImageDetailsEmpty()
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const deleteIfImageDetailsEmpty = async (req, res) => {
    try {
      const filter = { imageDetails: { $size: 0 } }; 
      const deletedUsers = await Images.deleteMany(filter);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  const updateImageTitle = async (req, res) => {
    const { imageUrl, newTitle } = req.body;
  
    try {
      const updatedImage = await Images.findOneAndUpdate(
        { 'imageDetails.image': imageUrl },
        { $set: { 'imageDetails.$.title': newTitle } },
        { new: true }
      );
  
      if (!updatedImage) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      return res.status(200).json({ message: 'Image title updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  const updateImageOrder= async (req, res) => {
    try {
      const updatedUserData = req.body.updatedUserData; 
     //  console.log(util.inspect(updatedUserData, { showHidden: false, depth: null }));
      for (const userData of updatedUserData) {
        const { userId, imageDetails } = userData;
        await Images.updateOne({ userId }, { imageDetails }); 
      }
  
      res.status(200).json({ message: 'Image order updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update image order' });
    }
  };
  

module.exports = { uploadImage,getAllImages,deleteImage,updateImageTitle,updateImageOrder};