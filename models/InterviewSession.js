const mongoose=require('mongoose');


const InterviewSessionSchema=new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        validate: {
          validator: function(value) {
            const startDate = new Date('2022-05-10');
            const endDate = new Date('2022-05-13');
            return value >= startDate && value <= endDate;
          },
          message: 'Date must be between May 10th - 13th, 2022'
        }
      },
      preferredCompanies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
      }],
    }, {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
});


module.exports=mongoose.model('InterviewSession',InterviewSessionSchema);