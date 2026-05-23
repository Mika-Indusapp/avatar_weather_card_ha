// Contient l'intégralité du dessin vectoriel de l'avatar et de ses vêtements
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
  
    <g class="vetement-tempere">
      <path d="M 72 100 Q 58 122 56 150" stroke="#D4A373" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M 128 100 Q 146 118 148 145" stroke="#D4A373" stroke-width="12" stroke-linecap="round" fill="none" />
      <rect x="75" y="145" width="50" height="75" fill="#78909C" />
      <path d="M 70 100 L 130 100 L 125 150 L 75 150 Z" fill="#EEEEEE" />
      <path d="M 68 98 L 92 98 L 90 150 L 68 145 Z" fill="#D4A373" />
      <path d="M 132 98 L 108 98 L 110 150 L 132 145 Z" fill="#D4A373" />
    </g>
  
    <g class="vetement-coupevent">
      <path d="M 72 100 Q 58 122 56 150" stroke="#26A69A" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M 128 100 Q 146 118 148 145" stroke="#26A69A" stroke-width="12" stroke-linecap="round" fill="none" />
      <rect x="75" y="145" width="50" height="75" fill="#78909C" />
      <path d="M 68 98 L 132 98 L 126 150 L 74 150 Z" fill="#26A69A" rx="4" /> 
      <line x1="100" y1="98" x2="100" y2="150" stroke="#004D40" stroke-width="2" />
    </g>
  
    <g class="vetement-froid">
      <path d="M 72 100 Q 56 122 54 152" stroke="#AB47BC" stroke-width="16" stroke-linecap="round" fill="none" />
      <path d="M 128 100 Q 148 118 150 142" stroke="#AB47BC" stroke-width="16" stroke-linecap="round" fill="none" />
      <rect x="73" y="145" width="54" height="85" fill="#37474F" rx="4" />
      <path d="M 65 95 L 135 95 L 130 195 L 70 195 Z" fill="#AB47BC" rx="8" />
      <line x1="67" y1="125" x2="133" y2="125" stroke="#7B1FA2" stroke-width="2" />
      <line x1="69" y1="160" x2="131" y2="160" stroke="#7B1FA2" stroke-width="2" />
    </g>
    
    <g class="meteo-soleil">
      <rect x="83" y="63" width="15" height="10" fill="#333" rx="2" />
      <rect x="102" y="63" width="15" height="10" fill="#333" rx="2" />
      <line x1="98" y1="66" x2="102" y2="66" stroke="#333" stroke-width="2" />
    </g>
    
    <g class="accessoire-bonnet">
      <path d="M 75 58 Q 100 25 125 58 Z" fill="#FF7043" />
      <rect x="72" y="53" width="56" height="8" fill="#F4511E" rx="3" />
      <circle cx="100" cy="30" r="5" fill="#FFF" />
    </g>
  
    <g class="meteo-pluie">
      <path d="M 148 145 L 148 50 Q 148 45 142 45" stroke="#455A64" stroke-width="3" fill="none" />
      <path d="M 105 50 Q 150 10 195 50 Z" fill="#EF5350" />
    </g>
    
    <g class="meteo-vent">
      <path d="M 20 80 Q 40 75 50 85 M 45 85 L 35 85" stroke="#B0BEC5" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 15 120 Q 30 125 45 115 M 40 115 L 30 115" stroke="#B0BEC5" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  </svg>
`;