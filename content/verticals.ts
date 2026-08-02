import type { Vertical } from './types';

/* ── Verticales (Services) · v2 ── (portado tal cual del array VERT) */
export const VERTICALS: Vertical[] = [
  {
    id: 'residences', title: 'Private Residences',
    sub: 'Not just homes — portraits in stone, glass and light.',
    intro: 'A home is the only project where the client lives inside the result every day. Scene control is not a feature here; it is the whole point.',
    narr: {
      1: 'We read the house before we light it: the material palette, the daylight it receives, the hours each room is actually used.',
      2: 'Residential drawings change constantly as the client lives with the idea. We hold the lighting intent steady through every revision.',
      3: 'A house is commissioned at night, dimmed to the level people really use.'
    }
  },
  {
    id: 'multifamily', title: 'Multifamily',
    sub: 'From lobby to penthouse — one identity, held across every shared space.',
    intro: 'A tower is bought on the way in. Lobby, lift lobby, amenity floor and model unit have to speak one language, delivered on programme.',
    narr: {
      1: 'We set a single lighting identity and prove it holds from the entrance canopy to the top-floor terrace.',
      2: 'Multifamily runs on coordination — architecture, interiors, MEP, façade. Change management is most of the work.',
      3: 'Common areas are commissioned before handover to sales, because the lobby is the sales tool.'
    }
  },
  {
    id: 'hospitality', title: 'Hospitality',
    sub: 'Reliability at scale — the same on night four hundred as on night one.',
    intro: 'Consistency across dozens of identical rooms and a signature moment in every public space. Both at once, on an operator’s maintenance budget.',
    narr: {
      1: 'We design the guest journey as a sequence of atmospheres, and design the room type once so it repeats perfectly.',
      2: 'Operators change FF&E mid-build. We keep the lighting scheme intact through it.',
      3: 'We commission with the operations team present, so staff can hold the scheme after we leave.'
    }
  },
  {
    id: 'commercial', title: 'Commercial',
    sub: 'Adaptability — spaces that change function between opening and closing.',
    intro: 'Retail lighting has to render product honestly and flatter the architecture at once. On a reflective surface, those two goals fight each other.',
    narr: {
      1: 'We start from what the product does to light — a car body reflects, textile absorbs, glass transmits — and design backwards.',
      2: 'Brand standards and local regulation both apply. We reconcile them before they reach site.',
      3: 'We calibrate on the real merchandise, not on an empty floor.'
    }
  },
  {
    id: 'cultural', title: 'Cultural & Venues',
    sub: 'Arrival, circulation and atmosphere — everything around the performance.',
    intro: 'A venue is lit for movement and for the moment the programme begins. The architecture has to be legible at scale, then step back completely.',
    narr: {
      1: 'We plan the venue as a sequence: approach, entry, circulation, the space itself, the exit at night.',
      2: 'Programming changes late and often. The scheme has to absorb it.',
      3: 'We are on site through load-in and through the first event.'
    }
  },
  {
    id: 'aviation', title: 'Aviation',
    sub: 'From the ground to the skies — a personal environment at forty thousand feet.',
    intro: 'In aviation design, certification is a key factor. Every component must carry a certified part number and full documentation, and all materials must comply with strict fire safety regulation.',
    narr: {
      1: 'We specify within the certification envelope from the first sketch — weight, flammability, part numbers.',
      2: 'Every element is checked and approved by an aviation expert before it enters the cabin.',
      3: 'Cabin commissioning happens on the aircraft, tuned for altitude and time zones.'
    }
  },
  {
    id: 'yachts', title: 'Yachts',
    sub: 'Salt, movement, and no tolerance for glare on glass at night.',
    intro: 'A yacht is a house that moves through the most corrosive environment on earth. Everything near open water fails eventually — the question is year two or year twelve.',
    narr: {
      1: 'We specify marine-grade throughout and design for the fact that every surface is glass, gloss or water at night.',
      2: 'Yard schedules move. The lighting package has to be ready when the yard is.',
      3: 'Commissioning happens at sea, at night, with the vessel in motion.'
    }
  }
];
