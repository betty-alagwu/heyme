import dayjs from 'dayjs'
import { fetchVideoById } from "@/utils/server";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createMysqlConnection } from "@/utils/server";
import { Layout } from "@/components/layout";
import { DefaultPlayer as Video } from 'react-html5video'
import NoSSR from 'react-no-ssr'
import 'react-html5video/dist/styles.css'
import Link from "next/link";
import { detect as detectBrowser } from 'detect-browser';

export interface WatchVideoProps {
    video: {
        send_at: string;
        id: number
        video_url: string
        created_at: string;
    }
}

const browser = detectBrowser()

const isIos = browser.os === 'iOS'

export default function WatchVideo({ video }: WatchVideoProps) {
    const isMkv = video.video_url.endsWith('mkv')

    return (
        <Layout>
            <h2 className="text-center mt-10 font-bold text-xl md:text-2xl">{`A message from ${video.created_at}`}</h2>
            <div className="flex flex-col items-center justify-center mt-8 ">
                <NoSSR>
                    {isIos && isMkv ? <p className='text-sm text-red-500 text-center mb-4'>If you video cannot play, please try viewing it from a computer or another non IOS device.</p> : null}
                    <Video controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']} className=' aspect-video'>
                        <source src={video.video_url} />
                    </Video>
                </NoSSR>
                <Link href={"/recording"} className=" sm:max-w-[200px] sm:mr-4 mt-4">
                    <button type="button" className="  items-center justify-center rounded-md text-sm font-medium transition-colors 
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50
             dark:focus:ring-slate-400  dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 bg-slate-900
             text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 h-10 py-2 px-4 mt-5 ">
                        Record a message
                    </button>
                </Link>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{
    video: {
        id: number
        video_url: string
        created_at: string
    }
}>> {
    // establish database connection
    const connection = createMysqlConnection()
    // fetch video from database with the id from url
    const video = (await fetchVideoById(connection, params['id'])) as WatchVideoProps['video']
    // return video as props to component
    if (!video) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            video: {
                id: video.id,
                video_url: video.video_url,
                created_at: dayjs(video.created_at).format('MMM D, YYYY'),
            }
        }
    }
}
