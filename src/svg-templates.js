// Contient uniquement le dessin vectoriel de l'avatar
export const avatarSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="100%" height="100%">
    <g id="corps-de-base">
      <rect x="85" y="190" width="10" height="70" fill="#D7CCC8" rx="2"/>
      <rect x="105" y="190" width="10" height="70" fill="#D7CCC8" rx="2"/>
      <ellipse cx="90" cy="260" rx="8" ry="4" fill="#37474F" />
      <ellipse cx="110" cy="260" rx="8" ry="4" fill="#37474F" />
      <path d="M 130 110 Q 150 120 150 155" stroke="#FFD54F" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M 70 110 Q 55 130 55 165" stroke="#FFD54F" stroke-width="10" stroke-linecap="round" fill="none" />
      <path d="M 72 100 L 128 100 L 122 150 L 78 150 Z" fill="#E0E0E0" />
      <circle cx="100" cy="70" r="25" fill="#FFD54F" />
      <circle cx="92" cy="68" r="2.5" fill="#333" />
      <circle cx="108" cy="68" r="2.5" fill="#333" />
      <path d="M 93 78 Q 100 85 107 78" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
    
    <g class="vetement-chaud">
      <path d="M 72 100 Q 62 110 60 118" stroke="#29B6F6" stroke-width="12" stroke-linecap="round" />
      <path d="M 128 100 Q 138 110 142 118" stroke="#29B6F6" stroke-width="12" stroke-linecap="round" />
      <path d="M 70 100 L 130 100 L 125 145 L 75 145 Z" fill="#29B6F6" />
      <rect x="75" y="145" width="50" height="35" fill="#26A69A" />
    </g>
  
    </svg>
`;
