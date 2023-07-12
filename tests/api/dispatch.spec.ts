

import { getEmailContent } from "@/pages/api/dispatch"


test('the getEmailContent function returns content with the greeting, outro, body and subject correctly replaced', async () => {
 // arrange
  const greeting = "Hello"
  const body = "This is the body"
  const outro = "Bye"
  const watchLink = "https://example.com"

  //act
  const content = await getEmailContent({
    greeting,
    body,
    outro,
    watchLink,
  })
  
  // assert
  expect(content).toContain(greeting)
  expect(content).toContain(body)
  expect(content).toContain(outro)
  expect(content).toContain(watchLink)
})
