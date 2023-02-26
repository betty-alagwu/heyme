import { fetchVideoById } from "@/utils/server";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { createMysqlConnection } from "@/utils/server";
import { Layout } from "@/components/layout";

export interface WatchVideoProps {
    video: {
        id: number
        video_url: string
    }
}

export default function WatchVideo({ video }: WatchVideoProps) {
    return (
        <Layout>
            <section className="">
                <div className="flex items-center justify-center mt-8">
                    <video src={video.video_url} controls>

                    </video>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({ req, res, params }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{
    video: {
        id: number
        video_url: string
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
                video_url: video.video_url
            }
        }
    }
}
