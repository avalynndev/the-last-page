# The Last Page

**The last page of the internet.** An infinite collaborative canvas where anyone can visit and write anything they want. One page, infinite possibilities. Everyone's text, everyone's stories, all in one place, in real-time.

## Features

- Rich text editing with Lexical
- Open to everyone - no sign-ups required
- See who else is writing in real-time
- Beautiful, modern UI
- Dark/light mode support
- Inline comments and discussions
- User avatars and presence indicators
- Infinite canvas - write anywhere, anytime

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Liveblocks account and API key ([get one here](https://liveblocks.io))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd the-last-page
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

4. Run the development server:
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Editor:** Lexical
- **Collaboration:** Liveblocks
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animation:** Motion

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── plugins/          # Lexical plugins
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
└── actions/          # Server actions
```

<div align="center">
  <a href="https://moonshot.hackclub.com" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/35ad2be8c916670f3e1ac63c1df04d76a4b337d1_moonshot.png" 
         alt="This project is part of Moonshot, a 4-day hackathon in Florida visiting Kennedy Space Center and Universal Studios!" 
         style="width: 100%;">
  </a>
</div>