import mongoose from 'mongoose';

mongoose
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Connected to MongoDB`.green.bold))
  .catch((err) => console.log(`Could not connected MongoDB: ${err}`.red.bold));
