import { createUploadthing } from "uploadthing/express";
import z from "zod";
import userModel from "../models/userModel.js"

const f = createUploadthing();

export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
  profileUploader: f({
    image: {
      /**
       * For full list of options and defaults and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).input(z.object({ user_id: z.string() }))
  .middleware(({req,input})=>{
    return {"input":input};
  })
  .onUploadComplete(async (data) => {
    console.log("input",data.metadata.input)
    const user = await userModel.findById(data.metadata.input.user_id);
    
    if(user){
      
      user.profile = data.file.key;
      await user.save();
    }
    console.log("profile upload completed", data.metadata);
    return {"file":data.file.key};
  }),
} ;

