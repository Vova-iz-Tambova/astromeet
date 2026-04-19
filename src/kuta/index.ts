// Главный экспорт всех модулей Кута

// Типы
export * from './types';

// Константы
export * from './constants';

// Утилиты
export * from './utils';

// Функции расчета каждого критерия
export { calcVarna } from './varna';
export { calcVashya } from './vashya';
export { calcTara, calcTaraFractional } from './tara';
export { calcYoni } from './yoni';
export { calcGraha } from './grahaMaitri';
export { calcGana, calcGanaFractional } from './gana';
export { calcBhakoot } from './bhakoot';
export { calcNadi } from './nadi';

// Главные функции расчета полной Куты
import { Pada } from '../data/padas';
import { FullKutaResult, KutaCriterion } from './types';
import { roundToTwo, getInterpretation } from './utils';
import { calcVarna } from './varna';
import { calcVashya } from './vashya';
import { calcTara, calcTaraFractional } from './tara';
import { calcYoni } from './yoni';
import { calcGraha } from './grahaMaitri';
import { calcGana, calcGanaFractional } from './gana';
import { calcBhakoot } from './bhakoot';
import { calcNadi } from './nadi';

export function calculateFullKutaInteger(malePada: Pada, femalePada: Pada): FullKutaResult {
  const criteria: KutaCriterion[] = [
    calcVarna(malePada, femalePada),
    calcVashya(malePada, femalePada),
    calcTara(malePada, femalePada),
    calcYoni(malePada, femalePada),
    calcGraha(malePada, femalePada),
    calcGana(malePada, femalePada),
    calcBhakoot(malePada, femalePada),
    calcNadi(malePada, femalePada),
  ];
  const totalScore = criteria.reduce((sum, c) => sum + c.score, 0);
  return buildResult(totalScore, criteria);
}

export function calculateFullKutaFractional(malePada: Pada, femalePada: Pada): FullKutaResult {
  const criteria: KutaCriterion[] = [
    calcVarna(malePada, femalePada),
    calcVashya(malePada, femalePada),
    calcTaraFractional(malePada, femalePada),
    calcYoni(malePada, femalePada),
    calcGraha(malePada, femalePada),
    calcGanaFractional(malePada, femalePada),
    calcBhakoot(malePada, femalePada),
    calcNadi(malePada, femalePada),
  ];
  const totalScore = roundToTwo(criteria.reduce((sum, c) => sum + c.score, 0));
  return buildResult(totalScore, criteria);
}

function buildResult(totalScore: number, criteria: KutaCriterion[]): FullKutaResult {
  const { interpretation, recommendation } = getInterpretation(totalScore);
  return { totalScore, maxTotalScore: 36, criteria, interpretation, recommendation };
}

// Экспорт по умолчанию (дробная версия)
export const calculateFullKuta = calculateFullKutaFractional;
