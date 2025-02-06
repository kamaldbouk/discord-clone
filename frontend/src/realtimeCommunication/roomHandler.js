import store from "../store/store"
import { setOpenRoom, setRoomDetails, setActiveRooms } from "../store/actions/roomActions";
import * as socketConnection from './socketConnection';

export const createNewRoom = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
};

export const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
    const { activeRooms } = data;
  
    const friends = store.getState().friends.friends;
    const rooms = [];
  
    const userId = store.getState().auth.userDetails?._id;
  
    activeRooms.forEach((room) => {
      const isRoomCreatedByMe = room.roomCreator.userId === userId;
  
      if (isRoomCreatedByMe) {
        rooms.push({ ...room, creatorUsername: "Me" });
      } else {
        friends.forEach((f) => {
          if (f.id === room.roomCreator.userId) {
            rooms.push({ ...room, creatorUsername: f.username });
          }
        });
      }
    });
  
    store.dispatch(setActiveRooms(rooms));
  };


// export const updateActiveRooms = (data) => {
//     const { activeRooms } = data;


//     const friends = store.getState().friends.friends;
//     const rooms = [];
//     console.log("Friends list:", friends);

//     activeRooms.forEach((room) => {
//        friends.forEach((f) => {
//         if (f.id === room.roomCreator.userId) {
//             console.log('x')
//             rooms.push({ ...room, creatorUsername: f.username});
//         }
//        }); 
//     });

//     console.log("Filtered active rooms before dispatch:", rooms);

//     store.dispatch(setActiveRooms(rooms));
// }