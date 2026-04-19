import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Box,
  Cell,
  Avatar,
  Progress,
  NavIdProps,
  SimpleCell,
} from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { MALE_PADAS, FEMALE_PADAS } from '../data/padas';
import { calculateKuta, getDiffDescription } from '../utils/kutaCalculator';
import { calculateFullKuta } from '../kuta';

export interface ResultProps extends NavIdProps {}

export const Result: FC<ResultProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams();
  const malePadaId = params?.malePadaId as string | undefined;
  const femalePadaId = params?.femalePadaId as string | undefined;

  const maleId = malePadaId ? parseInt(malePadaId, 10) : 45;
  const femaleId = femalePadaId ? parseInt(femalePadaId, 10) : 67;

  const malePada = MALE_PADAS.find(p => p.globalId === maleId) || MALE_PADAS[0];
  const femalePada = FEMALE_PADAS.find(p => p.globalId === femaleId) || FEMALE_PADAS[0];

  const simpleResult = calculateKuta(maleId, femaleId);
  const fullResult = calculateFullKuta(malePada, femalePada);

  const handleNewCalculation = () => {
    routeNavigator.push('home');
  };

  const getColorByPercentage = (percentage: number) => {
    if (percentage >= 80) return '#4bb34b';
    if (percentage >= 50) return '#ffa000';
    if (percentage >= 30) return '#ff5c5c';
    return '#e64646';
  };

  const getColorByScore = (score: number, maxScore: number) => {
    const ratio = score / maxScore;
    if (ratio >= 0.8) return '#4bb34b';
    if (ratio >= 0.5) return '#ffa000';
    return '#ff5c5c';
  };

  return (
    <Panel id={id}>
      <PanelHeader>Результат совместимости</PanelHeader>

      <Group header={<Header size="s">👨‍👩‍👧‍👦 Пара</Header>}>
        <Box>
          <Cell
            before={<Avatar size={48} style={{ backgroundColor: '#4bb34b' }}>👨</Avatar>}
            subtitle={`${malePada.nakshatraName}, пада ${malePada.padaNumber}`}
          >
            {malePada.code}
          </Cell>
          <Cell
            before={<Avatar size={48} style={{ backgroundColor: '#ff5c5c' }}>👩</Avatar>}
            subtitle={`${femalePada.nakshatraName}, пада ${femalePada.padaNumber}`}
          >
            {femalePada.code}
          </Cell>
        </Box>
      </Group>

      <Group header={<Header size="s">📊 Полная система КУТ (36 баллов)</Header>}>
        <Box style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: getColorByPercentage((fullResult.totalScore / 36) * 100) }}>
            {fullResult.totalScore}/36
          </div>
          <Progress
            value={(fullResult.totalScore / 36) * 100}
            style={{ margin: '20px 0' }}
          />
          <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            {fullResult.interpretation}
          </div>
          <div style={{ fontSize: 16, color: 'var(--text_secondary)' }}>
            {fullResult.recommendation}
          </div>
        </Box>
      </Group>

      <Group header={<Header size="s">📈 Детали по критериям</Header>}>
        <Box>
          {fullResult.criteria.map(criterion => (
            <SimpleCell
              key={criterion.name}
              multiline
              after={<div style={{ fontWeight: 'bold', color: getColorByScore(criterion.score, criterion.maxScore) }}>{criterion.score}/{criterion.maxScore}</div>}
              subtitle={criterion.description}
              before={<div style={{ width: 24, textAlign: 'center' }}>{criterion.favorable ? '✅' : '❌'}</div>}
            >
              {criterion.name}
            </SimpleCell>
          ))}
        </Box>
      </Group>

      <Group header={<Header size="s">📊 Упрощенная совместимость (108 пад)</Header>}>
        <Box style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: getColorByPercentage(simpleResult.percentage) }}>
            {simpleResult.percentage}%
          </div>
          <Progress
            value={simpleResult.percentage}
            style={{ margin: '20px 0' }}
          />
          <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            {simpleResult.type}
          </div>
          <div style={{ fontSize: 16, color: 'var(--text_secondary)' }}>
            Разница накшатр: {getDiffDescription(simpleResult.diff)}
          </div>
        </Box>
      </Group>

      <Group header={<Header size="s">📖 Описание</Header>}>
        <Box>
          <p style={{ fontSize: 16, lineHeight: 1.5 }}>
            {simpleResult.description}
          </p>
        </Box>
      </Group>

      <Group header={<Header size="s">💡 Рекомендации</Header>}>
        <Box>
          <p style={{ fontSize: 16, lineHeight: 1.5 }}>
            {simpleResult.recommendations}
          </p>
          <ul style={{ fontSize: 14, paddingLeft: 20, marginTop: 8 }}>
            <li>Учитесь слушать партнера</li>
            <li>Находите общие интересы</li>
            <li>Не избегайте диалога</li>
            <li>Проявляйте уважение к различиям</li>
          </ul>
        </Box>
      </Group>

      <Group header={<Header size="s">🔍 Детали расчета (упрощенный)</Header>}>
        <Box>
          <Cell subtitle="Мужская пада">
            {malePada.code} ({malePada.nakshatraName}, пада {malePada.padaNumber})
          </Cell>
          <Cell subtitle="Женская пада">
            {femalePada.code} ({femalePada.nakshatraName}, пада {femalePada.padaNumber})
          </Cell>
          <Cell subtitle="Разница накшатр">
            {simpleResult.diff} ({simpleResult.diff % 2 === 1 ? 'нечётная → Маитри' : 'чётная → Самья'})
          </Cell>
          <Cell subtitle="Корректировка по падам">
            {malePada.padaNumber === femalePada.padaNumber
              ? '+10% (пады совпадают)'
              : Math.abs(malePada.padaNumber - femalePada.padaNumber) === 2
              ? '-10% (пады различаются на 2)'
              : Math.abs(malePada.padaNumber - femalePada.padaNumber) === 3
              ? '-20% (пады различаются на 3)'
              : '0% (пады различаются на 1)'}
          </Cell>
        </Box>
      </Group>

      <Group>
        <Box>
          <Button
            stretched
            size="l"
            mode="primary"
            onClick={handleNewCalculation}
            style={{ marginTop: 20 }}
          >
            НОВЫЙ РАСЧЕТ
          </Button>
          <Button
            stretched
            size="l"
            mode="outline"
            onClick={() => routeNavigator.back()}
            style={{ marginTop: 12 }}
          >
            НАЗАД
          </Button>
        </Box>
      </Group>
    </Panel>
  );
};