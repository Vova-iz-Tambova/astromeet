import { useState, useEffect, ReactNode } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Home, Result } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Пытаемся получить данные через VK Bridge
        await bridge.send('VKWebAppGetUserInfo');
      } catch (error) {
        // Если не в VK — используем мок-данные
        console.log('Работаем вне VK, используем тестовые данные');
      }
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <Result id="result" />
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
