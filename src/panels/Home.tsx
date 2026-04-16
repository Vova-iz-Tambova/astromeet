import { FC, useState, useEffect, useMemo } from 'react';
import { Panel, PanelHeader, Group, Div, NavIdProps } from '@vkontakte/vkui';
import { MALE_PADAS, FEMALE_PADAS } from '../data/padas';
import { calculateFullKuta, FullKutaResult } from '../utils/fullKutaCalculator';
import { WheelPicker } from '../components/WheelPicker';

export interface HomeProps extends NavIdProps {}

const PARAM_INFO: Record<string, { title: string; desc: string; full: string; maleKey: string; femaleKey: string }> = {
  'Варна': { title: 'Варна: Социальная каста', desc: 'Социальная каста', full: 'Варна — социальная каста в ведической системе. 4 типа: Брахмин (священнослужители), Кшатрий (воины), Вайшья (торговцы), Шудра (работники). В совместимости важно, чтобы мужчина имел варну не ниже женщины.', maleKey: 'varna', femaleKey: 'varna' },
  'Васья': { title: 'Васья: Тип поведения', desc: 'Тип поведения', full: 'Васья — тип поведения. 5 типов: Чатушпад (четвероногие), Манав (люди), Джалчар (водные), Ванчар (лесные), Кит (морские). Одинаковая Васья — хорошая совместимость.', maleKey: 'vashya', femaleKey: 'vashya' },
  'Тара': { title: 'Тара: Лунная накшатра', desc: 'Лунная накшатра', full: 'Тара — лунная накшатра (27 станций). Рассчитывается по разнице накшатр: остаток 0,2,4,6,8 при делении на 9 — благоприятно. Влияет на эмоциональную связь.', maleKey: 'nakshatraName', femaleKey: 'nakshatraName' },
  'Йони': { title: 'Йони: Животное-тотем', desc: 'Животное-тотем', full: 'Йони — животное-тотем накштары. 14 видов. Влияет на физическую и эмоциональную совместимость. Одинаковые или дружественные — хорошая пара.', maleKey: 'yoniAnimal', femaleKey: 'yoniAnimal' },
  'Граха Маитри': { title: 'Граха Маитри: Дружба планет', desc: 'Дружба планет', full: 'Граха Маитри — дружба между планетами-управителями накшатр (9 планет). Каждая имеет уровень дружбы (0-5). Определяет гармонию в браке.', maleKey: 'ruler', femaleKey: 'ruler' },
  'Гана': { title: 'Гана: Тип природы', desc: 'Тип природы', full: 'Гана — тип природы. 3 типа: Дева (божественная), Манушья (человеческая), Ракшаса (демоническая). Дева + Дева = 6 баллов. Ракшаса + любой = проблемы.', maleKey: 'gana', femaleKey: 'gana' },
  'Бхаккут': { title: 'Бхаккут: Знаки зодиака', desc: 'Знаки зодиака', full: 'Бхаккут — совместимость по знакам зодиака. Разница 2,6,8 или 12 — доша (неблагоприятно). Остальные — 7 баллов.', maleKey: 'rashi', femaleKey: 'rashi' },
  'Нади': { title: 'Нади: Энергетический канал', desc: 'Энергетический канал', full: 'Нади — энергетический канал. 3 типа: Вата (ветер), Питта (желчь), Капха (слизь). Разные Нади — хорошо. Одинаковые — Нади-доша.', maleKey: 'nadi', femaleKey: 'nadi' },
};

