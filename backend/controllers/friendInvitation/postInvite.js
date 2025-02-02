const User = require('../../models/users')
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../SocketHandlers/updates/friends');

const postInvite = async (req, res) => {

    const { targetMailAddress } = req.body;

    const { userId, mail } = req.user;

    // check if friend that we would like to invite is not us
    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res.status(409).send('Sorry. You cannot become friends with yourself.');
    }

    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase(),
    });

    if (!targetUser) {
        return res
        .status(404)
        .send(`Friend of $(targetMailAddress) has not been found. Please check mail address.`);
    }

    // check if invitatiom has been alr sent
    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id
    })

    if (invitationAlreadyReceived) {
        return res.status(409).send('Invitation has already been sent.');
    }

    //check if user which we would like to invite is already our friend
    const usersAlreadyFriends = targetUser.friends.find(friendId => 
        friendId.toString() === userId.toString()
    );

    if (usersAlreadyFriends) {
        return res.status(409).send('Friend already added.')
    }

    //create new invitation in db
    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id,
    });

    //if invitation has been successfully sent/created we want to update friends invitations if other user is online


    //send pending invitations update to specific user
    friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('Invitation has been sent');
};

module.exports = postInvite;