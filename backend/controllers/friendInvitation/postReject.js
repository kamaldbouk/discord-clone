const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../SocketHandlers/updates/friends');

const postReject = async (req, res) => {
    try {
        const { id } = req.body;
        const { userId } = req.user;

        //remove invitation from from invitation collections:
        const invitationExists = await FriendInvitation.exists({ _id: id })

        if (invitationExists) {
            await FriendInvitation.findByIdAndDelete(id);
        }
        
        //update list of pending invitations
        friendsUpdates.updateFriendsPendingInvitations(userId);
        
        return res.status(200).send('Invitation successfully rejected.');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong...")
    }

};


module.exports = postReject;