const InterviewSession =require('../models/InterviewSession');
const Company=require('../models/Company');
exports.getInterviewSessions = async (req,res,next)=>{
    let query;
    if(req.user.role!=='admin'){
        query=InterviewSession.find({user:req.user.id}).populate({path:'company',select:'name province tel'});
    }else{
        if(req.params.companyID){
            console.log(req.params.companyID);
            query= InterviewSession.find({company:req.params.companyID}).populate({path:'company',select:'name province tel'});
        }else{
            query = InterviewSession.find().populate({path:'company',select:'name province tel'});
        }
    }

    try{
        const interviews = await query;
        res.status(200).json({success:true,count:interviews.length, data:interviews});
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,massage:"Cannot find Interview Session"});
    }
};

exports.getInterviewSession= async (req,res,next)=>{
     try{
         const interviews=await InterviewSession.findById(req.params.id).populate({
            path:'company',
            select:'name description tel'
         });

         if(!interviews){
            return res.status(404).json({success:false,message:`No interviews with the id of ${req.params.id}`});
         }

         res.status(200).json({success:true,data:interviews});
     }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:'Cannot find Interview'});
     }
};

exports.addInterviewSession=async (req,res,next)=>{
    try{
          req.body.company=req.params.companyID;

          const company=await Company.findById(req.params.companyID);

          if(!company){
            return res.status(404).json({success:false,message:`No company with the id of ${req.params.companyID}`});
          }
          req.body.user=req.user.id;

          const existedInterview = await InterviewSession.find({user:req.user.id});

          if(existedInterview.length >=3 && req.user.role !== 'admin'){
             return res.status(400).json({success:false,message:`The user with ID ${req.user.id} has already made 3 Interview Sessions`})
          }

          const interviews =await InterviewSession.create(req.body);

          res.status(200).json({success:true,data:interviews});
    }catch(error){
         console.log(error);
         return res.status(500).json({success:false,message:'Cannot create Interview Session'});
    }
};

exports.updateInterviewSession=async (req,res,next)=>{
    try{
        let interviews= await InterviewSession.findById(req.params.id);
    
        if(!interviews){
            return res.status(404).json({success:false,message:`No interviews with the id of ${req.params.id}`});
        }
        
        if(interviews.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized update this bootcamp`});
        }

        interviews=await InterviewSession.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({success:true,data:interviews});

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:'Cannot update Interview Session'})
    }
};

exports.deleteInterviewSession=async (req,res,next)=>{
    try{
        const interviews=await InterviewSession.findById(req.params.id);
        if(!interviews){
            return res.status(404).json({success:false,message:`No interviews with the id of ${req.params.id}`})
        }

        if(interviews.user.toString()!==req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this bootcamp`})
        }
        
        await interviews.deleteOne();

        res.status(200).json({success:true,data:{}});
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:'Cannot delete Interview Session'});
    }
};

