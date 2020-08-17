import { Schema, model } from 'mongoose';

const ExerciseListSchema = new Schema(
  {
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        part: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const ExerciseList = model('ExerciseList', ExerciseListSchema);

export default ExerciseList;
