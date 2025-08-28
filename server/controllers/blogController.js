import fs from 'fs'
import imageKit from "../configs/imageKit.js";
import blog from '../models/Blog.js';
import Comment from '../models/Comment.js';


export const addBlog = async(req, res)=>{
    try{
        const {title, subTitle, description, category, isPublished} 
            = JSON.parse(req.body.blog); 
            const imageFile = req.file;

        if(!title || !description || !category || !imageFile){
            return res.json({success:false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload image to ImageKit
         const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
         })

         // optimization through imagekit URL transformation
            const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, // Auto compression
                {format: 'webp'}, // Convert to modern format
                {width: '1280'} // Width resizing
            ]
        });

        const image = optimizedImageUrl;
        
        await blog.create({title, subTitle, description, category, image, isPublished})
   
        res.json({success: true, message: "Blog added successfully"})
   
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogs = async (req, res)=>{
    try {
        const blogs = await blog.find({isPublished: true})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogById = async (req, res) => { 
    try { 
        const { blogId } = req.params; 
        const singleBlog = await blog.findById(blogId);

        if (!singleBlog) { 
            return res.json({ success: false, message: "Blog not found" }); 
        } 

        res.json({ success: true, blog: singleBlog }); 
    } catch (error) { 
        res.json({ success: false, message: error.message }); 
    } 
};



export const deleteBlogById = async (req, res) =>{ 
    try { 
    const { id } = req.body; 
    await blog.findByIdAndDelete(id);
    // Delete all comments associated with the blog
    await Comment.deleteMany({blog: id}); 

        res.json({ success: false, message: "Blog Deleted successfully" }); 
    } catch (error) { 
       res.json({success: false, message: error.message}) 
    } 
}

export const togglePublish = async (req, res) =>{
    try {
        const { id } = req.body;
        const blogDoc = await blog.findById(id);   // ✅ use blog model
        if (!blogDoc) {
            return res.json({ success: false, message: "Blog not found" });
        }
        blogDoc.isPublished = !blogDoc.isPublished;
        await blogDoc.save();

        res.json({success: true, message: 'Blog status updated'});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const addComment = async (req, res) =>{
    try {
        const {blog, name, content } = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: 'Comment added for review'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getBlogComments = async (req, res) =>{
    try {
        const {blogId } = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort
        ({createdAt: -1});
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}