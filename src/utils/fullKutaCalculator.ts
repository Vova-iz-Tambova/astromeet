import { Pada } from '../data/padas';
import { getExplanationForCriterion } from '../data/kutaExplanations';

// Результат по одному критерию КУТ
export interface KutaCriterion {
  name: string;           // название критерия (Варна, Васья, ...)
  score: number;          // набранные баллы (0, 1, 2, ...)
  maxScore: number;       // максимальный балл для этого критерия
  description: string;    // текстовое описание результата
  favorable: boolean;     // благоприятный ли результат
  // Новые поля для пояснений
  benefits?: string;      // Что даёт данная благоприятность
  challenges?: string;    // Какие трудности могут возникнуть
  tips?: string;         // Практические рекомендации
}

// Полный результат расчета КУТ
export interface FullKutaResult {
  totalScore: number;     // сумма баллов (0-36)
  maxTotalScore: number;  // 36
  criteria: KutaCriterion[]; // детали по каждому критерию
  interpretation: string; // интерпретация общей суммы
  recommendation: string; // общая рекомендация
}

// Вспомогательные типы
type Varna = 'Брахмин' | 'Кшатрий' | 'Вайшья' | 'Шудра';
type Gana = 'Дева' | 'Манушья' | 'Ракшаса';

// Порядок варн (от высшей к низшей)
const VARNA_ORDER: Varna[] = ['Брахмин', 'Кшатрий', 'Вайшья', 'Шудра'];

// Таблица дружбы планет для Граха Майтри (0-5 баллов)
const GRAHA_FRIENDSHIP: Record<string, Record<string, number>> = {
  'Солнце':   { 'Солнце': 5, 'Луна': 4, 'Марс': 4, 'Меркурий': 2, 'Юпитер': 4, 'Венера': 1, 'Сатурн': 0, 'Раху': 2, 'Кету': 2 },
  'Луна':     { 'Солнце': 4, 'Луна': 5, 'Марс': 3, 'Меркурий': 4, 'Юпитер': 4, 'Венера': 3, 'Сатурн': 2, 'Раху': 2, 'Кету': 2 },
  'Марс':     { 'Солнце': 4, 'Луна': 3, 'Марс': 5, 'Меркурий': 1, 'Юпитер': 3, 'Венера': 0, 'Сатурн': 2, 'Раху': 2, 'Кету': 2 },
  'Меркурий': { 'Солнце': 2, 'Луна': 4, 'Марс': 1, 'Меркурий': 5, 'Юпитер': 4, 'Венера': 4, 'Сатурн': 2, 'Раху': 2, 'Кету': 2 },
  'Юпитер':   { 'Солнце': 4, 'Луна': 4, 'Марс': 3, 'Меркурий': 4, 'Юпитер': 5, 'Венера': 2, 'Сатурн': 2, 'Раху': 2, 'Кету': 2 },
  'Венера':   { 'Солнце': 1, 'Луна': 3, 'Марс': 0, 'Меркурий': 4, 'Юпитер': 2, 'Венера': 5, 'Сатурн': 4, 'Раху': 2, 'Кету': 2 },
  'Сатурн':   { 'Солнце': 0, 'Луна': 2, 'Марс': 2, 'Меркурий': 2, 'Юпитер': 2, 'Венера': 4, 'Сатурн': 5, 'Раху': 3, 'Кету': 3 },
  'Раху':     { 'Солнце': 2, 'Луна': 2, 'Марс': 2, 'Меркурий': 2, 'Юпитер': 2, 'Венера': 2, 'Сатурн': 3, 'Раху': 5, 'Кету': 4 },
  'Кету':     { 'Солнце': 2, 'Луна': 2, 'Марс': 2, 'Меркурий': 2, 'Юпитер': 2, 'Венера': 2, 'Сатурн': 3, 'Раху': 4, 'Кету': 5 },
};

