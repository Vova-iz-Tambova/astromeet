import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig.tsx';

// Инициализация VK Bridge с обработкой ошибок
try {
  if (vkBridge && typeof vkBridge.send === 'function') {
    vkBridge.send('VKWebAppInit');
  }
} catch (error) {
  console.warn('VK Bridge initialization failed (maybe not in VK environment):', error);
}

createRoot(document.getElementById('root')!).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts');
}
