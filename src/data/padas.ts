import { NAKSHATRAS, NakshatraData } from './nakshatras';

type Gender = 'male' | 'female';

export interface Pada {
  globalId: number;
  nakshatraId: number;
  padaNumber: number;
  name: string;
  code: string;
  gender: Gender;
  nakshatraName: string;
  varna: NakshatraData['varna'];
  vashya: NakshatraData['vashya'];
  yoniAnimal: NakshatraData['yoniAnimal'];
  yoniGender: NakshatraData['yoniGender'];
  gana: NakshatraData['gana'];
  nadi: NakshatraData['nadi'];
  ruler: NakshatraData['ruler'];
  rashi: number;
}

function padToThreeDigits(n: number): string {
  return n.toString().padStart(3, '0');
}

const BASE_PADAS: Omit<Pada, 'code' | 'gender'>[] = (() => {
  const padas: Omit<Pada, 'code' | 'gender'>[] = [];
  let globalId = 1;

  for (const nakshatra of NAKSHATRAS) {
    for (let padaNumber = 1; padaNumber <= 4; padaNumber++) {
      padas.push({
        globalId,
        nakshatraId: nakshatra.id,
        padaNumber,
        name: `${nakshatra.name}-${padaNumber}`,
        nakshatraName: nakshatra.name,
        varna: nakshatra.varna,
        vashya: nakshatra.vashya,
        yoniAnimal: nakshatra.yoniAnimal,
        yoniGender: nakshatra.yoniGender,
        gana: nakshatra.gana,
        nadi: nakshatra.nadi,
        ruler: nakshatra.ruler,
        rashi: nakshatra.rashi,
      });
      globalId++;
    }
  }

  return padas;
})();

export const MALE_PADAS: Pada[] = BASE_PADAS.map(p => ({
  ...p,
  code: `М${padToThreeDigits(p.globalId)}`,
  gender: 'male',
}));

export const FEMALE_PADAS: Pada[] = BASE_PADAS.map(p => ({
  ...p,
  code: `Д${padToThreeDigits(p.globalId)}`,
  gender: 'female',
}));

export function getPadaById(globalId: number, gender: Gender): Pada | undefined {
  const padas = gender === 'male' ? MALE_PADAS : FEMALE_PADAS;
  return padas.find(p => p.globalId === globalId);
}

export function getPadasByNakshatra(nakshatraId: number, gender: Gender): Pada[] {
  const padas = gender === 'male' ? MALE_PADAS : FEMALE_PADAS;
  return padas.filter(p => p.nakshatraId === nakshatraId);
}