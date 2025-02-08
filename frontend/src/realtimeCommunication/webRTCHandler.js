import store from '../store/store';
import { setLocalStream } from '../store/actions/roomActions';
import Peer from 'simple-peer';
import * as socketConnection from './socketConnection';

const getConfiguration = () => {
    const turnIceServers = null;
    if (turnIceServers) {
        // TODO
    } else {
        console.log('Using only STUN server.');
        return {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                },
            ],
        };
    };
};

const onlyAudioConstraints = {
    audio: true,
    video: false,
}

const defaultConstraints = {
    video: true,
    audio: true,
}

export const getLocalStreamPeview = (onlyAudio = false, callbackFunc) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        store.dispatch(setLocalStream(stream));
        callbackFunc();
    }).catch(err => {
        console.log(err);
        console.log('Cannot get an access to local stream.');
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const localStream = store.getState().room.localStream;

    if (isInitiator) {
        console.log('Prep new peer connection as initiator');
    }
    else {
        console.log('prep new peer con as not initiator');
    }

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        stream: localStream,
    });

    peers[connUserSocketId].on('signal', data => {
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId,
        };

        socketConnection.signalPeerData(signalData);
    });

    peers[connUserSocketId].on('stream', (remoteStream) => {
        console.log('remote stream came from other user');
        console.log('direct conn has been establshed');
    });
};

export const handleSignalingData = (data) => {
    const { connUserSocketId, signal } = data;

    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
};