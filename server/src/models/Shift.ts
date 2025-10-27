import mongoose, { Schema, type Document } from 'mongoose';


interface IShift extends Document {
    location: string;
    startTime: string;
    endTime: string;
    day: string;
    status: string;
    employee: string;
    notes?: string;
}

const shiftSchema = new Schema<IShift>({
    location: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    day: { type: String, required: true },
    status: { type: String, required: true },
    employee: { type: String, required: true },
    notes: { type: String },
});

const Shift = mongoose.model<IShift>('Shift', shiftSchema, 'shifts');

export { type IShift, shiftSchema };

export default Shift;