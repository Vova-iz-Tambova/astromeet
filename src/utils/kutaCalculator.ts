export interface KutaResult {
  type: 'Маитри' | 'Самья' | 'Смешанный' | 'Конфликтный' | 'Критический';
  percentage: number;
  description: string;
  recommendations: string;
  diff: number; // разница в накшатрах (1-27)
}

// Типы совместимости и их диапазоны процентов
const KUTA_TYPES = [
  { type: 'Критический' as const, min: 0, max: 9 },
  { type: 'Конфликтный' as const, min: 10, max: 29 },
  { type: 'Смешанный' as const, min: 30, max: 49 },
  { type: 'Самья' as const, min: 50, max: 79 },
  { type: 'Маитри' as const, min: 80, max: 100 },
];

// Описания и рекомендации для каждого типа
const TYPE_DETAILS: Record<KutaResult['type'], { description: string; recommendations: string }> = {
  'Маитри': {
    description: 'Идеальная гармония. Партнеры поддерживают друг друга.',
    recommendations: 'Отличная основа для брака. Продолжайте развивать взаимопонимание и уважение.',
  },
  'Самья': {
    description: 'Нейтральные отношения. Требуют осознанной работы.',
    recommendations: 'Развивайте взаимопонимание. Учитесь слушать партнера и находить компромиссы.',
  },
  'Смешанный': {
    description: 'Сложности в коммуникации. Разные темпераменты.',
    recommendations: 'Учитесь принимать различия. Работайте над общими целями и улучшением диалога.',
  },
  'Конфликтный': {
    description: 'Серьезные противоречия. Требуется много усилий.',
    recommendations: 'Обдумайте, готовы ли вы работать над отношениями. Возможна помощь психолога.',
  },
  'Критический': {
    description: 'Крайне неблагоприятно.',
    recommendations: 'Рекомендуется дополнительная консультация астролога для глубокого анализа.',
  },
};

/**
Рассчитывает совместимость КУТ по 108-падовой системе.
@param malePadaId - ID мужской пады (1-108)
@param femalePadaId - ID женской пады (1-108)
@returns Результат расчета КУТ
*/
export function calculateKuta(malePadaId: number, femalePadaId: number): KutaResult {
  // 1. Определяем накшатры и пады
  const maleNakshatra = Math.ceil(malePadaId / 4);
  const malePada = ((malePadaId - 1) % 4) + 1;
  const femaleNakshatra = Math.ceil(femalePadaId / 4);
  const femalePada = ((femalePadaId - 1) % 4) + 1;

  // 2. Разница в накшатрах (1-27)
  let diff = (femaleNakshatra - maleNakshatra + 27) % 27;
  if (diff === 0) diff = 27;

  // 3. Базовая совместимость по Таре (остаток от деления на 9)
  // Остаток 0,2,4,6,8 = благоприятно (90%), иначе = нейтрально (65%)
  const remainder = diff % 9;
  let percentage = (remainder === 0 || remainder === 2 || remainder === 4 || remainder === 6 || remainder === 8) ? 90 : 65;

  // 4. Корректировка по падам (тонкая настройка)
  if (malePada === femalePada) {
    percentage += 5; // одинаковые пады — небольшой бонус
  } else if (Math.abs(malePada - femalePada) === 2) {
    percentage -= 5; // противоположные пады — небольшой минус
  } else if (Math.abs(malePada - femalePada) === 3) {
    percentage -= 10; // максимальное расстояние — минус
  }

  // 5. Ограничиваем проценты 0-100
  percentage = Math.min(100, Math.max(0, percentage));

  // 6. Определяем тип по проценту
  const type = KUTA_TYPES.find(t => percentage >= t.min && percentage <= t.max)?.type || 'Самья';

  // 7. Получаем описание и рекомендации
  const { description, recommendations } = TYPE_DETAILS[type];

  return {
    type,
    percentage,
    description,
    recommendations,
    diff,
  };
}

/**
Вспомогательная функция для получения текстового представления разницы накшатр.
*/
export function getDiffDescription(diff: number): string {
  if (diff === 1) return '1 накшатра';
  if (diff >= 2 && diff <= 4) return `${diff} накшатры`;
  return `${diff} накшатр`;
}

/**
Проверяет, является ли комбинация благоприятной (Маитри или Самья).
*/
export function isFavorable(result: KutaResult): boolean {
  return result.type === 'Маитри' || result.type === 'Самья';
}