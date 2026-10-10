export const mockAnimes = [
  {
    id: '1',
    title: 'Attack on Titan',
    thumbnail: 'https://via.placeholder.com/150x200.png?text=AOT',
    description: 'Eren Yeager and his friends join the Survey Corps to fight against the Titans.',
    seasons: [
      {
        id: 's1',
        title: 'Season 1',
        episodes: [
          {
            id: 'e1',
            title: 'To You, in 2000 Years: The Fall of Shiganshina, Part 1',
            duration: '24m',
            url: 'https://www.w3schools.com/html/mov_bbb.mp4' // Using a sample video URL for testing
          },
          {
            id: 'e2',
            title: 'That Day: The Fall of Shiganshina, Part 2',
            duration: '24m',
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        id: 's2',
        title: 'Season 2',
        episodes: [
          {
            id: 'e26',
            title: 'Beast Titan',
            duration: '24m',
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Demon Slayer',
    thumbnail: 'https://via.placeholder.com/150x200.png?text=Demon+Slayer',
    description: 'Tanjiro Kamado becomes a demon slayer to turn his sister back into a human.',
    seasons: [
      {
        id: 's1',
        title: 'Season 1',
        episodes: [
          {
            id: 'e1',
            title: 'Cruelty',
            duration: '24m',
            url: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      }
    ]
  }
];

export const mockQualities = [
  { id: '1080p', label: '1080p (FHD)' },
  { id: '720p', label: '720p (HD)' },
  { id: '480p', label: '480p (SD)' }
];

export const mockLanguages = [
  { id: 'tr_dub', label: 'Türkçe Dublaj' },
  { id: 'tr_sub', label: 'Türkçe Altyazılı' },
  { id: 'en_sub', label: 'İngilizce Altyazılı' }
];
