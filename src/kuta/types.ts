import { Pada } from '../data/padas';

// ==================== ИНТЕРФЕЙСЫ ====================
export interface KutaCriterion {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  favorable: boolean;
  benefits?: string;
  challenges?: string;
  tips?: string;
}

export interface FullKutaResult {
  totalScore: number;
  maxTotalScore: number;
  criteria: KutaCriterion[];
  interpretation: string;
  recommendation: string;
}

// Типы для внутреннего использования
export type Varna = 'Брахмин' | 'Кшатрий' | 'Вайшья' | 'Шудра';
export type Gana = 'Дева' | 'Манушья' | 'Ракшаса';
export type NadiType = 'Вата' | 'Питта' | 'Капха';

// Утилитарные функции, которые будут использоваться в модулях
export type CalcFunction = (malePada: Pada, femalePada: Pada) => KutaCriterion;
