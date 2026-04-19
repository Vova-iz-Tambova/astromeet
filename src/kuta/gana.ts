import { Pada } from '../data/padas';
import { KutaCriterion, Gana } from './types';
import { makeCriterion, roundToTwo } from './utils';

// Таблица Гана (классическая симметричная)
export const GANA_SCORE: Record<Gana, Record<Gana, number>> = {
  'Дева':     { 'Дева': 6, 'Манушья': 6, 'Ракшаса': 0 },
  'Манушья':  { 'Дева': 6, 'Манушья': 6, 'Ракшаса': 0 },
  'Ракшаса':  { 'Дева': 0, 'Манушья': 0, 'Ракшаса': 6 },
};

// Коэффициенты Гана для дробной версии
export const GANA_COEFFICIENTS: Record<Gana, Record<Gana, number>> = {
  'Дева':     { 'Дева': 1.0, 'Манушья': 1.0, 'Ракшаса': 0.0 },
  'Манушья':  { 'Дева': 1.0, 'Манушья': 1.0, 'Ракшаса': 0.0 },
  'Ракшаса':  { 'Дева': 0.0, 'Манушья': 0.0, 'Ракшаса': 1.0 },
};

// 6. Гана (6 баллов) - классический симметричный
export function calcGana(m: Pada, f: Pada): KutaCriterion {
  const score = GANA_SCORE[m.gana as Gana]?.[f.gana as Gana] ?? 0;
  const favorable = score >= 5;
  return makeCriterion('Гана', score, 6, favorable, m, f, { male: m.gana, female: f.gana });
}

// 6b. Гана дробная (для Fractional версии) - строгая, соответствует классике
export function calcGanaFractional(m: Pada, f: Pada): KutaCriterion {
  const coefficient = GANA_COEFFICIENTS[m.gana as Gana]?.[f.gana as Gana] ?? 0;
  const score = roundToTwo(coefficient * 6);
  const favorable = score >= 5;
  return makeCriterion('Гана', score, 6, favorable, m, f, { male: m.gana, female: f.gana });
}
