// import { createUploadthing } from "uploadthing/express";
// import z from "zod";
// import userModel from "../models/userModel.js"

// const f = createUploadthing();

// export const uploadRouter = {
//   // Define as many FileRoutes as you like, each with a unique routeSlug
//   imageUploader: f({
//     image: {
//       /**
//        * For full list of options and defaults and defaults, see the File Route API reference
//        * @see https://docs.uploadthing.com/file-routes#route-config
//        */
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   }).onUploadComplete((data) => {
//     console.log("upload completed", data);
//   }),
//   profileUploader: f({
//     image: {
//       /**
//        * For full list of options and defaults and defaults, see the File Route API reference
//        * @see https://docs.uploadthing.com/file-routes#route-config
//        */
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   }).input(z.object({ user_id: z.string() }))
//   .middleware(({req,input})=>{
//     return {"input":input};
//   })
//   .onUploadComplete(async (data) => {
//     console.log("input",data.metadata.input)
//     const user = await userModel.findById(data.metadata.input.user_id);
    
//     if(user){
      
//       user.profile = data.file.key;
//       await user.save();
//     }
//     console.log("profile upload completed", data.metadata);
//     return {"file":data.file.key};
//   }),
// } ;
import { createUploadthing } from "uploadthing/express";
import z from "zod";
import userModel from "../models/userModel.js";

const f = createUploadthing();

export const uploadRouter = {
  // ✅ Image uploader
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log("Image upload completed", data);
  }),

  // ✅ Profile uploader with zod input validation
  profileUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ user_id: z.string() }))
    .middleware(({ req, input }) => {
      return { input };
    })
    .onUploadComplete(async (data) => {
      const user = await userModel.findById(data.metadata.input.user_id);
      if (user) {
        user.profile = data.file.key;
        await user.save();
      }
      console.log("Profile upload completed", data.metadata);
      return { file: data.file.key };
    }),

  // ✅ Assignment file uploader
  assignmentUploader: f({
    "application/pdf": { maxFileSize: "8MB" },
    "image/*": { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB" },
    "text/plain": { maxFileSize: "4MB" },
  }).onUploadComplete(({ file }) => {
    console.log("Assignment uploaded:", file.url);
    return { fileUrl: file.url };
  }),

  // ✅ Course material uploader
  courseMaterialUploader: f({
    "application/pdf": { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB" },
    "image/*": { maxFileSize: "8MB" },
  }).onUploadComplete(({ file }) => {
    console.log("Course material uploaded:", file.url);
    return { fileUrl: file.url };
  }),

  // ✅ General file uploader for tutors/students
  fileUploader: f({
    "application/pdf": { maxFileSize: "10MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "10MB" },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "10MB" },
    "application/xml": { maxFileSize: "5MB" },
    "text/xml": { maxFileSize: "5MB" },
    "image/png": { maxFileSize: "8MB" },
    "image/jpeg": { maxFileSize: "8MB" },
    "image/jpg": { maxFileSize: "8MB" },
    "image/gif": { maxFileSize: "8MB" },
    "image/webp": { maxFileSize: "8MB" },
  })
    .input(
      z
        .object({
          assignmentId: z.string().optional(),
          studentId: z.string().optional(),
          uploadedBy: z.enum(["tutor", "student"]).optional(),
        })
        .optional()
    )
    .middleware(({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const input = metadata.input || {};
      const { assignmentId, studentId, uploadedBy } = input;

      console.log("File uploaded:", file);
      if (studentId && assignmentId) {
        console.log("Student submitted file for assignment:", {
          studentId,
          assignmentId,
        });

        // Optional: Save to DB
        // await Submission.create({
        //   assignmentId,
        //   studentId,
        //   files: [file.url],
        // });
      } else {
        console.log("Tutor uploaded file (materials/resources).");
      }

      return {
        fileUrl: file.url,
        uploadedBy,
        assignmentId,
        studentId,
      };
    }),
};
