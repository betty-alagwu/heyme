# Heyme Efficiency Analysis Report

This report documents several efficiency improvements that could be made to the Heyme codebase.

## Issue 1: Inefficient Array Spread in Media Recording (pages/recording.tsx:147)

**Location:** `pages/recording.tsx`, line 147

**Current Code:**
```typescript
mediaChunks.current = [...mediaChunks.current, event.data]
```

**Problem:** During video recording, the `dataavailable` event fires frequently (potentially hundreds of times for a 5-minute recording). Each time, this code creates a brand new array by spreading all existing elements plus the new chunk. This has O(n) time complexity for each addition, resulting in O(n^2) overall complexity for n chunks.

**Recommended Fix:** Use `push()` which has O(1) amortized time complexity:
```typescript
mediaChunks.current.push(event.data)
```

**Impact:** High - This affects the core recording functionality and can cause performance degradation during longer recordings.

---

## Issue 2: Synchronous File Read in API Handler (pages/api/dispatch.ts:11-13)

**Location:** `pages/api/dispatch.ts`, lines 11-13

**Current Code:**
```typescript
let emailContent = Fs.readFileSync(
  Path.resolve("public", "mails", "email.html")
).toString()
```

**Problem:** `readFileSync` blocks the Node.js event loop while reading the file. In a serverless/API context, this prevents the server from handling other requests during the file read operation.

**Recommended Fix:** Use async file reading or cache the template:
```typescript
let emailContent = await Fs.promises.readFile(
  Path.resolve("public", "mails", "email.html"),
  'utf-8'
)
```

**Impact:** Medium - Affects API response times and server throughput.

---

## Issue 3: Sequential Email Sending (pages/api/dispatch.ts:53-91)

**Location:** `pages/api/dispatch.ts`, lines 53-91

**Current Code:**
```typescript
for (let index = 0; index < videos.length; index++) {
  const video = videos[index]
  // ... await client.sendMail(...) ...
  await updateVideoToSent(knex, video.id)
}
```

**Problem:** Emails are sent sequentially, one at a time. If there are 100 videos to process, each taking 500ms, the total time would be 50 seconds.

**Recommended Fix:** Use `Promise.all` with batching for parallel processing:
```typescript
await Promise.all(videos.map(async (video) => {
  if (video.sent === 1) return
  await client.sendMail(...)
  await updateVideoToSent(knex, video.id)
}))
```

**Impact:** High - Can significantly reduce API execution time when processing multiple videos.

---

## Issue 4: Unmemoized Filter Operations (pages/recording.tsx:221-226)

**Location:** `pages/recording.tsx`, lines 221-226

**Current Code:**
```typescript
const cameras = devices.filter(device => device.kind === 'videoinput')
const microphones = devices.filter(device => device.kind === 'audioinput')

const defaultCamera = cameras.find(camera => camera.label.toLowerCase().match(/built-in/) || camera.label.toLowerCase().match(/default/)) || cameras[0]
const defaultMicrophone = microphones.find(mic => mic.label.toLowerCase().match(/built-in/) || mic.label.toLowerCase().match(/default/)) || microphones[0]
```

**Problem:** These filter and find operations run on every component render, even when `devices` hasn't changed.

**Recommended Fix:** Wrap in `useMemo`:
```typescript
const cameras = useMemo(() => devices.filter(device => device.kind === 'videoinput'), [devices])
const microphones = useMemo(() => devices.filter(device => device.kind === 'audioinput'), [devices])
```

**Impact:** Low-Medium - Causes unnecessary computation on each render.

---

## Issue 5: Unnecessary Array Wrapper (components/testimonials.tsx:67)

**Location:** `components/testimonials.tsx`, line 67

**Current Code:**
```typescript
{[testimonials.map(testimonial => (
  <Testimonial testimonial={testimonial} key={testimonial.username} />
))]}
```

**Problem:** The `map()` result is wrapped in an extra array `[...]` which creates an unnecessary array allocation.

**Recommended Fix:** Remove the extra array wrapper:
```typescript
{testimonials.map(testimonial => (
  <Testimonial testimonial={testimonial} key={testimonial.username} />
))}
```

**Impact:** Low - Minor memory allocation overhead.

---

## Issue 6: Unused State Variable (pages/recording.tsx:38)

**Location:** `pages/recording.tsx`, line 38

**Current Code:**
```typescript
const [uploadVideo, setUploadVideo] = useState<File | null>(null)
```

**Problem:** This state variable is declared but never used. The component uses `uploadedVideo` instead (line 49). This creates unnecessary memory allocation and potential confusion.

**Recommended Fix:** Remove the unused state declaration.

**Impact:** Low - Minor memory overhead and code clarity.

---

## Issue 7: Database Connection Per Request (pages/watch/[id].tsx:59)

**Location:** `pages/watch/[id].tsx`, line 59

**Current Code:**
```typescript
const connection = createMysqlConnection()
```

**Problem:** A new database connection is created for every page request. Database connections are expensive to establish and should be pooled.

**Recommended Fix:** Implement connection pooling or use a singleton pattern for the database connection.

**Impact:** Medium-High - Affects page load times and database server load.

---

## Summary

| Issue | Location | Impact | Complexity to Fix |
|-------|----------|--------|-------------------|
| Array Spread in Recording | recording.tsx:147 | High | Low |
| Sync File Read | dispatch.ts:11-13 | Medium | Low |
| Sequential Email Sending | dispatch.ts:53-91 | High | Medium |
| Unmemoized Filters | recording.tsx:221-226 | Low-Medium | Low |
| Unnecessary Array Wrapper | testimonials.tsx:67 | Low | Low |
| Unused State Variable | recording.tsx:38 | Low | Low |
| DB Connection Per Request | watch/[id].tsx:59 | Medium-High | Medium |

## Recommendation

The highest impact, lowest complexity fix is **Issue 1: Inefficient Array Spread in Media Recording**. This PR addresses this issue.
