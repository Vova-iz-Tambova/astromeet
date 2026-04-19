import { Pada } from '../data/padas';
import { KutaCriterion } from './types';
import { getExplanationForCriterion } from '../data/kutaExplanations';

// Утилиты для вычисления разниц
export function getNakshatraDiff(mId: number, fId: number): number {
  const d = (fId - mId + 27) % 27;
  return d === 0 ? 27 : d;
}

export function getRashiDiff(mR: number, fR: number): number {
  const diff = (fR - mR + 12) % 12;
  if (diff === 0) return 1;
  return diff;
}

export function roundToTwo(num: number): number {
  return Math.round(num * 100) / 100;
}

// Функция создания критерия (аналог makeCriterion из оригинального файла)
export function makeCriterion(
  name: string,
  score: number,
  max: number,
  favorable: boolean,
  m: Pada,
  f: Pada,
  meta?: Record<string, unknown>
): KutaCriterion {
  const expl = getExplanationForCriterion(name, favorable);
  
  let description = '';
  switch (name) {
    case 'Варна':
      description = `${m.varna} → ${f.varna}`;
      break;
    case 'Васья':
      description = `${m.vashya} → ${f.vashya}`;
      break;
    case 'Тара':
      description = `Разница накшатр: ${meta?.diff} (остаток ${meta?.rem}/9)`;
      break;
    case 'Йони':
      description = `${m.yoniAnimal} → ${f.yoniAnimal}`;
      break;
    case 'Граха Маитри':
      description = `${m.ruler} → ${f.ruler}`;
      break;
    case 'Гана':
      description = `${m.gana} → ${f.gana}`;
      break;
    case 'Бхаккут':
      description = (meta?.rule ? String(meta.rule) : `Разница знаков: ${meta?.diff ? String(meta.diff) : '?'}`);
      break;
    case 'Нади':
      description = `${meta?.male ? String(meta.male) : ''} → ${meta?.female ? String(meta.female) : ''}`;
      if (meta?.note) description += ` (${String(meta.note)})`;
      break;
    default:
      description = '';
  }
  
  return { 
    name, 
    score, 
    maxScore: max, 
    description, 
    favorable,
    ...expl 
  };
}

// Функция интерпретации итогового балла
export function getInterpretation(total: number): { interpretation: string; recommendation: string } {
  if (total >= 30) {
    return { 
      interpretation: 'Превосходно', 
      recommendation: 'Идеальная совместимость. Брак обещает быть счастливым и гармоничным.' 
    };
  }
  if (total >= 24) {
    return { 
      interpretation: 'Хорошо', 
      recommendation: 'Устойчивая совместимость. Брак возможен и будет успешным при взаимном уважении.' 
    };
  }
  if (total >= 18) {
    return { 
      interpretation: 'Средне', 
      recommendation: 'Базовый баланс есть, но потребуется работа над отношениями и взаимопониманием.' 
    };
  }
  if (total >= 12) {
    return { 
      interpretation: 'Ниже среднего', 
      recommendation: 'Сложные отношения. Брак возможен только при наличии сильной любви и готовности к компромиссам.' 
    };
  }
  return { 
    interpretation: 'Низкая совместимость', 
    recommendation: 'Кармически сложная комбинация. Рекомендуется консультация с ведическим астрологом.' 
  };
}
