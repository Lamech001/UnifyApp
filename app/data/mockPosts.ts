import { Post } from '../types/feed';

const makeRecentIso = (hoursAgo: number): string => {
  return new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();
};

export const mockPosts: Post[] = [
  {
    id: 1,
    author: 'Wanjiku M.',
    location: 'Nairobi, Kenya',
    content:
      'Just witnessed the most beautiful sunset over Uhuru Park! The city looks magical from here. Sometimes we forget to appreciate the small moments. 🌅',
    createdAt: makeRecentIso(2),
    likes: 234,
    comments: 45,
    commentEntries: [
      'Beautiful view! Nairobi sunsets are unmatched.',
      'I was there last week, amazing spot.',
    ],
  },
  {
    id: 2,
    author: 'Kamau J.',
    location: 'Mombasa, Kenya',
    content:
      "Fresh mandazi from mama's kitchen this morning! Nothing beats the smell of authentic Kenyan breakfast. Recipe passed down 3 generations. 🍞",
    createdAt: makeRecentIso(5),
    likes: 567,
    comments: 89,
    commentEntries: [
      'Now I am craving mandazi.',
      'Please share the full recipe!',
    ],
  },
  {
    id: 3,
    author: 'Akinyi S.',
    location: 'Kisumu, Kenya',
    content:
      'Lake Victoria is calling! The fishing boats heading out early morning is such a peaceful sight. This is the Kenya I love.',
    createdAt: makeRecentIso(8),
    likes: 892,
    comments: 134,
    commentEntries: [
      'Kisumu mornings are always peaceful.',
      'Lake Victoria never disappoints.',
    ],
  },
];

export const cityHighlights = [
  { name: 'Nairobi', countLabel: '1.9K+' },
  { name: 'Mombasa', countLabel: '1.5K+' },
  { name: 'Kisumu', countLabel: '1.2K+' },
  { name: 'Nakuru', countLabel: '980+' },
  { name: 'Eldoret', countLabel: '860+' },
  { name: 'Thika', countLabel: '710+' },
];
