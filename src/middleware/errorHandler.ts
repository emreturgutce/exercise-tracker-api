export default (err: any, req: any, res: any, next: any) => {
  res.json({ error: err.message });
};
