<div align="center">
<h1>Heyme</h1>
<h6><i>Send messages to your future self</i></h6>
<hr />
</div>

[Heyme](https://heyme.io) offers a unique opportunity for individuals to connect with their future selves by sending messages that serve as a powerful source of motivation and a poignant reminder of their journey.
</br>
</br>
Whether aspiring towards personal or professional goals, this project allows individuals to envision their desired future and set a tangible reminder of their progress thus far.
</br>
</br>
By engaging in this introspective exercise, individuals can cultivate a deeper understanding of their values, priorities, and aspirations, ultimately leading to enhanced self-awareness and personal growth.

![screenshot](https://res.cloudinary.com/dq5e0bbl8/image/upload/v1678282734/Screenshot_2023-03-08_at_14.38.05_srmw0p.png)

## Feature list

- Dark mode with `next-themes`
- Message scheduling: This project could allow users to schedule messages to be delivered to their future selves at a specific time and date,
- Customization options: Users could have the ability to customize their messages by sending to themselves directly or to someone else
- Time capsules: This project could offer the option to create time capsules, which allow users to send messages to their future selves to be delivered at a specific point in the future, such as 5, 10, or 20 years from now.
- Social sharing: This project could be shared with other platforms, such as social media or productivity apps, to help users stay connected to their goals and motivations.

## General setup

1. Prerequisites

   On all platforms:

   - Install Node version 16.4.0
   - Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install)

2. Clone the repo

   ```
   git clone <your fork>
   ```

3. Set up environment variables

   ```
   cp .env.example .env.local
   ```

   Update env variables with your environment viariables

4. Run the development server:

   ```
   yarn dev
   ```

## Architecture

The application uses a number of services:

1. MySQL for data storage
2. Zeptomail for transactional emails
3. Web media API
4. Web Media Recorder API

Here's an overview of the application architecture:

![heyme architecture diagram](https://res.cloudinary.com/dq5e0bbl8/image/upload/v1678432640/websites-production/heyme-diagram_zn06de.png)
