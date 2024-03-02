const mongoose=require('mongoose');

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please add a name' ],
        unique: true,
        trim:true ,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address:{
        type:String,
        required:[true,'Please add an address'],
    },
    description:{
        type:String,
        required:[true,'Please add a description']
    },
    website:{
        type:String,
        required:[true,'Please add a website']
    },
    tel:{
        type:String
    },
},{
        toJSON:{virtual:true},
        toObject:{virtuals:true}
});

// companySchema.pre('deleteOne',{document:true , query:false}, async function(next){
//     console.log(`Appointments being removed from hospital ${this._id}`);
//     await this.model('Appointments').deleteMany({hospitals:this._id});
//     next();
// })

// companySchema.virtual('appointments',{
//     ref:'Appointment',
//     localField:'_id',
//     foreignField:'hospital',
//     justOne:false
// })

module.exports = mongoose.model('Company', companySchema);