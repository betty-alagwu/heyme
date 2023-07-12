import { NextApiRequest, NextApiResponse } from 'next'
import handleStoreVideo from "@/pages/api/store"

const mockRequest = {
  body: {
    video_url: 'https://example.com',
    email: '',
    send_at: '',
    send_to: '',
    created_at: '',
  },
} as NextApiRequest


const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as NextApiResponse

test('handleStoreVideo returns a 400 status code when invalid data is provided', async () => {
  await handleStoreVideo(mockRequest, mockResponse)

  expect(mockResponse.status).toHaveBeenCalledWith(400)
  expect(mockResponse.json)
})

