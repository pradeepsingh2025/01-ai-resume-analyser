# AI Resume Analyser

A powerful and modern web application built with Next.js that leverages AI to analyze and rewrite resumes.

## Features
- **AI-Powered Analysis**: Upload your resume to get instant, actionable feedback.
- **Smart Rewrites**: Automatically generate improved versions of your resume tailored to your goals.
- **PDF Generation**: View and download your rewritten resume directly as a fully formatted PDF.
- **Secure Authentication**: User management and authentication powered by Clerk.
- **Modern UI**: Fully responsive with Light/Dark mode support.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: PostgreSQL (via [Supabase](https://supabase.com/)), ORM by [Prisma](https://www.prisma.io/)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/) & Google Generative AI
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: Tailwind CSS, [Shadcn UI](https://ui.shadcn.com/)

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Variables**
   Create a `.env` file based on `.env.example` (if available) and add the necessary API keys for Clerk, Supabase (Prisma Database URL), and Google AI.

3. **Setup Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
