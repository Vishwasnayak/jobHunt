import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError, NotFoundError,UnAuthenticatedError} from "../errors/index.js"
import checkPermissions from "../utils/checkPermissions.js"
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;
import moment from 'moment';

const createJob=async (req,res)=>{
    const {company, position}=req.body; 

    if(!company || !position){
        throw new BadRequestError("please provide all values")
    }

     req.body.createdBy=req.user.userId;
     const job= await Job.create(req.body)
     res.status(StatusCodes.CREATED).json({job})

}
const getAllJobs=async (req,res)=>{
  const { search, status, jobType, sort } = req.query;

  const queryObject = {     //get query whichever user searches on 
    createdBy: req.user.userId,
  };

  if (status !== 'all') { //if status is not all then it means user selected particular status
    queryObject.status = status; 
  }
  if (jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {  //search based on position, regex search all values whatever user entered
    queryObject.position = { $regex: search, $options: 'i' }; //i means case insensitive
  }

 
  // NO AWAIT
  let result = Job.find(queryObject); //this gets query

  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }  
  
  //set up pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //suupose page2, then skip 2-1, 1st 10(limit) values
  result = result.skip(skip).limit(limit); //this will skip requied values and limit values in 1 page
 
   const jobs = await result; //wait till it gets result

   const totalJobs = await Job.countDocuments(queryObject); //to send to frontend will count by mongo based on query independent of limit
   const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({jobs,totalJobs,numOfPages})
}
const updateJob=async (req,res)=>{
    const { id: jobId } = req.params;
    const { company, position } = req.body;
  
    if (!position || !company) {
      throw new BadRequestError('Please provide all values');
    }
    const job = await Job.findOne({ _id: jobId });
  
    if (!job) {
      throw new NotFoundError(`No job with id :${jobId}`);
    }
    // check permissions to person swho created job only can edit because in server we are checking authent user
  
    checkPermissions(req.user, job.createdBy);

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true,
      });
    
      res.status(StatusCodes.OK).json({ updatedJob });
}
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;
  
    const job = await Job.findOne({ _id: jobId });
    console.log("delete job",job)
    if (!job) { 
      throw new NotFoundError(`No job with id :${jobId}`);
    }
   
    checkPermissions(req.user, job.createdBy);
    await job.deleteOne();
   
    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
  };

   
  const showStats = async (req, res) => {
    let stats = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, //match all jobs related to one user
      { $group: { _id: '$status', count: { $sum: 1 } } }, //group them based on status
    ]);
  
    stats=stats.reduce((acc,curr)=>{
      const {_id:title,count}=curr
      acc[title]=count   //status get counted
      return acc
    },{})
     console.log("stats in server",stats)
    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

  let monthlyApplications = await Job.aggregate([
  { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
  {
    $group: {   //group based on year and month
      _id: {
        year: {
          $year: '$createdAt',
        },
        month: {
          $month: '$createdAt',
        },
      },
      count: { $sum: 1 },
    },
  },
  { $sort: { '_id.year': -1, '_id.month': -1 } }, //sort by latest month 
  { $limit: 6 },  //last 6 months only
]);
   
monthlyApplications = monthlyApplications  //mapping to make it readable
  .map((item) => {
    const { _id: { year, month },count,} = item;
    // accepts 0-11
    const date = moment().month(month - 1) //moment counts0-11 in mongo 1-12
    .year(year).format('MMM Y');
    return { date, count };
  })
  .reverse(); //put latest at last so that in chart displat it will be easy

    res.status(StatusCodes.OK).json({ stats, monthlyApplications});
  };

export {createJob,getAllJobs,updateJob,deleteJob,showStats}