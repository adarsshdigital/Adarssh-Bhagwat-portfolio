export interface InstagramShowcasePost {
  id: string;
  type: 'reel';
  title: string;
  subtitle: string;
  topicTag: string;
  url: string;
  shortcode: string;
  metaLabel: string;
  captionSummary: string;
  durationLabel: string;
  videoUrl: string;
  fallbackVideoUrl?: string;
}

/**
 * Adarssh Bhagwat - Instagram Reel Showcase
 * Strictly reels in exact requested order with local on-demand video sources.
 */
export const INSTAGRAM_SHOWCASE_POSTS: InstagramShowcasePost[] = [
  {
    id: 'reel-1',
    type: 'reel',
    title: "How Levi's Turned Restrictions Into Marketing",
    subtitle: 'Branding, regulations, and consumer psychology in action',
    topicTag: 'Branding & Strategy',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/DaE3ROATzcL/',
    shortcode: 'DaE3ROATzcL',
    metaLabel: 'Reel 01 · Video',
    durationLabel: '0:42',
    captionSummary: "How Levi's turned advertising restrictions into a masterclass in marketing, consumer behavior, and brand memorability.",
    videoUrl: '/videos/Levis-video.mp4',
    fallbackVideoUrl: '/videos/levis-video.mp4',
  },
  {
    id: 'reel-2',
    type: 'reel',
    title: 'Why The $4M "Free" Concert Was Pure Marketing Genius',
    subtitle: 'Rio de Janeiro superstar concert case study on compounding economic ROI',
    topicTag: 'Growth & ROI',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/DZfC5SkRxyC/',
    shortcode: 'DZfC5SkRxyC',
    metaLabel: 'Reel 02 · Video',
    durationLabel: '0:48',
    captionSummary: 'Think giving away something for FREE is bad for business? The Brazilian government spent $4M for a free concert and unlocked exponential tourism revenue.',
    videoUrl: '/videos/shakira.mp4',
  },
  {
    id: 'reel-3',
    type: 'reel',
    title: 'Taaki Logo Ko Brand Yaad Rahe! Surrogate Marketing Decoded',
    subtitle: 'The high-stakes game of visibility, psychology, and legal regulations',
    topicTag: 'Surrogate Marketing',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/DZKMm_BRHxI/',
    shortcode: 'DZKMm_BRHxI',
    metaLabel: 'Reel 03 · Video',
    durationLabel: '0:54',
    captionSummary: "It's not just advertising, it's a clever game of visibility, psychology, and regulations. When brands promote music CDs and packaged water to keep master brands top-of-mind.",
    videoUrl: '/videos/Surrogate-Marketing.mp4',
    fallbackVideoUrl: '/videos/surrogate-marketing.mp4',
  },
  {
    id: 'reel-4',
    type: 'reel',
    title: 'The Real Zomato vs Swiggy Battle Breakdown',
    subtitle: 'Restaurant discovery vs. delivery execution and quick-commerce wars',
    topicTag: 'Competitive Strategy',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/Dbukr_aqNyG/',
    shortcode: 'Dbukr_aqNyG',
    metaLabel: 'Reel 04 · Video',
    durationLabel: '0:50',
    captionSummary: "Everyone wants to know who is winning the Zomato vs Swiggy battle. From restaurant discovery to quick-commerce Blinkit vs Instamart, the playbook has changed.",
    videoUrl: '/videos/zomato-swiggy.mp4',
  },
  {
    id: 'reel-5',
    type: 'reel',
    title: 'Why Are "Star" Products Always at Eye Level?',
    subtitle: 'Supermarket shelf psychology and conversion placement hacks',
    topicTag: 'Retail Merchandising',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/DcAdZ0eI_AO/',
    shortcode: 'DcAdZ0eI_AO',
    metaLabel: 'Reel 05 · Video',
    durationLabel: '0:46',
    captionSummary: 'Why are star products always sitting right at eye level? Because what shoppers see first, they buy. A small placement shift drives massive revenue compound.',
    videoUrl: '/videos/supermarkets.mp4',
  },
  {
    id: 'reel-6',
    type: 'reel',
    title: 'Why Customer Reviews Make or Break Modern Business',
    subtitle: 'Social proof, local pack search rankings, and conversion velocity',
    topicTag: 'Social Proof & Trust',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/DbH_urboqwN/',
    shortcode: 'DbH_urboqwN',
    metaLabel: 'Reel 06 · Video',
    durationLabel: '0:52',
    captionSummary: "People trust what other people say far more than what brands say. How positive review velocity acts as both an SEO ranking factor and the #1 conversion multiplier.",
    videoUrl: '/videos/testimonials.mp4',
  },
  {
    id: 'reel-7',
    type: 'reel',
    title: 'The Master Key to High-Ticket Sales Conversations',
    subtitle: 'Adapting to buyer archetypes when high-stakes deals are on the line',
    topicTag: 'Sales & Negotiation',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/DZzsjsnRKM4/',
    shortcode: 'DZzsjsnRKM4',
    metaLabel: 'Reel 07 · Video',
    durationLabel: '0:45',
    captionSummary: "Selling isn't tough, but it can turn into a disaster if you treat every buyer the same. You need the master key for different customer psychologies and objection loops.",
    videoUrl: '/videos/sales-negotiation.mp4',
  },
  {
    id: 'reel-8',
    type: 'reel',
    title: 'Borrowing Trust: Why Celebrity Endorsements Still Work',
    subtitle: 'Association psychology and accelerated brand credibility',
    topicTag: 'Endorsement Psychology',
    url: 'https://www.instagram.com/adarsshbhagwat/reel/DaftuTQRmeE/',
    shortcode: 'DaftuTQRmeE',
    metaLabel: 'Reel 08 · Video',
    durationLabel: '0:49',
    captionSummary: "Trust isn't built overnight, but it can be borrowed through the right association. Why celebrity and influencer endorsements shortcut years of cold customer skepticism.",
    videoUrl: '/videos/celebrity-endorsements.mp4',
  },
];
