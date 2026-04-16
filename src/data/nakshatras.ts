// Данные накшатр для расчета КУТ
// Источник: ведическая астрология, 27 накшатр
export interface NakshatraData {
  id: number;                 // 1-27
  name: string;               // русское название
  rashi: number;              // знак зодиака (1-12): 1=Овен, 2=Телец, ..., 12=Рыбы
  varna: 'Брахмин' | 'Кшатрий' | 'Вайшья' | 'Шудра';
  vashya: 'Чатушпад' | 'Манав' | 'Джалчар' | 'Ванчар' | 'Кит';
  yoniAnimal: string;         // животное Йони
  yoniGender: 'male' | 'female';
  gana: 'Дева' | 'Манушья' | 'Ракшаса';
  nadi: 'Вата' | 'Питта' | 'Капха';
  ruler: string;              // управитель (граха) - планета
}

export const NAKSHATRAS: NakshatraData[] = [
  // 1 Ашвини
  {
    id: 1,
    name: 'Ашвини',
    rashi: 1,  // Овен
    varna: 'Кшатрий',
    vashya: 'Чатушпад',
    yoniAnimal: 'Лошадь',
    yoniGender: 'male',
    gana: 'Дева',
    nadi: 'Вата',
    ruler: 'Кету'
  },
  // 2 Бхарани
  {
    id: 2,
    name: 'Бхарани',
    rashi: 1,  // Овен
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Слон',
    yoniGender: 'female',
    gana: 'Манушья',
    nadi: 'Питта',
    ruler: 'Венера'
  },
  // 3 Криттика
  {
    id: 3,
    name: 'Криттика',
    rashi: 2,  // Телец (основная часть)
    varna: 'Брахмин',
    vashya: 'Манав',
    yoniAnimal: 'Овца',
    yoniGender: 'female',
    gana: 'Ракшаса',
    nadi: 'Капха',
    ruler: 'Солнце'
  },
  // 4 Рохини
  {
    id: 4,
    name: 'Рохини',
    rashi: 2,  // Телец
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Змея',
    yoniGender: 'female',
    gana: 'Манушья',
    nadi: 'Капха',
    ruler: 'Луна'
  },
  // 5 Мригашира
  {
    id: 5,
    name: 'Мригашира',
    rashi: 3,  // Близнецы (основная часть)
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Змея',
    yoniGender: 'male',
    gana: 'Дева',
    nadi: 'Питта',
    ruler: 'Марс'
  },
  // 6 Ардра
  {
    id: 6,
    name: 'Ардра',
    rashi: 3,  // Близнецы
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Собака',
    yoniGender: 'female',
    gana: 'Манушья',
    nadi: 'Вата',
    ruler: 'Раху'
  },
  // 7 Пунарвасу
  {
    id: 7,
    name: 'Пунарвасу',
    rashi: 4,  // Рак (основная часть)
    varna: 'Вайшья',
    vashya: 'Манав',
    yoniAnimal: 'Кошка',
    yoniGender: 'female',
    gana: 'Дева',
    nadi: 'Вата',
    ruler: 'Юпитер'
  },
  // 8 Пушья
  {
    id: 8,
    name: 'Пушья',
    rashi: 4,  // Рак
    varna: 'Брахмин',
    vashya: 'Манав',
    yoniAnimal: 'Овца',
    yoniGender: 'male',
    gana: 'Дева',
    nadi: 'Питта',
    ruler: 'Сатурн'
  },
  // 9 Ашлеша
  {
    id: 9,
    name: 'Ашлеша',
    rashi: 4,  // Рак
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Кошка',
    yoniGender: 'male',
    gana: 'Ракшаса',
    nadi: 'Питта',
    ruler: 'Меркурий'
  },
  // 10 Магха
  {
    id: 10,
    name: 'Магха',
    rashi: 5,  // Лев
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Крыса',
    yoniGender: 'female',
    gana: 'Ракшаса',
    nadi: 'Питта',
    ruler: 'Кету'
  },
  // 11 Пурва Пхалгуни
  {
    id: 11,
    name: 'Пурва Пхалгуни',
    rashi: 5,  // Лев
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Крыса',
    yoniGender: 'male',
    gana: 'Манушья',
    nadi: 'Капха',
    ruler: 'Венера'
  },
  // 12 Уттара Пхалгуни
  {
    id: 12,
    name: 'Уттара Пхалгуни',
    rashi: 5,  // Лев (основная часть)
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Корова',
    yoniGender: 'female',
    gana: 'Манушья',
    nadi: 'Капха',
    ruler: 'Солнце'
  },
  // 13 Хаста
  {
    id: 13,
    name: 'Хаста',
    rashi: 6,  // Дева
    varna: 'Вайшья',
    vashya: 'Манав',
    yoniAnimal: 'Буйвол',
    yoniGender: 'female',
    gana: 'Дева',
    nadi: 'Вата',
    ruler: 'Луна'
  },
  // 14 Читра
  {
    id: 14,
    name: 'Читра',
    rashi: 6,  // Дева (основная часть)
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Тигр',
    yoniGender: 'female',
    gana: 'Ракшаса',
    nadi: 'Питта',
    ruler: 'Марс'
  },
  // 15 Свати
  {
    id: 15,
    name: 'Свати',
    rashi: 7,  // Весы
    varna: 'Вайшья',
    vashya: 'Манав',
    yoniAnimal: 'Буйвол',
    yoniGender: 'male',
    gana: 'Дева',
    nadi: 'Вата',
    ruler: 'Раху'
  },
  // 16 Вишакха
  {
    id: 16,
    name: 'Вишакха',
    rashi: 8,  // Скорпион (основная часть)
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Тигр',
    yoniGender: 'male',
    gana: 'Ракшаса',
    nadi: 'Капха',
    ruler: 'Юпитер'
  },
  // 17 Анурадха
  {
    id: 17,
    name: 'Анурадха',
    rashi: 8,  // Скорпион
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Заяц',
    yoniGender: 'female',
    gana: 'Дева',
    nadi: 'Питта',
    ruler: 'Сатурн'
  },
  // 18 Джьештха
  {
    id: 18,
    name: 'Джьештха',
    rashi: 8,  // Скорпион
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Заяц',
    yoniGender: 'male',
    gana: 'Ракшаса',
    nadi: 'Вата',
    ruler: 'Меркурий'
  },
  // 19 Мула
  {
    id: 19,
    name: 'Мула',
    rashi: 9,  // Стрелец
    varna: 'Шудра',
    vashya: 'Манав',
    yoniAnimal: 'Собака',
    yoniGender: 'male',
    gana: 'Ракшаса',
    nadi: 'Вата',
    ruler: 'Кету'
  },
  // 20 Пурва Ашадха
  {
    id: 20,
    name: 'Пурва Ашадха',
    rashi: 9,  // Стрелец
    varna: 'Брахмин',
    vashya: 'Манав',
    yoniAnimal: 'Обезьяна',
    yoniGender: 'female',
    gana: 'Манушья',
    nadi: 'Питта',
    ruler: 'Венера'
  },
  // 21 Уттара Ашадха
  {
    id: 21,
    name: 'Уттара Ашадха',
    rashi: 10,  // Козерог (основная часть)
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Мангуст',
    yoniGender: 'female',
    gana: 'Манушья',
    nadi: 'Капха',
    ruler: 'Солнце'
  },
  // 22 Шравана
  {
    id: 22,
    name: 'Шравана',
    rashi: 10,  // Козерог
    varna: 'Вайшья',
    vashya: 'Манав',
    yoniAnimal: 'Обезьяна',
    yoniGender: 'male',
    gana: 'Дева',
    nadi: 'Вата',
    ruler: 'Луна'
  },
  // 23 Дханишта
  {
    id: 23,
    name: 'Дханишта',
    rashi: 11,  // Водолей (основная часть)
    varna: 'Вайшья',
    vashya: 'Манав',
    yoniAnimal: 'Лев',
    yoniGender: 'female',
    gana: 'Ракшаса',
    nadi: 'Питта',
    ruler: 'Марс'
  },
  // 24 Шатабхиша
  {
    id: 24,
    name: 'Шатабхиша',
    rashi: 11,  // Водолей
    varna: 'Брахмин',
    vashya: 'Манав',
    yoniAnimal: 'Лошадь',
    yoniGender: 'female',
    gana: 'Ракшаса',
    nadi: 'Вата',
    ruler: 'Раху'
  },
  // 25 Пурва Бхадрапада
  {
    id: 25,
    name: 'Пурва Бхадрапада',
    rashi: 12,  // Рыбы (основная часть)
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Лев',
    yoniGender: 'male',
    gana: 'Манушья',
    nadi: 'Вата',
    ruler: 'Юпитер'
  },
  // 26 Уттара Бхадрапада
  {
    id: 26,
    name: 'Уттара Бхадрапада',
    rashi: 12,  // Рыбы
    varna: 'Кшатрий',
    vashya: 'Манав',
    yoniAnimal: 'Корова',
    yoniGender: 'male',
    gana: 'Манушья',
    nadi: 'Капха',
    ruler: 'Сатурн'
  },
  // 27 Ревати
  {
    id: 27,
    name: 'Ревати',
    rashi: 12,  // Рыбы
    varna: 'Брахмин',
    vashya: 'Манав',
    yoniAnimal: 'Слон',
    yoniGender: 'male',
    gana: 'Дева',
    nadi: 'Питта',
    ruler: 'Меркурий'
  }
];