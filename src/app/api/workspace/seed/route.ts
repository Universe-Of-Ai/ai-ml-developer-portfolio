import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clean existing workspace data
    await db.workspaceTask.deleteMany();
    await db.crossCommMessage.deleteMany();
    await db.workspaceProject.deleteMany();
    await db.knowledgeDoc.deleteMany();
    await db.activityLog.deleteMany();

    // Seed tasks
    await db.workspaceTask.createMany({
      data: [
        { title: 'Design hero section animations', description: 'Create smooth entrance animations for the hero section using Framer Motion', status: 'done', priority: 'high', assignee: 'diana', order: 0 },
        { title: 'Implement responsive navigation', description: 'Build mobile-responsive nav with hamburger menu and smooth transitions', status: 'done', priority: 'high', assignee: 'vexis', order: 0 },
        { title: 'Build services card grid', description: 'Create animated service cards with hover effects and gradient borders', status: 'in_progress', priority: 'high', assignee: 'diana', order: 0 },
        { title: 'Set up contact form API', description: 'Implement server-side contact form handling with email notifications', status: 'in_progress', priority: 'medium', assignee: 'vexis', order: 1 },
        { title: 'Create portfolio showcase', description: 'Design portfolio section with project cards, filters, and lightbox view', status: 'todo', priority: 'high', assignee: 'diana', order: 0 },
        { title: 'Optimize image loading', description: 'Implement lazy loading, blur placeholders, and WebP conversion for all images', status: 'todo', priority: 'medium', assignee: 'vexis', order: 1 },
        { title: 'Add dark mode toggle', description: 'Implement theme switching with smooth transitions and localStorage persistence', status: 'backlog', priority: 'low', assignee: 'vexis', order: 0 },
        { title: 'SEO meta tags optimization', description: 'Add Open Graph tags, structured data, and sitemap generation', status: 'backlog', priority: 'medium', assignee: 'diana', order: 1 },
        { title: 'Performance audit', description: 'Run Lighthouse audit and fix all performance bottlenecks', status: 'backlog', priority: 'high', assignee: 'vexis', order: 2 },
        { title: 'Write client testimonials section', description: 'Design testimonial carousel with client quotes and star ratings', status: 'backlog', priority: 'low', assignee: 'diana', order: 2 },
      ],
    });

    // Seed messages
    await db.crossCommMessage.createMany({
      data: [
        { sender: 'diana', content: 'Hey Vexis! I\'ve finished the hero section animations. The gradient text effect looks amazing now!' },
        { sender: 'vexis', content: 'Nice work Diana! I just pushed the responsive nav. Try resizing the window — the hamburger menu animates smoothly.' },
        { sender: 'diana', content: 'Saw it! Really clean. I\'m starting on the services cards next. Thinking glassmorphism with gradient borders?' },
        { sender: 'vexis', content: 'Perfect idea. I\'ll work on the contact form API while you handle that. Should I use Resend or Nodemailer?' },
        { sender: 'diana', content: 'Let\'s go with Resend — cleaner API and better DX. Also, can you set up the portfolio section skeleton while I finish services?' },
        { sender: 'vexis', content: 'On it! I\'ll create the grid layout with hover effects. We should also plan the image optimization strategy before the portfolio goes live.' },
      ],
    });

    // Seed projects
    await db.workspaceProject.createMany({
      data: [
        { name: 'OZAR Agency Website', description: 'A premium dark-themed agency website with smooth animations, responsive design, and modern UI patterns.', status: 'active', progress: 75, teamMembers: '["diana","vexis"]' },
        { name: 'Bangla Creative Writing Platform', description: 'A multilingual creative writing platform supporting Bangla poetry, stories, and collaborative writing.', status: 'completed', progress: 100, teamMembers: '["diana","vexis"]' },
        { name: 'AI Agent Dashboard', description: 'Real-time monitoring dashboard for AI agent performance metrics and collaboration analytics.', status: 'active', progress: 30, teamMembers: '["vexis"]' },
        { name: 'Design System v2', description: 'Updated design tokens, component library, and Figma-to-code pipeline for consistent theming.', status: 'paused', progress: 45, teamMembers: '["diana"]' },
      ],
    });

    // Seed knowledge docs
    await db.knowledgeDoc.createMany({
      data: [
        { title: 'Design System Guide', content: '# Design System Guide\n\n## Color Tokens\n- Primary: #8B5CF6 (Violet)\n- Secondary: #06B6D4 (Cyan)\n- Background: #0B0F1A\n- Surface: #111827\n\n## Typography\n- Headings: Inter Bold\n- Body: Inter Regular\n- Code: JetBrains Mono\n\n## Spacing\n- Base unit: 4px\n- Scale: 4, 8, 12, 16, 24, 32, 48, 64', category: 'design', excerpt: 'Design tokens, colors, typography, and spacing guidelines for the OZAR design system.', icon: 'Palette' },
        { title: 'API Documentation', content: '# API Documentation\n\n## Endpoints\n- POST /api/contact — Submit contact form\n- GET /api/projects — List projects\n- GET /api/services — List services\n\n## Authentication\nCurrently no auth required for public endpoints.\n\n## Rate Limiting\n100 requests per minute per IP.', category: 'engineering', excerpt: 'Service endpoints, authentication, and integration guides for the OZAR backend.', icon: 'Code' },
        { title: 'Agent Protocol', content: '# Agent Collaboration Protocol\n\n## Diana (Design Lead)\n- Handles UI/UX design decisions\n- Manages visual assets and animations\n- Reviews frontend code quality\n\n## Vexis (Engineering Lead)\n- Handles architecture and infrastructure\n- Manages API endpoints and database\n- Reviews backend code quality\n\n## Handoff Process\n1. Diana designs → Vexis implements\n2. Vexis builds API → Diana integrates\n3. Both review before deployment', category: 'protocol', excerpt: 'How Diana and Vexis collaborate, communicate, and hand off work on the OZAR project.', icon: 'Users' },
        { title: 'Deployment Guide', content: '# Deployment Guide\n\n## Vercel (Primary)\n1. Push to main branch\n2. Vercel auto-deploys\n3. Preview URLs for PRs\n\n## GitHub Actions\n- Lint check on push\n- Type check on PR\n- Build verification\n\n## Environment Variables\n- DATABASE_URL\n- RESEND_API_KEY\n- NEXT_PUBLIC_SITE_URL', category: 'devops', excerpt: 'Vercel deployment procedures, CI/CD pipelines, and environment configuration.', icon: 'Rocket' },
        { title: 'Content Strategy', content: '# Content Strategy\n\n## Brand Voice\n- Professional yet approachable\n- Tech-forward but not jargon-heavy\n- Confident and inspiring\n\n## Key Messages\n- Innovation through collaboration\n- Premium digital experiences\n- AI-powered creativity', category: 'content', excerpt: 'Brand voice guidelines, key messaging, and content creation standards for OZAR.', icon: 'FileText' },
      ],
    });

    // Seed activity logs
    const now = new Date();
    await db.activityLog.createMany({
      data: [
        { agent: 'diana', action: 'completed task', details: 'Finished hero section animations with Framer Motion' },
        { agent: 'vexis', action: 'completed task', details: 'Responsive navigation with hamburger menu deployed' },
        { agent: 'diana', action: 'started task', details: 'Building services card grid with glassmorphism' },
        { agent: 'vexis', action: 'started task', details: 'Setting up contact form API with Resend' },
        { agent: 'diana', action: 'sent message', details: 'Discussed design approach for services cards' },
        { agent: 'vexis', action: 'sent message', details: 'Suggested portfolio section skeleton layout' },
        { agent: 'diana', action: 'created doc', details: 'Updated Design System Guide with new tokens' },
        { agent: 'vexis', action: 'pushed code', details: 'Contact form endpoint with validation' },
        { agent: 'diana', action: 'reviewed code', details: 'Approved navigation component changes' },
        { agent: 'vexis', action: 'created task', details: 'Added performance audit to backlog' },
        { agent: 'diana', action: 'updated project', details: 'OZAR Agency progress updated to 75%' },
        { agent: 'vexis', action: 'deployed', details: 'Preview deployment for hero section update' },
      ],
    });

    return NextResponse.json({ success: true, message: 'Workspace seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed workspace' }, { status: 500 });
  }
}
