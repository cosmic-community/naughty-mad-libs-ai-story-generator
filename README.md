<!-- README_START -->
# Naughty Mad Libs - AI Story Generator 🔥📝

A modern, responsive adult-themed Mad Libs application that uses AI to generate hilarious, personalized stories. Users fill in playful prompts and watch as artificial intelligence crafts entertaining tales just for them.

![Naughty Mad Libs Banner](https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop&auto=format)

## ✨ Features

- **Interactive Multi-Step Forms** - Engaging fill-in-the-blank experience
- **AI-Powered Story Generation** - Uses Cosmic's AI SDK to create unique stories
- **Multiple Story Templates** - Different themes: Romantic, Adventure, Comedy, Nightlife
- **Age Verification System** - 18+ content warning and verification
- **Social Sharing** - Share your hilarious stories with friends
- **Responsive Design** - Beautiful on all devices
- **Real-time Story Generation** - Instant AI-powered content creation
- **Template Management** - Dynamic content managed through Cosmic CMS

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=fill-me-in-production)

## Original Prompt

This application was built based on the following request:

> Build a modern, responsive website for adults (18+) that functions like a Mad Libs game. The site should ask users a short series of playful, fill-in-the-blank questions (e.g., name, favorite body part, adjective, object, etc.). After submission, the site should use Cosmics AI SDK to generate a short, humorous, adult-themed story that incorporates the answers. The story should be shown on a results page, with an option to regenerate or try again.
>
> The site should include:
> – A home page with a simple intro and "Start" button
> – A multi-step form experience (or all-in-one form)
> – A results page that displays the AI-generated story
> – Optional social sharing buttons
> – A content moderation warning (18+ only)
> – A clean, fun, and mobile-friendly design
>
> Use Cosmic to manage form templates and story prompts as content models. Also, set up the backend to connect to the AI generator for dynamic story creation.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Cosmic](https://www.cosmicjs.com)** - Headless CMS for content management
- **[Cosmic AI SDK](https://www.cosmicjs.com/docs)** - AI-powered story generation
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[React Hook Form](https://react-hook-form.com/)** - Form handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A [Cosmic](https://www.cosmicjs.com) account with bucket access

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd naughty-madlibs
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Mad Libs Templates
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all active templates
const templates = await cosmic.objects
  .find({ 
    type: 'mad-libs-templates',
    'metadata.active': true 
  })
  .props(['title', 'slug', 'metadata'])
  .depth(1)

// Get featured templates for homepage
const featured = await cosmic.objects
  .find({ 
    type: 'mad-libs-templates',
    'metadata.featured': true 
  })
  .limit(3)
```

### AI Story Generation
```typescript
// Generate story with user inputs
const response = await cosmic.ai.generateText({
  prompt: populatedPrompt,
  max_tokens: storyPrompt.metadata.max_tokens || 300
})

console.log(response.text) // Generated story
console.log(response.usage) // Token usage stats
```

### Managing Story Prompts
```typescript
// Get story prompt for template
const storyPrompt = await cosmic.objects.findOne({
  type: 'story-prompts',
  'metadata.template': templateId
}).depth(1)
```

## 🎯 Cosmic CMS Integration

This app leverages three main content types in [Cosmic](https://www.cosmicjs.com/docs):

### Mad Libs Templates
- Template name and description
- Question sets for user input
- Theme categorization (Romantic, Adventure, etc.)
- Difficulty levels (Easy, Medium, Spicy)
- Active/Featured status

### Story Prompts
- AI prompt templates with placeholders
- Token limits for story length
- Style and content guidelines
- Connected to specific templates

### Site Settings
- Age verification messages
- Social sharing configuration
- Footer content and legal text
- Analytics integration

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in dashboard
4. Deploy automatically

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)
3. Configure environment variables

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`
<!-- README_END -->