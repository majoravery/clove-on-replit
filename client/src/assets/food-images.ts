// SVG food images as data URLs to ensure they always display
export const foodImages = {
  // Breakfast items
  avocadoToast: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <rect x="80" y="120" width="240" height="100" rx="20" fill="#8B4513"/>
      <ellipse cx="200" cy="140" rx="80" ry="30" fill="#32CD32"/>
      <circle cx="200" cy="140" r="8" fill="#FFD700"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Avocado Toast</text>
    </svg>
  `),
  
  scrambledEggs: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="120" ry="60" fill="#333"/>
      <ellipse cx="180" cy="130" rx="40" ry="25" fill="#FFD700"/>
      <ellipse cx="220" cy="170" rx="50" ry="30" fill="#FFD700"/>
      <ellipse cx="160" cy="170" rx="35" ry="20" fill="#FFD700"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Scrambled Eggs</text>
    </svg>
  `),
  
  pancakes: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <circle cx="200" cy="120" r="80" fill="#DEB887"/>
      <circle cx="200" cy="140" r="75" fill="#F4A460"/>
      <circle cx="200" cy="160" r="70" fill="#DEB887"/>
      <rect x="180" y="100" width="40" height="8" fill="#FFD700"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Pancakes</text>
    </svg>
  `),
  
  // Lunch items
  caesarSalad: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="120" ry="80" fill="#90EE90"/>
      <rect x="160" y="120" width="80" height="60" fill="#228B22" opacity="0.7"/>
      <circle cx="150" cy="130" r="8" fill="#FFE4B5"/>
      <circle cx="250" cy="170" r="8" fill="#FFE4B5"/>
      <circle cx="200" cy="140" r="6" fill="#FFE4B5"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Caesar Salad</text>
    </svg>
  `),
  
  quinoaSalad: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="110" ry="70" fill="#F5DEB3"/>
      <circle cx="170" cy="130" r="4" fill="#8B4513"/>
      <circle cx="210" cy="140" r="4" fill="#8B4513"/>
      <circle cx="190" cy="170" r="4" fill="#8B4513"/>
      <circle cx="230" cy="160" r="4" fill="#8B4513"/>
      <circle cx="180" cy="150" r="3" fill="#FF6347"/>
      <circle cx="220" cy="135" r="3" fill="#32CD32"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Quinoa Salad</text>
    </svg>
  `),
  
  turkeyWrap: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="60" ry="100" fill="#DEB887"/>
      <rect x="160" y="100" width="80" height="100" fill="#F5DEB3"/>
      <rect x="170" y="110" width="60" height="10" fill="#8B4513"/>
      <rect x="175" y="130" width="50" height="8" fill="#32CD32"/>
      <rect x="180" y="150" width="40" height="6" fill="#FF6347"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Turkey Wrap</text>
    </svg>
  `),
  
  // Dinner items
  grilledChicken: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="100" ry="60" fill="#D2691E"/>
      <path d="M130 120 Q200 100 270 120 Q250 180 200 190 Q150 180 130 120" fill="#CD853F"/>
      <line x1="150" y1="130" x2="250" y2="130" stroke="#8B4513" stroke-width="2"/>
      <line x1="160" y1="150" x2="240" y2="150" stroke="#8B4513" stroke-width="2"/>
      <line x1="170" y1="170" x2="230" y2="170" stroke="#8B4513" stroke-width="2"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Grilled Chicken</text>
    </svg>
  `),
  
  pastaCarbonara: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="120" ry="80" fill="#333"/>
      <path d="M100 120 Q150 110 200 130 Q250 110 300 120" stroke="#FFD700" stroke-width="4" fill="none"/>
      <path d="M110 140 Q160 130 210 150 Q260 130 290 140" stroke="#FFD700" stroke-width="4" fill="none"/>
      <path d="M120 160 Q170 150 220 170 Q270 150 280 160" stroke="#FFD700" stroke-width="4" fill="none"/>
      <circle cx="170" cy="140" r="6" fill="#8B4513"/>
      <circle cx="230" cy="160" r="6" fill="#8B4513"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Pasta Carbonara</text>
    </svg>
  `),
  
  chickenStirfry: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="120" ry="80" fill="#333"/>
      <rect x="150" y="120" width="30" height="20" fill="#CD853F"/>
      <rect x="200" y="140" width="25" height="25" fill="#32CD32"/>
      <rect x="170" y="160" width="20" height="30" fill="#FF6347"/>
      <rect x="220" y="130" width="35" height="15" fill="#FFD700"/>
      <rect x="180" y="180" width="40" height="10" fill="#FFA500"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Chicken Stir-fry</text>
    </svg>
  `),
  
  // Cuisine images
  italian: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <circle cx="200" cy="150" r="100" fill="#FF6347"/>
      <circle cx="200" cy="150" r="80" fill="#FFD700"/>
      <circle cx="180" cy="130" r="8" fill="#8B4513"/>
      <circle cx="220" cy="130" r="8" fill="#8B4513"/>
      <circle cx="200" cy="170" r="12" fill="#32CD32"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">Italian</text>
    </svg>
  `),
  
  vietnamese: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="120" ry="80" fill="#8B4513"/>
      <path d="M120 130 Q200 120 280 130" stroke="#FFD700" stroke-width="3" fill="none"/>
      <path d="M130 150 Q200 140 270 150" stroke="#FFD700" stroke-width="3" fill="none"/>
      <path d="M140 170 Q200 160 260 170" stroke="#FFD700" stroke-width="3" fill="none"/>
      <circle cx="160" cy="140" r="4" fill="#32CD32"/>
      <circle cx="240" cy="160" r="4" fill="#FF6347"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">Vietnamese</text>
    </svg>
  `),
  
  french: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <path d="M150 100 Q200 80 250 100 Q240 200 200 220 Q160 200 150 100" fill="#DEB887"/>
      <ellipse cx="200" cy="120" rx="40" ry="15" fill="#FFD700"/>
      <circle cx="180" cy="160" r="8" fill="#FF6347"/>
      <circle cx="220" cy="160" r="8" fill="#32CD32"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">French</text>
    </svg>
  `),
  
  middleEastern: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <circle cx="200" cy="150" r="80" fill="#DEB887"/>
      <circle cx="170" cy="130" r="15" fill="#8B4513"/>
      <circle cx="230" cy="130" r="15" fill="#FF6347"/>
      <circle cx="200" cy="170" r="20" fill="#FFD700"/>
      <circle cx="180" cy="170" r="8" fill="#32CD32"/>
      <circle cx="220" cy="170" r="8" fill="#32CD32"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">Middle Eastern</text>
    </svg>
  `),
  
  caribbean: "data:image/svg+xml;base64," + btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f8f5f0"/>
      <ellipse cx="200" cy="150" rx="100" ry="70" fill="#FF6347"/>
      <circle cx="170" cy="130" r="12" fill="#FFD700"/>
      <circle cx="230" cy="130" r="12" fill="#32CD32"/>
      <circle cx="200" cy="170" r="15" fill="#FFA500"/>
      <circle cx="160" cy="160" r="8" fill="#FF1493"/>
      <circle cx="240" cy="160" r="8" fill="#FF1493"/>
      <text x="200" y="260" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">Caribbean</text>
    </svg>
  `)
};