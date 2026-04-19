import { Pada } from '../data/padas';
import { KutaCriterion } from './types';
import { makeCriterion, getRashiDiff } from './utils';

// ==================== БХАККУТ ====================

// ШИРОКИЙ СПИСОК НЕБЛАГОПРИЯТНЫХ ПОЗИЦИЙ (максимально приближен к Grahas)
// Неблагоприятны все позиции, кроме 3, 4, 10
export const INAUSPICIOUS_BHAKOOT_DIFFS = [1, 2, 5, 6, 7, 8, 9, 11, 12];

// 7. Бхаккут (7 баллов)
export function calcBhakoot(m: Pada, f: Pada): KutaCriterion {
  const diff = getRashiDiff(m.rashi, f.rashi);
  const isDosha = INAUSPICIOUS_BHAKOOT_DIFFS.includes(diff);
  const score = isDosha ? 0 : 7;
  const favorable = score === 7;
  
  let rule = '';
  if (isDosha) {
    rule = `Доша: позиция ${diff}`;
  } else {
    rule = `Благоприятная позиция (разница ${diff} знаков)`;
  }
  
  return makeCriterion('Бхаккут', score, 7, favorable, m, f, { diff, rule });
}