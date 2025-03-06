<<<<<<< HEAD
module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};
  
=======
module.exports=(theFun)=>(req,res,next)=>{
    Promise.resolve(theFun(req,res,next)).catch(next)
}
>>>>>>> 0a072ecc1eed972990480c1fa55fe83eb14213c7
