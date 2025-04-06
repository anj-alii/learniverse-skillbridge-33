
# SkillBridge - Skill Swap Platform

A platform for users to exchange skills and knowledge through 1-on-1 sessions. Users earn credits by teaching skills and spend credits to learn from others.

## Project info

**URL**: https://lovable.dev/projects/db7cb9b9-de8b-4e84-a380-782e32084a65

## Features

- User authentication with Supabase
- Credit system for skill exchanges
- AI-powered profile matching using Google Gemini
- Skill marketplace with filtering
- Session management for instructors and students

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase for backend and authentication
- Google Gemini AI for profile matching

## How to Deploy to Google IDX (Firebase)

This project can be easily deployed to Google IDX (Firebase Hosting). Here's how:

1. **Install Firebase CLI**

```bash
npm install -g firebase-tools
```

2. **Log in to Firebase**

```bash
firebase login
```

3. **Initialize Firebase in your project**

```bash
firebase init
```

Select Firebase Hosting, and follow the prompts:
- Set "dist" as your public directory (this is where Vite builds to)
- Configure as a single-page app
- Set up automatic builds and deploys with GitHub (optional)

4. **Build your project**

```bash
npm run build
```

5. **Deploy to Firebase**

```bash
firebase deploy
```

Your app will be available at the Firebase URL provided after deployment.

## Setting up Gemini AI

To use the AI profile matching feature:

1. Get a Gemini API key from [Google AI Studio](https://ai.google.dev/)
2. Add the API key when prompted in the AI Matching tab
3. For production, store the API key in your Supabase environment variables

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/db7cb9b9-de8b-4e84-a380-782e32084a65) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify or Firebase Hosting. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