export const Home: FC<HomeProps> = ({ id }) => {
  const [malePadaId, setMalePadaId] = useState<number>(5);
  const [femalePadaId, setFemalePadaId] = useState<number>(5);
  const [fullResult, setFullResult] = useState<FullKutaResult | null>(null);
  const [maleInput, setMaleInput] = useState('');
  const [femaleInput, setFemaleInput] = useState('');
  
  const malePada = useMemo(() => MALE_PADAS.find(p => p.globalId === malePadaId) || MALE_PADAS[0], [malePadaId]);
  const femalePada = useMemo(() => FEMALE_PADAS.find(p => p.globalId === femalePadaId) || FEMALE_PADAS[0], [femalePadaId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try { setFullResult(calculateFullKuta(malePada, femalePada)); }
      catch (e) { console.error('Ошибка:', e); }
    }, 150);
    return () => clearTimeout(timer);
  }, [malePadaId, femalePadaId, malePada, femalePada]);

  const getColor = (p: number) => p >= 80 ? '#4bb34b' : p >= 50 ? '#ffa000' : p >= 30 ? '#ff5c5c' : '#e64646';
  const getRashiName = (n: number) => ['', 'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы'][n] || n;

  const handleKey = (k: string, g: 'male' | 'female') => {
    if (k === 'del') { g === 'male' ? setMaleInput(p => p.slice(0,-1)) : setFemaleInput(p => p.slice(0,-1)); }
    else if (k === 'ok') {
      let num = parseInt(g === 'male' ? maleInput : femaleInput) || 0;
      if (num > 108) num = 108;
      if (num >= 1) g === 'male' ? setMalePadaId(num) : setFemalePadaId(num);
      g === 'male' ? setMaleInput('') : setFemaleInput('');
    } else {
      const cur = g === 'male' ? maleInput : femaleInput;
      if (cur.length < 3) g === 'male' ? setMaleInput(cur + k) : setFemaleInput(cur + k);
    }
  };

  const renderKeypad = (g: 'male' | 'female') => {
    const cur = g === 'male' ? maleInput : femaleInput;
    const color = g === 'male' ? '#4bb34b' : '#ff5c5c';
    return (
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:4, marginTop:8, padding:'0 8px'}}>
        {[['1','2','3'],['4','5','6'],['7','8','9'],['del','0','ok']].map((row,ri) => 
          row.map((k,ck) => (
            <button key={`${ri}-${ck}`} onClick={() => handleKey(k,g)}
              style={{height:28, fontSize:k==='ok'||k==='del'?10:14, fontWeight:600,
                background:k==='ok'?color:k==='del'?'#666':'var(--background_secondary)',
                color:k==='del'?'#fff':'var(--text_primary)',border:'none',borderRadius:4,cursor:'pointer',touchAction:'manipulation'}}>
              {k==='ok'?'ОК':k==='del'?'⌫':k}
            </button>
          ))
        )}
        <div style={{gridColumn:'1/-1',textAlign:'center',fontSize:14,color,fontWeight:600,letterSpacing:2,marginTop:2}}>
          {cur.padStart(3,'_').slice(0,3)}
        </div>
      </div>
    );
  };

  return (
    <Panel id={id}>
      <PanelHeader>Ведическая система КУТ</PanelHeader>
      <Group><Div>
        <div style={{display:'flex', gap:8, padding:'8px 0'}}>
          <div style={{flex:1, minWidth:110}}><WheelPicker items={MALE_PADAS} selectedId={malePadaId} onSelect={setMalePadaId} label="👨 Мужчина" color="#4bb34b" />{renderKeypad('male')}</div>
          <div style={{flex:0.8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:90}}>
            <div style={{textAlign:'center', padding:'12px', borderRadius:'14px', width:'100%'}}>
              {fullResult && (
                <>
                  <div style={{fontSize:28, fontWeight:'bold', color:getColor((fullResult.totalScore / 36) * 100), lineHeight:1.1}}>
                    {fullResult.totalScore}/36
                  </div>
                  <div style={{fontSize:12, color:'var(--text_secondary)', marginTop:2}}>
                    {fullResult.interpretation}
                  </div>
                  <div style={{fontSize:10, color:'var(--text_secondary)', marginTop:4, opacity:0.8}}>
                    {fullResult.recommendation}
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{flex:1, minWidth:110}}><WheelPicker items={FEMALE_PADAS} selectedId={femalePadaId} onSelect={setFemalePadaId} label="👩 Женщина" color="#ff5c5c" />{renderKeypad('female')}</div>
        </div>
      </Div></Group>

      {fullResult && (<Group><Div style={{padding:6}}>
        {fullResult.criteria.map(c => {
          const info = PARAM_INFO[c.name];
          const maleVal = malePada[info.maleKey as keyof typeof malePada];
          const femaleVal = femalePada[info.femaleKey as keyof typeof femalePada];
          return (
            <div key={c.name} style={{marginBottom:14, padding:12, backgroundColor:'var(--background_content)', borderRadius:10, borderLeft:`4px solid ${c.favorable?'#4bb34b':'#ff5c5c'}`}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
                <div style={{fontWeight:700, fontSize:20}}>{info?.title || c.name}</div>
                <div style={{fontWeight:'bold', fontSize:24, color: c.favorable?'#4bb34b':'#ff5c5c'}}>{c.score}/{c.maxScore} {c.favorable?'✓':'✗'}</div>
              </div>
              <div style={{fontSize:16, fontWeight:600, marginBottom:10}}><span style={{color:'#4bb34b'}}>М:</span> {c.name==='Бхаккут'?getRashiName(maleVal as number):maleVal} <span style={{margin:'0 8px', opacity:0.5}}>|</span> <span style={{color:'#ff5c5c'}}>Ж:</span> {c.name==='Бхаккут'?getRashiName(femaleVal as number):femaleVal}</div>
              <div style={{fontSize:14, lineHeight:1.5}}>{info?.full}</div>
              <div style={{fontSize:14, marginTop:10, padding:8, backgroundColor: c.favorable?'rgba(75,179,75,0.1)':'rgba(255,92,92,0.1)', borderRadius:6}}><strong>Итог:</strong> {c.favorable?'Благоприятно':'Неблагоприятно'}. {c.benefits} {c.challenges}</div>
            </div>
          );
        })}
      </Div></Group>)}
    </Panel>
  );
};