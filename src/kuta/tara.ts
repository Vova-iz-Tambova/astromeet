import { Pada } from '../data/padas';
import { KutaCriterion } from './types';
import { makeCriterion, getNakshatraDiff } from './utils';

// 3. Тара (3 балла) - классический бинарный
export function calcTara(m: Pada, f: Pada): KutaCriterion {
  const diff = getNakshatraDiff(m.nakshatraId, f.nakshatraId);
  const rem = diff % 9;
  const score = (rem % 2 === 1) ? 3 : 0;
  const favorable = score === 3;
  return makeCriterion('Тара', score, 3, favorable, m, f, { diff, rem });
}

// 3b. Тара дробная (для Fractional версии) - строгая: четные = 0
export function calcTaraFractional(m: Pada, f: Pada): KutaCriterion {
  const diff = getNakshatraDiff(m.nakshatraId, f.nakshatraId);
  const rem = diff % 9;
  const score = (rem % 2 === 1) ? 3 : 0;
  const favorable = score === 3;
  return makeCriterion('Тара', score, 3, favorable, m, f, { diff, rem });
}
