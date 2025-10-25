import Shift from "../models/Shift.js";

const resolvers = {
  Query: {

    query_shifts: async (_parent: any, _args: any) => {
      return Shift.find();
    },  
  },

  Mutation: {
    // make a new collection
    addShift: async (_parent: any, { name, location, timeDay }: { name: string; location: string; timeDay: string }) => {

    
      try {
        const newShift = await Shift.create({
          name,
          location,
          timeDay,
        });

        // add under user.
        await newShift.save();
    
        return newShift;

      } catch (error) {
        console.error('Error creating shift:', error);
        throw new Error('Failed to create shift');
      }
    },
  },
};

export default resolvers;