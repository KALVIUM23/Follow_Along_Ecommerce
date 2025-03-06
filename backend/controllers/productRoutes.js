
let express=require("express")
const ProductModel  = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler=require("../utils/Errorhandler")
const productRouter= express.Router()
const UserModel = require("../model/userModel")
const {productUpload}=require("../middleware/multer")
let path=require('path')
const mongoose=require("mongoose")


productRouter.post("/create-product",productUpload.array("images",10), catchAsyncError(async(req, res, next)=>{
    const { email,name, description,category,tags,price,stock} = req.body;
    const images =req.files.map((file)=>file.path);
    console.log(email,name, description,category,tags,price,images);

    if (!email ||!name ||!description ||!category ||!tags ||!price ||!images ||!stock) {
       return  next(new Errorhandler("All fields are required",400))
    }
    let user=await UserModel.findOne({email})
    if(!user){
        return next(new Errorhandler("user is not exist",404))
    }
    let product=new ProductModel({email,name, description,category,tags,price,images,stock})
  

    await product.save()
    res.status(201).json({message:"Product created successfully"})



}))


productRouter.get("/allproduct", catchAsyncError(async(req, res, next)=>{
      
     let allProduct = await ProductModel.find()

     if (allProduct && allProduct.length > 0) { 
        allProduct = allProduct.map((product) => {
            if (product.images && product.images.length > 0) {
                product.images = product.images.map((ele) => path.basename(ele));
            }
            return product; 
        });
    }
      
     res.status(200).json({status:true,message:allProduct})


}))




productRouter.delete("/delete/:id",catchAsyncError(async(req,res,next)=>{
    console.log("kjmk")
       let id=req.params.id
       if(!id){
         return next(new Errorhandler("id is not passed",400))
       }
       if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Errorhandler("Invalid ObjectId", 400));
       }
       const deletedProduct = await ProductModel.findByIdAndDelete(id);
       if (!deletedProduct) {
           return next(new Errorhandler("Product not found", 404));
       }
       res.status(200).json({status:true,message:"deleted successfully"})
       
}))



productRouter.put("/update/:id",catchAsyncError(async(req,res,next)=>{
    
    let id=req.params.id
    if(!id){
      return next(new Errorhandler("id is not passed",400))
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
     return next(new Errorhandler("Invalid ObjectId", 400));
    }
    
    const { email,name, description,category,tags,price,stock} = req.body;
    console.log(req.files)
    const images =req.files.map((file)=>file.path);
    console.log(email,name, description,category,tags,price,images);

    await ProductModel.findByIdAndUpdate(id,req.body)
    res.status(200).json({status:true,message:"updated successfully"})
    
}))






module.exports =productRouter;
