export default (req: any, res: any, next: any) => {
  if (!req.route) {
    res.status(404);
    return next(new Error('Route not found'));
  }
  next();
};
