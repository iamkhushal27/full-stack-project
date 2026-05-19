const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
  
    if (!result.success) {
        console.log(result)
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    console.log(result.data,"result")
    
    req.body = result.data;
    next();
  };
  
export { validate };