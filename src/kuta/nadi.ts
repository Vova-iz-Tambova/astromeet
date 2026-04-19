import { Pada } from '../data/padas';
import { KutaCriterion, NadiType } from './types';
import { makeCriterion } from './utils';

// ==================== КЛАССИЧЕСКАЯ ТАБЛИЦА НАДИ (по накшатрам) ====================
export const NADI_BY_NAKSHATRA: Record<number, NadiType> = {
  1: 'Вата',   // Ашвини
  2: 'Питта',  // Бхарани
  3: 'Капха',  // Криттика
  4: 'Капха',  // Рохини
  5: 'Питта',  // Мригашира
  6: 'Вата',   // Ардра
  7: 'Вата',   // Пунарвасу
  8: 'Питта',  // Пушья
  9: 'Капха',  // Ашлеша
  10: 'Капха', // Магха
  11: 'Питта', // Пурва Пхалгуни
  12: 'Вата',  // Уттара Пхалгуни
  13: 'Вата',  // Хаста
  14: 'Питта', // Читра
  15: 'Капха', // Свати
  16: 'Капха', // Вишакха
  17: 'Питта', // Анурадха
  18: 'Вата',  // Джьештха
  19: 'Вата',  // Мула
  20: 'Питта', // Пурва Ашадха
  21: 'Капха', // Уттара Ашадха
  22: 'Капха', // Шравана
  23: 'Питта', // Дхаништха
  24: 'Вата',  // Шатабхиша
  25: 'Вата',  // Пурва Бхадрапада
  26: 'Питта', // Уттара Бхадрапада
  27: 'Капха', // Ревати
};

// 8. Нади (8 баллов) - классическая таблица по накшатрам
export function calcNadi(m: Pada, f: Pada): KutaCriterion {
  const maleNadi = NADI_BY_NAKSHATRA[m.nakshatraId];
  const femaleNadi = NADI_BY_NAKSHATRA[f.nakshatraId];
  
  if (!maleNadi || !femaleNadi) {
    console.warn(`Nadi not found for nakshatra: ${m.nakshatraId} or ${f.nakshatraId}`);
    const score = m.nadi !== f.nadi ? 8 : 0;
    const favorable = score === 8;
    return makeCriterion('Нади', score, 8, favorable, m, f, {
      male: m.nadi,
      female: f.nadi,
      note: 'Рассчитано по падам (упрощенно)',
    });
  }
  
  const score = maleNadi !== femaleNadi ? 8 : 0;
  const favorable = score === 8;
  
  return makeCriterion('Нади', score, 8, favorable, m, f, {
    male: maleNadi,
    female: femaleNadi,
    note: 'Рассчитано по накшатрам (классическая таблица)',
  });
}
