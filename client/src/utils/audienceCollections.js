// Curated audience collections with relevant subreddits
// Similar to GummySearch's audience collections

export const AUDIENCE_COLLECTIONS = [
  {
    id: 'pet-lovers',
    name: 'Pet Lovers',
    description: 'Communities for pet owners and animal enthusiasts',
    icon: '🐾',
    keywords: ['pets', 'dogs', 'cats', 'animals'],
    subreddits: [
      { name: 'dogs', displayName: 'Dogs', keywords: ['dog', 'puppy', 'canine'] },
      { name: 'cats', displayName: 'Cats', keywords: ['cat', 'kitten', 'feline'] },
      { name: 'PetAdvice', displayName: 'Pet Advice', keywords: ['pet care', 'advice'] },
      { name: 'aww', displayName: 'Aww', keywords: ['cute', 'animals'] },
      { name: 'Dogtraining', displayName: 'Dog Training', keywords: ['training', 'dog'] },
      { name: 'cats', displayName: 'Cats', keywords: ['cat'] },
      { name: 'puppy101', displayName: 'Puppy101', keywords: ['puppy'] },
      { name: 'beyondthebump', displayName: 'BeyondTheBump', keywords: ['pet parents'] },
      { name: 'Petloss', displayName: 'Pet Loss', keywords: ['grief', 'loss'] },
      { name: 'catsareassholes', displayName: 'Cats Are Assholes', keywords: ['funny', 'cats'] }
    ]
  },
  {
    id: 'software-developers',
    name: 'Software Developers',
    description: 'Tech communities for developers and programmers',
    icon: '💻',
    keywords: ['programming', 'coding', 'software', 'developers'],
    subreddits: [
      { name: 'programming', displayName: 'Programming', keywords: ['programming', 'coding'] },
      { name: 'webdev', displayName: 'Web Development', keywords: ['web', 'development'] },
      { name: 'learnprogramming', displayName: 'Learn Programming', keywords: ['learn', 'beginner'] },
      { name: 'javascript', displayName: 'JavaScript', keywords: ['javascript', 'js'] },
      { name: 'Python', displayName: 'Python', keywords: ['python'] },
      { name: 'reactjs', displayName: 'React.js', keywords: ['react', 'frontend'] },
      { name: 'node', displayName: 'Node.js', keywords: ['node', 'backend'] },
      { name: 'cscareerquestions', displayName: 'CS Career Questions', keywords: ['career', 'jobs'] },
      { name: 'ExperiencedDevs', displayName: 'Experienced Devs', keywords: ['experienced'] },
      { name: 'devops', displayName: 'DevOps', keywords: ['devops', 'infrastructure'] }
    ]
  },
  {
    id: 'entrepreneurs',
    name: 'Entrepreneurs',
    description: 'Communities for startups and business owners',
    icon: '🚀',
    keywords: ['startup', 'entrepreneur', 'business'],
    subreddits: [
      { name: 'Entrepreneur', displayName: 'Entrepreneur', keywords: ['business', 'startup'] },
      { name: 'startups', displayName: 'Startups', keywords: ['startup'] },
      { name: 'smallbusiness', displayName: 'Small Business', keywords: ['business', 'small'] },
      { name: 'SaaS', displayName: 'SaaS', keywords: ['saas', 'software'] },
      { name: 'ecommerce', displayName: 'Ecommerce', keywords: ['ecommerce', 'online'] },
      { name: 'marketing', displayName: 'Marketing', keywords: ['marketing', 'advertising'] },
      { name: 'sideproject', displayName: 'Side Project', keywords: ['side', 'project'] },
      { name: 'startup', displayName: 'Startup', keywords: ['startup'] },
      { name: 'entrepreneurridealong', displayName: 'Entrepreneur Ride Along', keywords: ['journey'] },
      { name: 'advancedentrepreneur', displayName: 'Advanced Entrepreneur', keywords: ['advanced'] }
    ]
  },
  {
    id: 'fitness-enthusiasts',
    name: 'Fitness Enthusiasts',
    description: 'Communities for fitness, workout, and health',
    icon: '💪',
    keywords: ['fitness', 'workout', 'exercise', 'health'],
    subreddits: [
      { name: 'Fitness', displayName: 'Fitness', keywords: ['fitness', 'exercise'] },
      { name: 'bodybuilding', displayName: 'Bodybuilding', keywords: ['bodybuilding', 'muscle'] },
      { name: 'running', displayName: 'Running', keywords: ['running', 'marathon'] },
      { name: 'yoga', displayName: 'Yoga', keywords: ['yoga', 'meditation'] },
      { name: 'nutrition', displayName: 'Nutrition', keywords: ['nutrition', 'diet'] },
      { name: 'weightroom', displayName: 'Weightroom', keywords: ['lifting', 'weights'] },
      { name: 'progresspics', displayName: 'Progress Pics', keywords: ['progress', 'transformation'] },
      { name: 'homegym', displayName: 'Home Gym', keywords: ['home', 'gym'] },
      { name: 'Stronglifts5x5', displayName: 'Stronglifts 5x5', keywords: ['stronglifts'] },
      { name: 'keto', displayName: 'Keto', keywords: ['keto', 'diet'] }
    ]
  },
  {
    id: 'gamers',
    name: 'Gamers',
    description: 'Communities for gaming enthusiasts',
    icon: '🎮',
    keywords: ['gaming', 'games', 'video games'],
    subreddits: [
      { name: 'gaming', displayName: 'Gaming', keywords: ['gaming', 'games'] },
      { name: 'pcgaming', displayName: 'PC Gaming', keywords: ['pc', 'computer'] },
      { name: 'xbox', displayName: 'Xbox', keywords: ['xbox', 'console'] },
      { name: 'PS5', displayName: 'PlayStation 5', keywords: ['ps5', 'playstation'] },
      { name: 'NintendoSwitch', displayName: 'Nintendo Switch', keywords: ['switch', 'nintendo'] },
      { name: 'leagueoflegends', displayName: 'League of Legends', keywords: ['lol', 'league'] },
      { name: 'minecraft', displayName: 'Minecraft', keywords: ['minecraft'] },
      { name: 'GlobalOffensive', displayName: 'CS:GO', keywords: ['csgo', 'counter strike'] },
      { name: 'rpg_gamers', displayName: 'RPG Gamers', keywords: ['rpg', 'role playing'] },
      { name: 'indiegaming', displayName: 'Indie Gaming', keywords: ['indie', 'independent'] }
    ]
  },
  {
    id: 'crypto-enthusiasts',
    name: 'Crypto Enthusiasts',
    description: 'Communities for cryptocurrency and blockchain',
    icon: '₿',
    keywords: ['crypto', 'bitcoin', 'blockchain', 'cryptocurrency'],
    subreddits: [
      { name: 'Bitcoin', displayName: 'Bitcoin', keywords: ['bitcoin', 'btc'] },
      { name: 'ethereum', displayName: 'Ethereum', keywords: ['ethereum', 'eth'] },
      { name: 'CryptoCurrency', displayName: 'CryptoCurrency', keywords: ['crypto', 'currency'] },
      { name: 'CryptoMarkets', displayName: 'Crypto Markets', keywords: ['markets', 'trading'] },
      { name: 'defi', displayName: 'DeFi', keywords: ['defi', 'decentralized'] },
      { name: 'NFT', displayName: 'NFT', keywords: ['nft', 'non fungible'] },
      { name: 'CryptoMoonShots', displayName: 'Crypto Moon Shots', keywords: ['moonshot'] },
      { name: 'SatoshiStreetBets', displayName: 'Satoshi Street Bets', keywords: ['trading', 'bets'] },
      { name: 'cryptotechnology', displayName: 'Crypto Technology', keywords: ['technology'] },
      { name: 'CryptoCurrencyTrading', displayName: 'Crypto Trading', keywords: ['trading'] }
    ]
  },
  {
    id: 'travelers',
    name: 'Travelers',
    description: 'Communities for travel enthusiasts and nomads',
    icon: '✈️',
    keywords: ['travel', 'tourism', 'adventure'],
    subreddits: [
      { name: 'travel', displayName: 'Travel', keywords: ['travel', 'tourism'] },
      { name: 'solotravel', displayName: 'Solo Travel', keywords: ['solo', 'travel'] },
      { name: 'digitalnomad', displayName: 'Digital Nomad', keywords: ['nomad', 'remote'] },
      { name: 'backpacking', displayName: 'Backpacking', keywords: ['backpacking', 'budget'] },
      { name: 'travelpartners', displayName: 'Travel Partners', keywords: ['partners', 'companions'] },
      { name: 'roadtrip', displayName: 'Road Trip', keywords: ['road', 'trip'] },
      { name: 'camping', displayName: 'Camping', keywords: ['camping', 'outdoors'] },
      { name: 'vandwellers', displayName: 'Van Dwellers', keywords: ['van', 'living'] },
      { name: 'travelhacking', displayName: 'Travel Hacking', keywords: ['hacking', 'points'] },
      { name: 'Wanderlust', displayName: 'Wanderlust', keywords: ['wanderlust'] }
    ]
  },
  {
    id: 'foodies',
    name: 'Foodies',
    description: 'Communities for cooking and food enthusiasts',
    icon: '🍳',
    keywords: ['food', 'cooking', 'recipes', 'cuisine'],
    subreddits: [
      { name: 'food', displayName: 'Food', keywords: ['food'] },
      { name: 'cooking', displayName: 'Cooking', keywords: ['cooking', 'recipes'] },
      { name: 'recipes', displayName: 'Recipes', keywords: ['recipes'] },
      { name: 'baking', displayName: 'Baking', keywords: ['baking', 'desserts'] },
      { name: 'MealPrepSunday', displayName: 'Meal Prep Sunday', keywords: ['meal', 'prep'] },
      { name: 'slowcooking', displayName: 'Slow Cooking', keywords: ['slow', 'cooker'] },
      { name: 'AskCulinary', displayName: 'Ask Culinary', keywords: ['questions', 'culinary'] },
      { name: 'veganrecipes', displayName: 'Vegan Recipes', keywords: ['vegan'] },
      { name: 'ketorecipes', displayName: 'Keto Recipes', keywords: ['keto'] },
      { name: 'BBQ', displayName: 'BBQ', keywords: ['bbq', 'grilling'] }
    ]
  }
];

// Helper function to get collection by ID
export function getCollectionById(id) {
  return AUDIENCE_COLLECTIONS.find(collection => collection.id === id);
}

// Helper function to search collections
export function searchCollections(query) {
  const lowerQuery = query.toLowerCase();
  return AUDIENCE_COLLECTIONS.filter(collection =>
    collection.name.toLowerCase().includes(lowerQuery) ||
    collection.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
    collection.description.toLowerCase().includes(lowerQuery)
  );
}

