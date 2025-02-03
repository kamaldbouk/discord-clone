import { useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import MessagesHeader from './MessagesHeader';
import { connect } from 'react-redux';
import DUMMY_MESSAGES from './DUMMY_MESSAGES';
import Message from './Message';

const MainContainer = styled('div')({
    height: 'calc(100%-60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

const Messages = ({ chosenChatDetails, messages}) => {
    return ( 
        <MainContainer>
            <MessagesHeader name={chosenChatDetails?.name}/>
            {DUMMY_MESSAGES.map((messages, index) => {
                return <Message
                    key={messages._id}
                    content={messages.content}
                    username={messages.author.username}
                    sameAuthor={messages.sameAuthor}
                    date={messages.date}
                    sameDay={messages.sameDay}
                />;
            })}
        </MainContainer>
     );
}
 
const mapStoreStateToProps = ({ chat }) => {
    return {
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(Messages);