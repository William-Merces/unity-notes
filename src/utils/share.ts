import { SharePlatform } from '../types';

interface ShareContent {
  title?: string;
  content: string;
  reference?: string;
}

export const shareContent = (platform: SharePlatform, content: ShareContent) => {
  const text = content.content;
  const title = content.title || content.reference || '';
  const url = window.location.href;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}: ${text}`)}&url=${encodeURIComponent(url)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${text}\n${url}`)}`
  };

  window.open(shareUrls[platform], '_blank');
};