// Матрица совместимости Йони (животных) — упрощённая версия
// 4 = одинаковые, 3 = друзья, 2 = нейтралы, 1 = враги, 0 = естественные враги
const YONI_COMPATIBILITY: Record<string, Record<string, number>> = {
  'Лошадь':  { 'Лошадь': 4, 'Слон': 2, 'Овца': 2, 'Змея': 1, 'Собака': 1, 'Кошка': 1, 'Крыса': 0, 'Корова': 2, 'Буйвол': 2, 'Тигр': 0, 'Заяц': 2, 'Обезьяна': 2, 'Мангуст': 1, 'Лев': 0 },
  'Слон':    { 'Лошадь': 2, 'Слон': 4, 'Овца': 3, 'Змея': 2, 'Собака': 2, 'Кошка': 2, 'Крыса': 1, 'Корова': 3, 'Буйвол': 3, 'Тигр': 1, 'Заяц': 2, 'Обезьяна': 2, 'Мангуст': 2, 'Лев': 2 },
  'Овца':    { 'Лошадь': 2, 'Слон': 3, 'Овца': 4, 'Змея': 2, 'Собака': 2, 'Кошка': 1, 'Крыса': 1, 'Корова': 3, 'Буйвол': 3, 'Тигр': 0, 'Заяц': 3, 'Обезьяна': 2, 'Мангуст': 1, 'Лев': 1 },
  'Змея':    { 'Лошадь': 1, 'Слон': 2, 'Овца': 2, 'Змея': 4, 'Собака': 1, 'Кошка': 2, 'Крыса': 1, 'Корова': 1, 'Буйвол': 1, 'Тигр': 2, 'Заяц': 0, 'Обезьяна': 1, 'Мангуст': 3, 'Лев': 2 },
  'Собака':  { 'Лошадь': 1, 'Слон': 2, 'Овца': 2, 'Змея': 1, 'Собака': 4, 'Кошка': 0, 'Крыса': 2, 'Корова': 2, 'Буйвол': 2, 'Тигр': 1, 'Заяц': 2, 'Обезьяна': 2, 'Мангуст': 2, 'Лев': 1 },
  'Кошка':   { 'Лошадь': 1, 'Слон': 2, 'Овца': 1, 'Змея': 2, 'Собака': 0, 'Кошка': 4, 'Крыса': 3, 'Корова': 1, 'Буйвол': 1, 'Тигр': 2, 'Заяц': 2, 'Обезьяна': 2, 'Мангуст': 2, 'Лев': 1 },
  'Крыса':   { 'Лошадь': 0, 'Слон': 1, 'Овца': 1, 'Змея': 1, 'Собака': 2, 'Кошка': 3, 'Крыса': 4, 'Корова': 1, 'Буйвол': 1, 'Тигр': 0, 'Заяц': 3, 'Обезьяна': 2, 'Мангуст': 2, 'Лев': 1 },
  'Корова':  { 'Лошадь': 2, 'Слон': 3, 'Овца': 3, 'Змея': 1, 'Собака': 2, 'Кошка': 1, 'Крыса': 1, 'Корова': 4, 'Буйвол': 4, 'Тигр': 0, 'Заяц': 2, 'Обезьяна': 2, 'Мангуст': 1, 'Лев': 1 },
  'Буйвол':  { 'Лошадь': 2, 'Слон': 3, 'Овца': 3, 'Змея': 1, 'Собака': 2, 'Кошка': 1, 'Крыса': 1, 'Корова': 4, 'Буйвол': 4, 'Тигр': 1, 'Заяц': 2, 'Обезьяна': 2, 'Мангуст': 2, 'Лев': 2 },
  'Тигр':    { 'Лошадь': 0, 'Слон': 1, 'Овца': 0, 'Змея': 2, 'Собака': 1, 'Кошка': 2, 'Крыса': 0, 'Корова': 0, 'Буйвол': 1, 'Тигр': 4, 'Заяц': 1, 'Обезьяна': 1, 'Мангуст': 2, 'Лев': 3 },
  'Заяц':    { 'Лошадь': 2, 'Слон': 2, 'Овца': 3, 'Змея': 0, 'Собака': 2, 'Кошка': 2, 'Крыса': 3, 'Корова': 2, 'Буйвол': 2, 'Тигр': 1, 'Заяц': 4, 'Обезьяна': 2, 'Мангуст': 1, 'Лев': 1 },
  'Обезьяна':{ 'Лошадь': 2, 'Слон': 2, 'Овца': 2, 'Змея': 1, 'Собака': 2, 'Кошка': 2, 'Крыса': 2, 'Корова': 2, 'Буйвол': 2, 'Тигр': 1, 'Заяц': 2, 'Обезьяна': 4, 'Мангуст': 2, 'Лев': 2 },
  'Мангуст': { 'Лошадь': 1, 'Слон': 2, 'Овца': 1, 'Змея': 3, 'Собака': 2, 'Кошка': 2, 'Крыса': 2, 'Корова': 1, 'Буйвол': 2, 'Тигр': 2, 'Заяц': 1, 'Обезьяна': 2, 'Мангуст': 4, 'Лев': 2 },
  'Лев':     { 'Лошадь': 0, 'Слон': 2, 'Овца': 1, 'Змея': 2, 'Собака': 1, 'Кошка': 1, 'Крыса': 1, 'Корова': 1, 'Буйвол': 2, 'Тигр': 3, 'Заяц': 1, 'Обезьяна': 2, 'Мангуст': 2, 'Лев': 4 },
};

