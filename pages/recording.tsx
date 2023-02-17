import Head from "next/head"
import Link from "next/link"
import Axios from 'axios'
import { detect as detectBrowser, detectOS, BrowserInfo } from 'detect-browser'
import React, { useState, useEffect, useRef, useMemo, MouseEventHandler, MutableRefObject } from 'react'
import { BsExclamationTriangleFill, BsRecordCircle } from "react-icons/bs";
import { ImStop } from "react-icons/im";

import { IoIosRadioButtonOn } from "react-icons/io";
// import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress";
import Success from "./success"

const defaultIntervalTimer = 3000
const defaultCounterTimer = 4

const Recording = () => {
    // 1. access user camera and microphone using getUserMedia()
    // 2. If user grants access to camera and micrphone, create media recorder
    // 3. if not access, show a message asking user for permissions
    // 4. if media recorder is created, register the event listeners for data available and media recording stopped.
    // 5. when data available, store the chunks
    // 6. when data stopped, show video player.
    // 7. when STart button is clicked, start media recorder. 
    const mediaRecorder = useRef<MediaRecorder>()
    const mediaChunks = useRef<Blob[]>([])
    const [isRecording, setIsRecording] = useState(false)
    const [isStopped, setIsStopped] = useState(false)
    const [timer, setTimer] = useState(defaultCounterTimer)
    const videoPlayer = useRef<HTMLVideoElement>()
    const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null)
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
    const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(null)
    const [hasPermissionIssues, setHasPermissionIssues] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(600);
    const [uploadVideo, setUploadVideo] = useState<File | null>(null)
    const [videoSrc, setVideoSrc] = useState('')
    const videoRef = useRef<HTMLInputElement>()
    const [selectedOption, setSelectedOption] = useState('Yourself')
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [deliverIn, setDeliverIn] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [complete, setComplete] = useState(false)
    const [browser, setBrowser] = useState<ReturnType<typeof detectBrowser> | null>(null);
    const [isUsingFileUpload, setIsUsingFileUpload] = useState(false)
    const uploadVideoInputRef = useRef() as MutableRefObject<HTMLInputElement>
    const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
    const [dateError, setDateError] = useState('')
    const [isWebRTCSupported, setIsWebRTCSupported] = useState(true);


    const uploadedVideoUrl = useMemo(function () {
        return uploadedVideo ? URL.createObjectURL(uploadedVideo) : null
    }, [uploadedVideo])



    async function uploadVideoToCloudinary(file: Blob | File) {
        const form = new FormData()
        const preset = 'dfoz5xyo'

        form.append('upload_preset', preset)
        form.append('file', file)
        form.append('cloud_name', 'dq5e0bbl8')


        try {
            const response = await Axios.post('https://api.cloudinary.com/v1_1/dq5e0bbl8/upload', form, {
                onUploadProgress(event) {
                    setUploadProgress(event.progress)
                }
            })
            console.log(response)
            return response

        } catch (error) {
            setUploadProgress(0)
            console.log(error)
        }
    }

    async function uploadUploadedVideo() {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            setError('Email required');
        } else {
            setError('')
        }
        if (!deliverIn) {
            setDateError('Date required');
        } else if (new Date(deliverIn) < new Date()) {
            setDateError('Delivery date must be in the future');
        } else {
            setDateError('')
        }

        if (!error && !dateError) {
            setIsUploading(true)
            try {
                await uploadVideoToCloudinary(uploadedVideo)
                setComplete(true)
                window.location.href = '/success';
            } catch (error) {
                console.log(error)
            }
        }
        setIsUploading(false)
    }

    async function uploadRecordedVideo() {
        const blob = new Blob(mediaChunks.current)

        setIsUploading(true)

        try {
            await uploadVideoToCloudinary(blob)

            setComplete(true)
        } catch (error) {

        }

        setIsUploading(false)
    }


    function stopRecording() {
        setIsStopped(true)
        setIsRecording(false)
        mediaRecorder.current.stop()
    }

    function startRecording() {
        setTimer(currentTimer => currentTimer - 1)

        const interval = setInterval(function () {
            setTimer(currentTimer => currentTimer === 0 ? 0 : currentTimer - 1)
        }, 1000) // every second.
        setTimeout(function () {
            clearInterval(interval)
            setIsRecording(true)
            mediaRecorder.current.start()
        }, defaultIntervalTimer)
    }

    function registerRecorderEventListeners(recorder: MediaRecorder) {
        recorder.addEventListener('dataavailable', function (event) {
            console.log('@recorder.dataavailable', event)
            if (event.data.size > 0) {
                mediaChunks.current = [...mediaChunks.current, event.data]
            }
        })

        recorder.addEventListener('stop', function (event) {
            // trigger upload to server.

            setVideoBlobUrl(
                URL.createObjectURL(
                    new Blob(mediaChunks.current)
                )
            )
        })

        recorder.addEventListener('start', function (event) {
            console.log('@recorder.start', event)
        })
    }

    async function enumerateDevices() {
        const enumeratedDevices = await navigator.mediaDevices.enumerateDevices()

        setDevices(enumeratedDevices)
    }

    async function getDevicePermissions() {
        const [cameraPermissions, microphonePermissions] = await Promise.all([
            // @ts-ignore
            navigator.permissions.query({ name: 'camera' }),
            // @ts-ignore
            navigator.permissions.query({ name: 'microphone' })
        ])

        if (cameraPermissions.state === 'denied' || microphonePermissions.state === 'denied') {
            setHasPermissionIssues(true)

            return true
        }

        return false
    }

    async function accessUserDevices(cameraDeviceId?: string, microphoneDeviceId?: string) {
        const hasIssues = await getDevicePermissions()

        const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: microphoneDeviceId ? {
                deviceId: microphoneDeviceId
            } : true,
            video: cameraDeviceId ? {
                deviceId: cameraDeviceId
            } : true,
        })

        videoPlayer.current.srcObject = mediaStream



        // user granted access.
        const recorder = new MediaRecorder(mediaStream)

        // register recorder event listeners.
        registerRecorderEventListeners(recorder)

        mediaRecorder.current = recorder

        await enumerateDevices()
    }

    useEffect(function () {
        accessUserDevices(selectedCamera, selectedMicrophone)
            .catch(() => {
                setHasPermissionIssues(true)
            })
    }, [selectedCamera, selectedMicrophone])

    const cameras = devices.filter(device => device.kind === 'videoinput')
    const microphones = devices.filter(device => device.kind === 'audioinput')


    const defaultCamera = cameras.find(camera => camera.label.toLowerCase().match(/built-in/) || camera.label.toLowerCase().match(/default/)) || cameras[0]
    const defaultMicrophone = microphones.find(mic => mic.label.toLowerCase().match(/built-in/) || mic.label.toLowerCase().match(/default/)) || microphones[0]

    const minutes = Math.floor(timeElapsed / 60)
    const seconds = timeElapsed % 60


    useEffect(() => {
        let interval = null

        if (isRecording) {
            interval = setInterval(() => {
                setTimeElapsed(timeElapsed - 1)
                if (timeElapsed === 0) {
                    setIsStopped(true)
                }
            }, 1000)
        }
        return () => clearInterval(interval);

    }), [isRecording, timeElapsed]




    useEffect(() => {
        const src = URL.createObjectURL(new Blob([uploadVideo], { type: 'video/mp4' }))
        setVideoSrc(src)
    }, [uploadVideo])


    const handleSelect = (option: string) => {
        setSelectedOption(option)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
        setError('')
    }

    const handleBlur = () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            setError('Email required');
        } else {
            setError('')
        }
    };


    const handleDeliverInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliverIn(event.target.value);
    }




    const handleUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const data = {
            selectedOption,
            email,
            deliverIn,
        };
        // send data to server
        console.log(data)
    };

    useEffect(() => {
        async function checkWebRTCSupport() {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                setIsWebRTCSupported(true);
            } catch (error) {
                setIsWebRTCSupported(false);
            }
        }

        checkWebRTCSupport();
    }, []);



    useEffect(() => {
        if (typeof document === 'undefined') {
            return
        }
        setBrowser(detectBrowser())
    }, []);

    if (complete) {
        return (
            <Success />
        )
    }



    return (
        <Layout>
            <section className="container justify-center text-center items-center pt-5  md:pb-7  max-w-md border-slate-100 bg-white dark:bg-slate-800 dark:border-slate-800 shadow-md my-5 rounded-xl  pb-6">

                {isWebRTCSupported ? null : (
                    <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Warning!</strong>
                        <span className="block sm:inline"> Your device may not be fully compatible with WebRTC, so you might experience some issues when recording. Please consider uploading a video instead.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setIsWebRTCSupported(true)}>
                            <svg className="fill-current h-6 w-6 text-yellow-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 6.066 4.652a1 1 0 00-1.414 1.414L8.586 10l-3.934 3.934a1 1 0 101.414 1.414L10 11.414l3.934 3.934a1 1 0 001.414-1.414L11.414 10l3.934-3.934a1 1 0 000-1.414z" /></svg>
                        </span>
                    </div>
                )}
                {(isStopped || isUsingFileUpload) ? null : (
                    <div className="rounded-2xl w-full mb-6 relative">
                        <video className="w-full aspect-video rounded-2xl relative bg-black" ref={videoPlayer} autoPlay muted style={{ width: '800px', height: '298px' }}>
                        </video>
                        {hasPermissionIssues ? <BsExclamationTriangleFill className="w-10 h-10 absolute top-[45%] left-[45%] fill-current text-white" /> : null}
                        {hasPermissionIssues ? null : <div className="absolute top-6 right-6 font-semibold text-red-500 flex  items-center ">
                            <IoIosRadioButtonOn className="mr-2" />    {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                        </div>}

                        {isRecording ? (
                            <button className="absolute inset-0 top-[10%] left-[47%] " onClick={stopRecording}>
                                <ImStop
                                    className="text-red-500 "
                                    style={{
                                        fontSize: '30px'
                                    }} />
                            </button>
                        ) : null}
                    </div>
                )}
                {isUsingFileUpload ? (
                    <>

                        {uploadedVideoUrl ? (
                            <video src={uploadedVideoUrl} controls className="w-full aspect-video rounded-2xl relative bg-black">
                            </video>
                        ) : (
                            <button onClick={function () {
                                uploadVideoInputRef.current.click()
                            }} className="flex items-center justify-center w-full rounded-2xl relative bg-black" style={{ height: '298px' }}>
                                <span className="font-semibold text-white ">
                                    Click to upload a video
                                </span>
                            </button>
                        )}
                    </>
                ) : null}
                <input
                    accept="video/*, .mkv"
                    className="hidden"
                    type="file"
                    ref={uploadVideoInputRef}
                    onChange={function (event) {
                        const video = event.target.files[0];
                        const videoElement = document.createElement('video');
                        videoElement.src = URL.createObjectURL(video);

                        videoElement.addEventListener('loadedmetadata', function () {
                            // Check if video duration is less than or equal to 10 minutes (600 seconds)
                            const videoDuration = videoElement.duration || 0;
                            if (videoDuration <= 600) {
                                setUploadedVideo(video);
                            } else {
                                console.log('video is more than 10 minutes')
                            }
                        });
                    }}
                />
                {hasPermissionIssues && !isUsingFileUpload ? (
                    <>
                        <h1 className="font-normal text-red-500 text-center text-lg">Please check your camera & microphone </h1>
                        <p className=" font-normal dark:text-white text-center pt-10">Oops! It looks like we don&lsquo;t have access to your camera and microphone.
                            To use this feature, please grant access in your browser settings.</p>
                    </>
                ) : null}
                {!hasPermissionIssues && !isUsingFileUpload && (
                    <>
                        {isRecording ? null : (
                            <>
                                {isStopped ? null : (
                                    <p className="text-sm mb-6">
                                        You will have 10 minutes to record a message. After 10 minutes the video will automatically stop.
                                    </p>
                                )}
                            </>
                        )}
                        {!isStopped && !isRecording ? (
                            <>
                                <div className="text-start font-medium text-sm pb-2">
                                    <label htmlFor="camera">Camera</label>
                                </div>
                                <Select onValueChange={deviceId => setSelectedCamera(deviceId)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={defaultCamera?.label} defaultValue={defaultCamera?.deviceId} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cameras.map(camera => (
                                            <SelectItem key={camera.deviceId} value={camera.deviceId}>
                                                {camera.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="text-start font-medium text-sm pt-4 pb-2">
                                    <label htmlFor="Microphone">Microphone</label>
                                </div>

                                <Select onValueChange={deviceId => setSelectedMicrophone(deviceId)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={defaultMicrophone?.label} defaultValue={defaultMicrophone?.deviceId} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {microphones.map(mic => (
                                            <SelectItem key={mic.deviceId} value={mic.deviceId}>
                                                {mic.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </>
                        ) : null}


                    </>
                )}



                {isStopped && videoBlobUrl ? (
                    <div className="w-full rounded-2xl">
                        <video className="w-full aspect-video rounded-2xl relative" controls src={videoBlobUrl} style={{ width: '800px', height: '298px' }}>
                        </video>
                    </div>
                ) : null}
                {(isStopped || isUsingFileUpload) ? (
                    <>
                        <div className="font-bold text-lg pt-5">Send your recording to the future</div>
                        <div className="text-start pt-4 pb-2">
                            <label htmlFor="sending-to">Sending to</label>
                        </div>
                        <div className="flex flex-start space-x-4">
                            <button
                                className={`inline-flex items-center rounded-full bg-slate-700 px-2.5 py-1 text-xs font-semibold text-white transition-colors 
                                ${selectedOption === "Yourself" ? "bg-white  text-black !important" : ""}`}
                                onClick={() => handleSelect('Yourself')}>
                                Yourself
                            </button>

                            <button
                                className={`inline-flex items-center rounded-full bg-slate-700 px-2.5 py-1 text-xs font-semibold text-white transition-colors 
                                ${selectedOption === "Someone else" ? "bg-white text-black" : ""}`}
                                onClick={() => handleSelect('Someone else')}>
                                Someone else
                            </button>
                        </div>


                        <div className="text-start pt-4 pb-2">
                            <label htmlFor="email">Email</label>
                        </div>
                        <Input type="email"
                            placeholder="Email"
                            className={error ? 'dark:placeholder:text-slate-300 placeholder:text-gray-700 border-red-500 dark:border-red-500' : 'dark:placeholder:text-white placeholder:text-gray-700'}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        {error && <div className="text-start pt-1 text-sm text-red-500">{error}</div>}

                        <div className="text-start pt-4 pb-2">
                            <label htmlFor="deliver-in">Deliver in</label>
                        </div>
                        <Input type="date"
                            className={dateError ? 'border-red-500 dark:border-red-500' : null}
                            onChange={handleDeliverInChange} />
                        {dateError && <div className="text-start pt-1 text-sm text-red-500">{dateError}</div>}
                    </>
                ) : (
                    <>
                        {isRecording || isUsingFileUpload ? null : (
                            <>
                                {timer < (defaultCounterTimer) ? (
                                    <>
                                        <h1 className="font-bold  top-10 mt-8 ">Starting in {timer}</h1>
                                    </>
                                ) : (
                                    <>
                                        {hasPermissionIssues ? null : <Button className="mt-8 w-full dark:hover:text-slate-100 dark:hover:bg-slate-700" onClick={startRecording} size='lg'>
                                            Start recording
                                        </Button>}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                {(isStopped || isUsingFileUpload) && !isUploading ? <Button className={`mt-10 w-full dark:hover:text-slate-100 dark:hover:bg-slate-700`}

                    onClick={function () {
                        if (isUsingFileUpload) {
                            uploadUploadedVideo()
                        } else {
                            uploadRecordedVideo()
                        }
                    }}
                    disabled={!email || !deliverIn}
                >Upload</Button> : null}
                {isUploading ? <Progress className="mt-10" value={uploadProgress * 100} /> : null}

                {isUsingFileUpload ? (
                    <p className="text-sm mt-4">Can&apos;t upload a video? <button onClick={function () {
                        if (isUploading) {
                            return
                        }
                        if (isRecording) {
                            stopRecording();
                        }
                        setIsUsingFileUpload(true)
                        uploadVideoInputRef.current.click();
                    }} className="underline">Record one instead</button>.</p>
                ) : (
                    <p className="text-sm mt-4">Have issues with your recording? <button onClick={function () {
                        setIsUsingFileUpload(true)
                        uploadVideoInputRef.current.click()
                    }} className="underline">Please upload a video instead</button>.</p>
                )}
            </section>
        </Layout >
    )
}

export default Recording


