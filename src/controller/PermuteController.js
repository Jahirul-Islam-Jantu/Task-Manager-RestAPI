import generatePermutations from "../utility/Permutation.js";

export const PermuteController = async (req, res) => {
   try{
       const str = req.params.str; // Get 'str' from the route parameter
       const result = generatePermutations(str);
       res.json({ message: result });
   }catch(err){
       res.json({status: "error", error: err});
   }
};
