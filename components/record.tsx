import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';






const TestingVideoComponent = (props) => {


    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;

    React.useEffect(() => {

        if (typeof document === 'undefined') {
            return
        }

        console.log({ playerRef })

        if (!playerRef.current) {
            const videoElement = document.createElement('video-js');

            console.log(videoRef)
            videoElement.className = 'video-js vjs-default-skin';
            videoRef.current.appendChild(videoElement);

            const player = videojs(videoElement, options, () => {
                const version_info = 'Using video.js ' + videojs.VERSION +
                    ' with videojs-record ' + videojs.getPluginVersion('record') +
                    ', recordrtc ' + 'and React' + React.version

                // + RecordRTC.version + ' and React ' + React.version;
                videojs.log(version_info);

                console.log({ version_info })
            })
            console.log('@@@executed here.', player)

            // const player = playerRef.current = videojs(videoElement, options, () => {
            //     // print version information at startup
            // const version_info = 'Using video.js ' + videojs.VERSION +
            //     ' with videojs-record ' + videojs.getPluginVersion('record') +
            //     ', recordrtc ' + RecordRTC.version + ' and React ' + React.version;
            // videojs.log(version_info);

            //     onReady && onReady(player)
            // })
        }

        // Make sure Video.js player is only initialized once
        // if (!playerRef.current) {
        //     // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
        //     const videoElement = document.createElement('video-js');

        //     videoElement.className = 'video-js vjs-default-skin';
        //     videoRef.current.appendChild(videoElement);

        // const player = playerRef.current = videojs(videoElement, options, () => {
        //     // print version information at startup
        //     const version_info = 'Using video.js ' + videojs.VERSION +
        //         ' with videojs-record ' + videojs.getPluginVersion('record') +
        //         ', recordrtc ' + RecordRTC.version + ' and React ' + React.version;
        //     videojs.log(version_info);

        //     onReady && onReady(player)
        // })

        //     // You could update an existing player in the `else` block here
        //     // on prop change
        // } else {
        //     const player = playerRef.current;
        //     player.record().getDevice();
        // }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    // React.useEffect(() => {
    //     const player = playerRef.current;

    //     return () => {
    //         if (player && !player.isDisposed()) {
    //             player.dispose();
    //             playerRef.current = null;
    //         }
    //     };
    // }, [playerRef]);

    console.log(RecordRTC)


    return (
        <>
            <div data-vjs-player>
                <div ref={videoRef} />
            </div>
        </>
    )
}

export default TestingVideoComponent