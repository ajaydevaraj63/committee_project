
const jwt=require("jsonwebtoken");

 exports.verifyUser= async (req, res, next) => {
  try {
    //we provided this token into the req, api->index.js file
    const token = req.headers.authorization
    //token length less than 500 means its an jwt token otherways google token
   
    let decodedData;
    if (token ) {
      decodedData = jwt.verify(token);
      req.userId = decodedData?.id; 
      console.log(req);
      console.log(decodedData);
      //this pass on req, so we can use in controllers
    } 
    next();
  } catch (error) {
    console.log(error);
  }
};

