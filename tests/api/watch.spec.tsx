import React from 'react'
import dayjs from 'dayjs'
import { fetchVideoById, createMysqlConnection } from '@/utils/server'
import  {GetServerSidePropsContext}  from 'next'
import WatchVideo, { WatchVideoProps, getServerSideProps } from '@/pages/watch/[id]'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


jest.mock('@/utils/server', () => ({
  fetchVideoById: jest.fn(),
  createMysqlConnection: jest.fn(),
  os: 'iOS',
}))
const createMysqlConnectionMock = createMysqlConnection as jest.Mock
const fetchVideoByIdMock = fetchVideoById as jest.Mock

describe('WatchVideo', () => {
  const mockVideo: WatchVideoProps['video'] = {
    id: 1,
    video_url: 'https://example.com/video',
    created_at: '2023-05-11',
    send_at: '2023-05-11',
  }

  beforeEach(() => {
    fetchVideoByIdMock.mockReset()
    createMysqlConnectionMock.mockReset()
  })

  test('renders the video', () => {
    const { container } = render(<WatchVideo video={mockVideo} />)
  
    expect(container).toHaveTextContent(mockVideo.video_url)
    expect(container).toHaveTextContent(mockVideo.created_at)
  })

 
  const FAKE_VIDEO_ID = 5

  test('returns the video data from getServerSideProps', async () => {
    createMysqlConnectionMock.mockReturnValue({})
    fetchVideoByIdMock.mockResolvedValue(mockVideo)

    const context = {
       params: {
        id: FAKE_VIDEO_ID
       }
      } as unknown as GetServerSidePropsContext

    const result = await getServerSideProps(context)

    expect(fetchVideoById).toHaveBeenCalledWith({}, FAKE_VIDEO_ID)
    expect(result).toEqual({
      props: {
        video: {
          id: mockVideo.id,
          video_url: mockVideo.video_url,
          created_at: dayjs(mockVideo.created_at).format('MMM D, YYYY'),
        },
      },
    })
  })

  test('returns notFound: true if video is not found from getServerSideProps', async () => {
    createMysqlConnectionMock.mockReturnValue({})
    fetchVideoByIdMock.mockResolvedValue(null)

    const context = {
      params: { id: FAKE_VIDEO_ID },
    } as unknown as GetServerSidePropsContext

    const result = await getServerSideProps(context)

    expect(fetchVideoById).toHaveBeenCalledWith({}, FAKE_VIDEO_ID)
    expect(result).toEqual({ notFound: true })
  })
})


