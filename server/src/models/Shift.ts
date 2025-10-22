import { Schema, model, type Document } from 'mongoose';

interface IShift extends Document {
    name: string | "Empty Item";
    time: string;
    location: string;
}

const shiftSchema = new Schema<IShift>({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    },
    location: {
        type: String,
    }
});

const Shift = model<IShift>('Shift', shiftSchema);

export { type IShift, shiftSchema };

export default Shift;