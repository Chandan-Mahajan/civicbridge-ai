/**
 * Maharashtra Location Data for CivicBridge AI — Phase 4
 *
 * Covers all 36 districts, major cities/municipalities, and
 * maps cities to their likely civic authority.
 */

export const MAHARASHTRA_STATE = 'Maharashtra';

/** All 36 districts of Maharashtra */
export const MAHARASHTRA_DISTRICTS: string[] = [
  'Ahmednagar',
  'Akola',
  'Amravati',
  'Aurangabad (Chhatrapati Sambhajinagar)',
  'Beed',
  'Bhandara',
  'Buldhana',
  'Chandrapur',
  'Dhule',
  'Gadchiroli',
  'Gondia',
  'Hingoli',
  'Jalgaon',
  'Jalna',
  'Kolhapur',
  'Latur',
  'Mumbai City',
  'Mumbai Suburban',
  'Nagpur',
  'Nanded',
  'Nandurbar',
  'Nashik',
  'Osmanabad (Dharashiv)',
  'Palghar',
  'Parbhani',
  'Pune',
  'Raigad',
  'Ratnagiri',
  'Sangli',
  'Satara',
  'Sindhudurg',
  'Solapur',
  'Thane',
  'Wardha',
  'Washim',
  'Yavatmal',
];

/**
 * Major cities and municipalities per district.
 * The first entry in each array is the primary/largest city.
 */
export const CITIES_BY_DISTRICT: Record<string, string[]> = {
  'Pune': [
    'Pune (PMC)',
    'Pimpri-Chinchwad (PCMC)',
    'Hinjawadi (PMRDA)',
    'Wagholi (PMRDA)',
    'Talegaon Dabhade',
    'Lonavala',
    'Khadki (Cantonment)',
    'Dehu Road (Cantonment)',
  ],
  'Mumbai City': [
    'Mumbai (BMC / MCGM)',
    'South Mumbai',
    'Central Mumbai',
  ],
  'Mumbai Suburban': [
    'Andheri',
    'Borivali',
    'Ghatkopar',
    'Kurla',
    'Malad',
    'Kandivali',
  ],
  'Thane': [
    'Thane (TMC)',
    'Navi Mumbai (NMMC)',
    'Kalyan-Dombivli (KDMC)',
    'Bhiwandi-Nizampur (BNCMC)',
    'Mira-Bhayandar (MBMC)',
    'Ulhasnagar (UMC)',
    'Ambarnath',
    'Badlapur',
  ],
  'Nashik': [
    'Nashik (NMC)',
    'Malegaon',
    'Igatpuri',
    'Sinnar',
    'Niphad',
  ],
  'Nagpur': [
    'Nagpur (NMC)',
    'Hingna',
    'Kamptee',
    'Butibori',
    'Wardha Road Belt',
  ],
  'Aurangabad (Chhatrapati Sambhajinagar)': [
    'Chhatrapati Sambhajinagar (CSMC)',
    'Paithan',
    'Waluj',
    'Gangapur',
  ],
  'Kolhapur': [
    'Kolhapur (KMC)',
    'Ichalkaranji',
    'Jaysingpur',
    'Radhanagari',
  ],
  'Solapur': [
    'Solapur (SMC)',
    'Pandharpur',
    'Barshi',
    'Akkalkot',
  ],
  'Sangli': [
    'Sangli-Miraj-Kupwad (SMKMC)',
    'Islampur',
    'Vita',
  ],
  'Satara': [
    'Satara',
    'Karad',
    'Panchgani',
    'Mahabaleshwar',
  ],
  'Raigad': [
    'Panvel (PCNT / NMMC)',
    'Alibag',
    'Pen',
    'Khopoli',
    'Uran',
  ],
  'Jalgaon': [
    'Jalgaon (JMC)',
    'Bhusawal',
    'Amalner',
    'Chalisgaon',
  ],
  'Ahmednagar': [
    'Ahmednagar (ANMC)',
    'Shirdi',
    'Kopargaon',
    'Shrirampur',
    'Sangamner',
  ],
  'Amravati': [
    'Amravati (AMC)',
    'Achalpur',
    'Badnera',
  ],
  'Nanded': [
    'Nanded-Waghala (NWMC)',
    'Kandhar',
    'Biloli',
  ],
  'Latur': [
    'Latur (LMC)',
    'Nilanga',
    'Udgir',
  ],
  'Akola': [
    'Akola (AkMC)',
    'Balapur',
    'Telhara',
  ],
  'Dhule': [
    'Dhule (DMC)',
    'Shirpur',
  ],
  'Palghar': [
    'Palghar',
    'Vasai-Virar (VVMC)',
    'Boisar',
    'Dahanu',
  ],
  'Ratnagiri': [
    'Ratnagiri',
    'Chiplun',
    'Khed',
  ],
  'Sindhudurg': [
    'Sindhudurg (Oros)',
    'Malvan',
    'Kudal',
    'Sawantwadi',
  ],
  'Chandrapur': [
    'Chandrapur (CNMC)',
    'Ballarpur',
    'Gondpipri',
  ],
  'Wardha': [
    'Wardha',
    'Hinganghat',
    'Sewagram',
  ],
  'Yavatmal': [
    'Yavatmal',
    'Wani',
    'Pusad',
  ],
  'Buldhana': [
    'Buldhana',
    'Malkapur',
    'Khamgaon',
    'Chikhli',
  ],
  'Beed': [
    'Beed',
    'Ambajogai',
    'Parli Vaijnath',
  ],
  'Osmanabad (Dharashiv)': [
    'Osmanabad (Dharashiv)',
    'Tuljapur',
    'Omerga',
  ],
  'Hingoli': [
    'Hingoli',
    'Basmath',
  ],
  'Jalna': [
    'Jalna',
    'Ambad',
    'Partur',
  ],
  'Parbhani': [
    'Parbhani',
    'Manwath',
    'Gangakhed',
  ],
  'Nandurbar': [
    'Nandurbar',
    'Shahada',
    'Navapur',
  ],
  'Bhandara': [
    'Bhandara',
    'Tumsar',
    'Sakoli',
  ],
  'Gondia': [
    'Gondia',
    'Tirora',
    'Deori',
  ],
  'Gadchiroli': [
    'Gadchiroli',
    'Chamorshi',
    'Kurkheda',
  ],
  'Washim': [
    'Washim',
    'Karanja (Ghad)',
    'Mangrulpir',
  ],
};

