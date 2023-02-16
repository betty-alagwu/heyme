import { Button } from '@/components/ui/button'
import React from 'react'
import { useRef } from 'react'
import TestingVideoComponent from './testingVideoComponent'


const Testing = () => {
    const playerRef = useRef(null);

    const videoJsOptions = {
        controls: true,
        bigPlayButton: false,
        width: 320,
        height: 240,
        fluid: false,

        plugins: {
            record: {
                audio: true,
                video: true,
                maxLength: 10,
                debug: true
            }
        }
    }


    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // handle player events
        // device is ready
        player.on('deviceReady', () => {
            console.log('device is ready!');
        });

        // user clicked the record button and started recording
        player.on('startRecord', () => {
            console.log('started recording!');
        });

        // user completed recording and stream is available
        player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording: ', player.recordedData);
        });

        // error handling
        player.on('error', (element, error) => {
            console.warn(error);
        });

        player.on('deviceError', () => {
            console.error('device error:', player.deviceErrorCode);
        });
    };


    return (
        <>
            <TestingVideoComponent options={videoJsOptions} onReady={handlePlayerReady} />

        </>
    )
}

export default Testing