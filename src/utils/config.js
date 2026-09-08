import configData from '../../wedding-config.json';

/**
 * Extracts a standard 11-character YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/live/VIDEO_ID
 * - Bare 11-character ID (VIDEO_ID)
 */
export function getYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  const str = String(urlOrId).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }
  const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))([\w-]{11})/i);
  return match ? match[1] : str;
}

export function getYouTubeWatchUrl(urlOrId) {
  const id = getYouTubeId(urlOrId);
  return id ? `https://www.youtube.com/watch?v=${id}` : '';
}

export function getYouTubeEmbedUrl(urlOrId, params = '') {
  const id = getYouTubeId(urlOrId);
  if (!id) return '';
  const origin = typeof window !== 'undefined' && window.location.origin ? encodeURIComponent(window.location.origin) : '';
  const originParam = origin ? `origin=${origin}` : '';
  const fullParams = [params, originParam].filter(Boolean).join('&');
  return `https://www.youtube.com/embed/${id}${fullParams ? `?${fullParams}` : ''}`;
}

export const weddingConfig = {
  couple: configData.couple || {
    groom: 'Vivek',
    bride: 'Varshini',
    hashtag: '#VivekWedsVarshini',
  },
  events: configData.events || {
    groomHaldi: {
      title: "Groom's Haldi (Pellikoduku)",
      date: '18 December 2026',
      time: '09:00 AM IST',
      venue: "Groom's Residence, Amalapuram",
      mapUrl: 'https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu',
      description: 'Auspicious Mangala Snanam and traditional turmeric ceremony for Vivek with joyful folk beats, family blessings, and love.',
    },
    brideHaldi: {
      title: "Bride's Haldi (Pellikuthuru)",
      date: '18 December 2026',
      time: '11:30 AM IST',
      venue: "Bride's Residence, Amalapuram",
      mapUrl: 'https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu',
      description: 'Sacred turmeric ceremony & Nalugu rituals for Varshini amidst vibrant marigold blooms, joyful songs, and heartfelt blessings.',
    },
    /* Sangeet commented out
    sangeet: {
      title: 'Sangeet Night',
      date: '18 December 2026',
      time: '06:30 PM IST',
      venue: 'Kshatriya Kalyana Mandapam, Amalapuram',
      mapUrl: 'https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu',
      description: 'An evening filled with energetic family dance performances, classical fusion melodies, and delightful dinner.',
    },
    */
    wedding: {
      title: 'Wedding Ceremony',
      date: '19 December 2026',
      time: '03:35 AM IST',
      venue: 'Kshatriya Kalyana Mandapam, Amalapuram',
      mapUrl: 'https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu',
      description: 'Witness our sacred Vedic vows, Jeelakarra Bellam, and traditional Mangalsutra rituals in the presence of loved ones.',
    },
    reception: {
      title: 'Grand Reception',
      date: '19 December 2026',
      time: '07:00 PM IST',
      venue: 'Kshatriya Kalyana Mandapam, Amalapuram',
      mapUrl: 'https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu',
      description: 'Celebrate our holy union with authentic traditional royal feast, warm blessings, and live musical orchestra.',
    },
  },
  // Backward compatibility convenience getter for main wedding ceremony
  wedding: configData.events?.wedding || configData.wedding || {
    date: '19 December 2026',
    time: '03:35 AM IST',
    venue: 'Kshatriya Kalyana Mandapam, Amalapuram',
    mapUrl: 'https://www.google.com/maps/place/Kshatriya+Kalyana+Mandapam/@16.5607114,81.993831,17z/data=!3m1!4b1!4m6!3m5!1s0x3a37e583a8300001:0xa14bf2c729820592!8m2!3d16.5607114!4d81.993831!16s%2Fg%2F11sskr8sqc!5m1!1e2!18m1!1e1?entry=ttu',
  },
  preWeddingPhotos: configData.preWeddingPhotos || [
    { title: "Moment of Love 1", caption: "With you, every place is magical ✨" },
    { title: "Moment of Love 2", caption: "Two souls, one beautiful journey together 💫" },
    { title: "Moment of Love 3", caption: "A lifetime of love, laughter, and forever 🌸" },
    { title: "Moment of Love 4", caption: "Cherishing every smile and quiet moment 💖" },
    { title: "Moment of Love 5", caption: "Where forever begins in each other's eyes 🪷" },
    { title: "Moment of Love 6", caption: "Holding hands towards a lifetime of happiness 🌟" },
  ],
  liveWeddingStreamUrl: configData.liveWeddingStreamUrl || 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  preWeddingVideoUrl: configData.preWeddingVideoUrl || 'https://www.youtube.com/watch?v=tVT4vd4Mj1Q',
  backgroundMusicUrl: configData.backgroundMusicUrl || 'https://www.youtube.com/watch?v=m-RiOAOfCGs',
};

export default weddingConfig;