/**
 * Suggests likely civic authority text for a given city name.
 * Returns a hint string, not an authoritative determination.
 */
export function suggestAuthorityForCity(city: string): string | null {
  const c = city.toLowerCase();
  if (c.includes('pmc') || c.includes('pune (pmc)')) return 'Pune Municipal Corporation (PMC)';
  if (c.includes('pcmc') || c.includes('pimpri') || c.includes('chinchwad')) return 'Pimpri-Chinchwad Municipal Corporation (PCMC)';
  if (c.includes('pmrda') || c.includes('hinjawadi') || c.includes('wagholi')) return 'Pune Metropolitan Region Development Authority (PMRDA)';
  if (c.includes('bmc') || c.includes('mcgm') || c.includes('mumbai')) return 'Brihanmumbai Municipal Corporation (BMC/MCGM)';
  if (c.includes('nmmc') || c.includes('navi mumbai') || c.includes('panvel')) return 'Navi Mumbai Municipal Corporation (NMMC)';
  if (c.includes('nmc') || c.includes('nagpur')) return 'Nagpur Municipal Corporation (NMC)';
  if (c.includes('kdmc') || c.includes('kalyan') || c.includes('dombivli')) return 'Kalyan-Dombivli Municipal Corporation (KDMC)';
  if (c.includes('tmc') || c.includes('thane (')) return 'Thane Municipal Corporation (TMC)';
  if (c.includes('vvmc') || c.includes('vasai') || c.includes('virar')) return 'Vasai-Virar City Municipal Corporation (VVMC)';
  if (c.includes('mbmc') || c.includes('mira') || c.includes('bhayandar')) return 'Mira-Bhayandar Municipal Corporation (MBMC)';
  if (c.includes('csmc') || c.includes('sambhajinagar') || c.includes('aurangabad')) return 'Chhatrapati Sambhajinagar Municipal Corporation (CSMC)';
  return null;
}

/** Areas / localities commonly mentioned in Pune — used in datalist suggestions */
export const PUNE_AREAS: string[] = [
  'Baner - Balewadi',
  'Aundh',
  'Kothrud',
  'Shivajinagar',
  'Erandwane - Deccan Gymkhana',
  'FC Road - Model Colony',
  'Hadapsar - Magarpatta',
  'Viman Nagar - Nagar Road',
  'Kharadi',
  'Kalyani Nagar - Yerawada',
  'Camp - Pune Cantonment',
  'Bibwewadi - Dhankawadi',
  'Sinhagad Road - Anandnagar',
  'Katraj - Ambegaon',
  'Kasba Peth - Vishrambaug',
  'Bhavani Peth',
  'Wakad',
  'Hinjawadi Phase 1',
  'Hinjawadi Phase 2',
  'Hinjawadi Phase 3',
  'Pimple Saudagar',
  'Pimple Nilakh',
  'Chinchwad - Thergaon',
  'Nigdi - Pradhikaran',
  'Bhosari',
  'Ravet - Kiwale',
];
