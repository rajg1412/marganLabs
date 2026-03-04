NeuroLearn — Mini AI Learning Dashboard

A modern AI learning dashboard built with Next.js 14.
This project simulates a simple SaaS-style learning platform where users can browse courses, track progress, and manage lessons.

The goal of this project was to practice building a clean UI, scalable component structure, and good user experience using modern React and Next.js features.

Project Overview

NeuroLearn is a frontend-focused project that demonstrates how a learning platform dashboard might work.

The application includes:

A login page

A dashboard showing courses and progress

A course detail page with lessons

Dark mode support

Loading skeletons

Search functionality

The project focuses on UI design, component architecture, and React state management, rather than backend functionality.

Authentication and data are simulated using local storage and mock data.

Tech Stack

Framework
Next.js 14 (App Router)

Language
TypeScript

Styling
CSS Modules + CSS Variables

State Management
React Hooks (useState, useEffect, useMemo)

Data
Mock data stored locally

Persistence
localStorage

Fonts
Google Fonts (Inter)

Mobile Demo
React Native example screen

Features
Login Page

The login page contains an email and password form with basic validation.

Features include:

Email and password input fields

Validation messages

Loading state on login

Redirect to dashboard after successful login

Login session saved in localStorage

Logout option in the navbar

Authentication is simulated since this is a frontend project.

Dashboard

The dashboard displays a list of available courses.

Each course card shows:

Course title

Description

Instructor

Category

Progress bar

Additional features include:

Search bar to filter courses

Loading skeleton cards while data loads

Empty state when no search results match

Basic statistics section showing course progress

Course Detail Page

Each course has a dedicated page that shows the lesson list.

Features:

Lesson types (video, article, quiz)

Ability to mark lessons as completed

Live progress updates

Completed lessons shown with a strikethrough

Progress saved in localStorage

Error page for invalid course IDs

Dark Mode

Dark mode is implemented using CSS variables.

Features:

Theme toggle in the navbar

Theme preference stored in localStorage

System preference detection on first visit

Smooth transitions between themes

Route Protection

Some routes are protected using a simple client-side guard.

If a user is not logged in:

Access to dashboard or course pages is blocked

The user is redirected to the login page

Since authentication is simulated, this check is done using localStorage.

React Native Demo

A simple React Native screen is included to show how the dashboard layout might work on mobile.

Features:

Course list using FlatList

Progress bars

Dark mode toggle

Basic stats card

This part is only for demonstration.

How AI Tools Were Used

AI tools such as ChatGPT and GitHub Copilot were used during development mainly for:

Generating initial component structure

Getting suggestions for animations and styling

Debugging some TypeScript errors

Improving accessibility attributes

However, the main logic such as validation, hooks, filtering logic, and localStorage handling was implemented and reviewed manually.

Challenges Faced
Progress Ring Calculation

The circular SVG progress ring required calculating strokeDashoffset dynamically based on the number of completed lessons.

Dark Mode Flash

Initially there was a brief flash of the wrong theme.
This was fixed by checking the saved theme before rendering.

localStorage Type Safety

Handling localStorage in TypeScript required creating a reusable hook to ensure safe reads and writes.

Next.js App Router Params

The course detail page required properly handling dynamic route parameters in the new App Router structure.

Possible Improvements

If more time were available, the following improvements could be added:

Real authentication using NextAuth

Backend API integration

Video player for lessons

Course enrollment system

Notifications

Global state management using Zustand or Redux

Unit testing

End-to-end testing

Progressive Web App support

Internationalization

Setup Instructions
Prerequisites

Node.js version 18 or higher
npm version 9 or higher

Installation

Clone the repository

git clone <repo-url>
cd ai-learning-dashboard

Install dependencies

npm install

Start development server

npm run dev

Open in browser

http://localhost:3000
Production Build
npm run build
npm start
Deployment

The project can be deployed easily using Vercel.

Using Vercel CLI
npm install -g vercel
vercel login
vercel --prod
Using GitHub

Push the repository to GitHub

Import the project in Vercel

Vercel will detect Next.js automatically

Click deploy

Folder Structure
app
  layout.tsx
  page.tsx

  dashboard
    page.tsx

  course/[id]
    page.tsx

components
  ui
  layout

context
  ThemeContext.tsx

hooks
  useCourses.ts
  useLocalStorage.ts

data
  courses.ts

rn-app
  App.tsx
Summary

This project demonstrates:

Component-based architecture

Modern Next.js development

React hooks for state management

Responsive UI design

Clean project structure

It was built as a frontend engineering practice project to simulate how a real learning dashboard might work.

If you want, I can also help you prepare the 15 MOST IMPORTANT QUESTIONS the interviewer will ask based on this exact project.

Those questions will almost certainly come in the interview.
