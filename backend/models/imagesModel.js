const mongoose= require('mongoose')

const imagesSchema = new mongoose.Schema({
      UserId: {type: mongoose.Types.ObjectId, ref: 'users' },
      imageDetails: [{
        image: { type: String }, 
        title: { type: String },
        order: { type: Number },
      }]
    },
    {
        timestamps:true
    }   
)

module.exports = mongoose.model ('images', imagesSchema)

