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
      { location, startTime, endTime, day, status, employee, notes }: 
      { location: string; startTime: string; endTime: string; day: string; status: string; employee: string; notes?: string }) => {

      try {
        const newShift = await Shift.create({ location, startTime, endTime, day, status, employee, notes });
        await newShift.save();
        return newShift;
      } 
      catch (error) {
        console.error('Error creating shift:', error);
        throw new Error('Failed to create shift');
      }
    },
  },
};

export default resolvers;