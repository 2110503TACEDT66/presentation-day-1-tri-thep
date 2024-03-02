const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50,'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    }, 
    website: {
        type: String,
        required: [true, 'Please add a website']
    },
    description : {
        type: String,
        required: [true, 'Please add a description']
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number']
    },
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

//Reverse populate with virtuals
companySchema.virtual('interviews',{
    ref: 'Interview',
    localField: '_id',
    foreignField: 'company',
    justOne: false
});

//Cascade delete  when a company is deleted
companySchema.pre('deleteOne',{document:true, query:false}, async function(next){
    console.log(`Interviews being removed from company ${this._id}`);
    await this.model('Interview').deleteMany({company:this._id});
    next();
})

module.exports = mongoose.model('Company', companySchema);
