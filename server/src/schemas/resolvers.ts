import Shift from "../models/Shift.js";

const resolvers = {
Query: {
  all_shifts: async () => {
    const shifts = await Shift.find({});
    return shifts;
  },
},

  Mutation: {
    addShift: async (_parent: any, 
      { location, startTime, endTime, day, status, perner, employee, notes }: 
      { location: string; startTime?: string; endTime?: string; day: string; status: string; perner: string; employee: string; notes?: string }) => {

      try {
        const newShift = await Shift.create({ location, startTime, endTime, day, status, employee, notes, perner });
        await newShift.save();
        return newShift;
      } 
      catch (error) {
        console.error('Error creating shift:', error);
        throw new Error('Failed to create shift');
      }
    },
    delShift: async (_parent: any, { shiftId }: { shiftId: string }) => {
      try {
        console.log('this in resolver', shiftId);
        const deletedShift = await Shift.findByIdAndDelete(shiftId);
        if (!deletedShift) {
          throw new Error('Shift not found');
        }
        return deletedShift;
      }
      catch (error) {
        console.error('Error deleting shift:', error);
        throw new Error('Failed to delete shift');
      }
    },
  },
};

export default resolvers;