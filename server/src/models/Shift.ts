import { Schema, model, type Document } from 'mongoose';

interface IShift extends Document {
    name: string;
    location?: string;
    timeDay?: string;
    status?: string;
    postedBy?: string;
    notes?: string;
    createdAt?: string;
}

const shiftSchema = new Schema<IShift>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
    },
    timeDay: {
        type: String,
    },
    status: {
        type: String,
    },
    postedBy: {
        type: String,
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Shift = model<IShift>('Shift', shiftSchema);

export { type IShift, shiftSchema };

export default Shift;