# LeetCode Premium

A modern, full-stack coding interview practice platform built with Next.js, TypeScript, and Tailwind CSS. Practice with real interview questions from top tech companies in a beautiful, responsive interface.

## Features

- 🎯 **Real Interview Questions** - Practice with actual questions from Google, Amazon, Microsoft, Apple, Facebook, and more
- 💻 **Integrated Code Editor** - Monaco Editor with syntax highlighting and IntelliSense
- 🏢 **Company-Specific Problems** - Filter problems by specific companies
- 📊 **Progress Tracking** - Track your solving progress and statistics
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light themes
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 📱 **Mobile Responsive** - Works perfectly on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Code Editor**: Monaco Editor (VS Code editor)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd leetcode-premium
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── problems/          # Problems pages
│   ├── companies/         # Company pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── problems/         # Problem-specific components
└── lib/                  # Utilities and data
    ├── problems.ts       # Problem database
    └── utils.ts          # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Problem Database
- 10+ carefully curated problems from top tech companies
- Problems categorized by difficulty (Easy, Medium, Hard)
- Company-specific problem filtering
- Detailed problem descriptions with examples and constraints

### Code Editor
- Monaco Editor integration with JavaScript support
- Syntax highlighting and IntelliSense
- Test case execution (simulated)
- Code reset functionality

### Company Filtering
- Browse problems by specific companies
- Company statistics and problem counts
- Difficulty distribution per company

### Responsive Design
- Mobile-first approach
- Beautiful gradient designs
- Smooth animations and transitions
- Accessible components

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

The `vercel.json` file includes optimized settings for Next.js deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Problems inspired by LeetCode and other coding interview platforms
- UI components built with Radix UI
- Icons from Lucide React
- Code editor powered by Monaco Editor