export type FeedTab = 'home' | 'explore' | 'notifications' | 'profile';

export interface Post {
  id: number;
  author: string;
  location: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}
