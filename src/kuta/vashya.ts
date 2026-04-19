import { Pada } from '../data/padas';
import { KutaCriterion } from './types';
import { makeCriterion } from './utils';

// 2. Вашья (2 балла)
export function calcVashya(m: Pada, f: Pada): KutaCriterion {
  const score = m.vashya === f.vashya ? 2 : 0;
  const favorable = score === 2;
  return makeCriterion('Васья', score, 2, favorable, m, f, { male: m.vashya, female: f.vashya });
}