/**
Рассчитывает полную систему КУТ (8 критериев, 36 баллов)
@param malePada - объект мужской пады
@param femalePada - объект женской пады
@returns FullKutaResult
*/
export function calculateFullKuta(malePada: Pada, femalePada: Pada): FullKutaResult {
  const criteria: KutaCriterion[] = [
    calculateVarnaKuta(malePada, femalePada),
    calculateVashyaKuta(malePada, femalePada),
    calculateTaraKuta(malePada, femalePada),
    calculateYoniKuta(malePada, femalePada),
    calculateGrahaMaitriKuta(malePada, femalePada),
    calculateGanaKuta(malePada, femalePada),
    calculateBhakootKuta(malePada, femalePada),
    calculateNadiKuta(malePada, femalePada),
  ];

  const totalScore = criteria.reduce((sum, c) => sum + c.score, 0);
  const maxTotalScore = 36;
  const { interpretation, recommendation } = getInterpretation(totalScore);

  return {
    totalScore,
    maxTotalScore,
    criteria,
    interpretation,
    recommendation,
  };
}

// 1. Варна Кута (1 балл)
function calculateVarnaKuta(male: Pada, female: Pada): KutaCriterion {
  const maleIndex = VARNA_ORDER.indexOf(male.varna);
  const femaleIndex = VARNA_ORDER.indexOf(female.varna);
  const score = maleIndex <= femaleIndex ? 1 : 0; // мужская варна выше или равна женской
  const favorable = score === 1;
  const explanation = getExplanationForCriterion('Варна', favorable);

  return {
    name: 'Варна',
    score,
    maxScore: 1,
    description: score === 1
      ? `Мужская варна (${male.varna}) выше или равна женской (${female.varna})`
      : `Мужская варна (${male.varna}) ниже женской (${female.varna})`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// 2. Васья Кута (2 балла)
function calculateVashyaKuta(male: Pada, female: Pada): KutaCriterion {
  const score = male.vashya === female.vashya ? 2 : 0;
  const favorable = score === 2;
  const explanation = getExplanationForCriterion('Васья', favorable);

  return {
    name: 'Васья',
    score,
    maxScore: 2,
    description: score === 2
      ? `Одинаковая Васья (${male.vashya})`
      : `Разные Васьи (${male.vashya} vs ${female.vashya})`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// 3. Тара / Дина Кута (3 балла)
function calculateTaraKuta(male: Pada, female: Pada): KutaCriterion {
  // Разница в накшатрах (1-27)
  let diff = (female.nakshatraId - male.nakshatraId + 27) % 27;
  if (diff === 0) diff = 27;

  // Остаток от деления на 9
  const remainder = diff % 9;
  // Баллы: остаток 0,2,4,6,8 дают 3 балла
  const score = (remainder === 0 || remainder === 2 || remainder === 4 || remainder === 6 || remainder === 8) ? 3 : 0;
  const favorable = score === 3;
  const explanation = getExplanationForCriterion('Тара', favorable);

  return {
    name: 'Тара',
    score,
    maxScore: 3,
    description: score === 3
      ? `Благоприятная разница накшатр (${diff}, остаток ${remainder})`
      : `Неблагоприятная разница накшатр (${diff}, остаток ${remainder})`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// 4. Йони Кута (4 балла) — с матрицей совместимости
function calculateYoniKuta(male: Pada, female: Pada): KutaCriterion {
  const matrix = YONI_COMPATIBILITY[male.yoniAnimal];
  const baseScore = matrix ? matrix[female.yoniAnimal] ?? 0 : 0;
  
  // Конвертируем 0-4 в баллы Кута: 4→4, 3→3, 2→2, 1→1, 0→0
  const score = baseScore;
  const favorable = score >= 2;
  const explanation = getExplanationForCriterion('Йони', favorable);

  return {
    name: 'Йони',
    score,
    maxScore: 4,
    description: `Животные Йони: ${male.yoniAnimal} + ${female.yoniAnimal} (совместимость: ${baseScore}/4)`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// 5. Граха Маитри (5 баллов) — с таблицей дружбы планет
function calculateGrahaMaitriKuta(male: Pada, female: Pada): KutaCriterion {
  const friendshipTable = GRAHA_FRIENDSHIP[male.ruler];
  const score = friendshipTable ? friendshipTable[female.ruler] ?? 0 : 0;
  const favorable = score >= 3;
  const explanation = getExplanationForCriterion('Граха Маитри', favorable);

  return {
    name: 'Граха Маитри',
    score,
    maxScore: 5,
    description: `Управители: ${male.ruler} + ${female.ruler} (дружба: ${score}/5)`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// 6. Гана Кута (6 баллов)
function calculateGanaKuta(male: Pada, female: Pada): KutaCriterion {
  // Таблица баллов из описания
  const ganaTable: Record<Gana, Record<Gana, number>> = {
    'Дева': { 'Дева': 6, 'Манушья': 6, 'Ракшаса': 1 },
    'Манушья': { 'Дева': 6, 'Манушья': 5, 'Ракшаса': 0 },
    'Ракшаса': { 'Дева': 0, 'Манушья': 0, 'Ракшаса': 6 },
  };
  const score = ganaTable[male.gana][female.gana];
  const favorable = score >= 5;
  const explanation = getExplanationForCriterion('Гана', favorable);

  return {
    name: 'Гана',
    score,
    maxScore: 6,
    description: `Мужская гана ${male.gana}, женская гана ${female.gana}`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// 7. Бхаккут / Раши Кута (7 баллов) — ИСПРАВЛЕНО: считаем по знакам зодиака!
function calculateBhakootKuta(male: Pada, female: Pada): KutaCriterion {
  // Считаем разницу по знакам зодиака (1-12), а не по накшатрам!
  const maleRashi = male.rashi;   // 1-12
  const femaleRashi = female.rashi; // 1-12
  
  let diff = (femaleRashi - maleRashi + 12) % 12;
  if (diff === 0) diff = 12;
  
  // Доши Бхакута: позиции 6/8, 12/1, 2/12 (diff = 6, 8, 12, 2)
  const doshaPositions = [2, 6, 8, 12];
  const score = doshaPositions.includes(diff) ? 0 : 7;
  const favorable = score === 7;
  const explanation = getExplanationForCriterion('Бхаккут', favorable);

  return {
    name: 'Бхаккут',
    score,
    maxScore: 7,
    description: favorable
      ? `Благоприятное положение знаков (разница ${diff})`
      : `Неблагоприятное положение знаков (разница ${diff}) — Бхакут-доша`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// 8. Нади Кута (8 баллов)
function calculateNadiKuta(male: Pada, female: Pada): KutaCriterion {
  const score = male.nadi !== female.nadi ? 8 : 0;
  const favorable = score === 8;
  const explanation = getExplanationForCriterion('Нади', favorable);

  return {
    name: 'Нади',
    score,
    maxScore: 8,
    description: score === 8
      ? `Нади разные (${male.nadi} vs ${female.nadi}) - благоприятно`
      : `Нади одинаковые (${male.nadi}) - неблагоприятно (Нади-доша)`,
    favorable,
    benefits: explanation.benefits,
    challenges: explanation.challenges,
    tips: explanation.recommendations,
  };
}

// Интерпретация общей суммы баллов
function getInterpretation(totalScore: number): { interpretation: string; recommendation: string } {
  if (totalScore >= 25) {
    return {
      interpretation: 'Отлично',
      recommendation: 'Идеальная совместимость. Брак рекомендуется.',
    };
  } else if (totalScore >= 18) {
    return {
      interpretation: 'Хорошо',
      recommendation: 'Брак возможен, требуется работа над отношениями.',
    };
  } else if (totalScore >= 13) {
    return {
      interpretation: 'Средне',
      recommendation: 'Требуется значительная работа над отношениями.',
    };
  } else if (totalScore >= 7) {
    return {
      interpretation: 'Низко',
      recommendation: 'Сложные отношения, брак не рекомендуется без коррекции.',
    };
  } else {
    return {
      interpretation: 'Несовместимы',
      recommendation: 'Брак не рекомендуется. Рассмотрите альтернативы.',
    };
  }
}