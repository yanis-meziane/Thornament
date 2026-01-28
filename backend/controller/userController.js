// import User from '../models/User.js';

// const getUserById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (!(req.user.id === parseInt(id))) {
//       return res.status(403).json({ message: 'Unauthorized to access this user\'s informations' });
//     }

//     const user = await User.findById(id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.status(200).json(user);
//   } catch (err) {
//     return res.status(500).json({
//       error: err?.message || err,
//       message: 'Error retrieving user'
//     });
//   }
// };

// export default {
//   getUserById
// }