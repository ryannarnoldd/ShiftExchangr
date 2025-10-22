import Shift  from "../models/Shift.js";

const resolvers = {
  // Query: {

  //   me: async (_parent: any, _args: any, context: any) => {
      
  //     if (context.user && context.user._id) {
  //       const user = await User.findById(context.user._id).populate({ path: 'shifts', populate: { path: 'shifts' } }).exec();
  //       return user;
  //     }
  //     throw new AuthenticationError('User! not authenticated3');
  //   },  
  // },

  Mutation: {

    addShift: async (_parent: any, { name, time, location }: { name: string, time: string; location: string}) => {
      const shift = new Shift({
        name,
        time,
        location,
      });

      await shift.save();
      
      return shift;
    }
    

    // deleteShift: async (
    //   _parent: any,
    //   { collectionId, ShiftId }: { collectionId: string; ShiftId: string },
    //   context: any
    // ) => {
    //   console.log('Incoming deleteShift request:', { collectionId, ShiftId });
    
    //   if (!context.user) {
    //     throw new AuthenticationError('User not authenticated');
    //   }
    
    //   if (!collectionId || !ShiftId) {
    //     throw new Error('collectionId and ShiftId are required');
    //   }
    
    //   const updatedCollection = await Collection.findByIdAndUpdate(
    //     String(collectionId), // Ensure it's a string
    //     { $pull: { Shifts: String(ShiftId) } }, // Ensure ShiftId is a string
    //     { new: true }
    //   );
    
    //   if (!updatedCollection) {
    //     throw new Error('Collection not found');
    //   }
    
    //   console.log('Updated Collection after deleteShift:', updatedCollection);
    
    //   return updatedCollection; // ✅ Ensure the return type matches your GraphQL schema
    // }

  },
};

export default resolvers;