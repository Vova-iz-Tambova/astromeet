import { Pada } from '../data/padas';
import { KutaCriterion, Varna } from './types';
import { makeCriterion } from './utils';

// Порядок варн для сравнения
export const VARNA_ORDER: Varna[] = ['Брахмин', 'Кшатрий', 'Вайшья', 'Шудра'];

// 1. Варна (1 балл)
export function calcVarna(m: Pada, f: Pada): KutaCriterion {
  const score = VARNA_ORDER.indexOf(m.varna as Varna) <= VARNA_ORDER.indexOf(f.varna as Varna) ? 1 : 0;
  const favorable = score === 1;
  return makeCriterion('Варна', score, 1, favorable, m, f, { male: m.varna, female: f.varna });
}
