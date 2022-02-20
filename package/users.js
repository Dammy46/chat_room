const users =[] //empty array of the users


function userJoin(ID, username, room) {
   const user = {ID, username, room} // create user
   users.push(user) // push the created user to the empty users array

   return user;
}

//Get the current user
function getCurrentUser(ID) {
  return users.find(user => user.ID === ID) //find the current user in the array using the ID that is passed in
}


//when user leaves

function userLeave(ID) {
   const num = users.findIndex(user => user.ID === ID)

   if (num !== -1) {
      return users.splice(num, 1)[0];
   }
}

//Get the user's room
function getUserRoom(room) {
   return users.filter(user => user.room === room)
}

module.exports = {
   userJoin,
   getCurrentUser,
   userLeave,
   getUserRoom
};
