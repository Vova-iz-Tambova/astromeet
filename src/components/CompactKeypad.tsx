import { FC } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface CompactKeypadProps {
  gender: 'male' | 'female';
  currentInput: string;
  onKeyPress: (key: string) => void;
  onClose: () => void;
}

export const CompactKeypad: FC<CompactKeypadProps> = ({
  gender,
  currentInput,
  onKeyPress,
  onClose,
}) => {
  const color = gender === 'male' ? '#4bb34b' : '#ff5c5c';

  // Определение брейкпоинтов
  const isNarrow = useMediaQuery('(max-width: 399px)');
  const isWide = useMediaQuery('(min-width: 769px)');

  // Базовые размеры (увеличены на 50% от исходных)
  const baseWidth = 360; // 240px * 1.5
  const baseButtonHeight = 60; // 40px * 1.5
  const baseFontNumber = 24; // 16px * 1.5
  const baseFontAction = 20; // 13px * 1.5
  const basePadding = 15; // 10px * 1.5
  const baseGap = 9; // 6px * 1.5
  const baseBorderRadius = 12; // 8px * 1.5

  // Адаптивные корректировки
  const containerWidth = isNarrow 
    ? '90vw' 
    : isWide 
      ? `${baseWidth + 40}px` // 400px на широких экранах
      : `${baseWidth}px`;
  
  const buttonHeight = isNarrow 
    ? '50px' 
    : isWide 
      ? '70px' 
      : `${baseButtonHeight}px`;
  
  const fontSizeNumber = isNarrow 
    ? '20px' 
    : isWide 
      ? '28px' 
      : `${baseFontNumber}px`;
  
  const fontSizeAction = isNarrow 
    ? '16px' 
    : isWide 
      ? '22px' 
      : `${baseFontAction}px`;
  
  const padding = isNarrow 
    ? '12px' 
    : isWide 
      ? '18px' 
      : `${basePadding}px`;
  
  const gap = isNarrow 
    ? '7px' 
    : isWide 
      ? '11px' 
      : `${baseGap}px`;
  
  const borderRadius = isNarrow 
    ? '10px' 
    : isWide 
      ? '14px' 
      : `${baseBorderRadius}px`;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyClick = (key: string) => {
    onKeyPress(key);
    if (key === 'ok') {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: '35%', // появляется над пикером (можно подстроить под экран)
          left: '50%',
          transform: 'translateX(-50%)',
          width: containerWidth,
          maxWidth: '90vw', // на всякий случай ограничиваем
          backgroundColor: 'var(--background_content)',
          borderRadius: borderRadius,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          padding: padding,
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          textAlign: 'center',
          fontSize: fontSizeNumber,
          fontWeight: '700',
          color,
          letterSpacing: '5px',
          marginBottom: '8px',
          height: '24px',
        }}>
          {currentInput.padStart(3, '_').slice(0, 3)}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: gap,
        }}>
          {[['1','2','3'],['4','5','6'],['7','8','9'],['del','0','ok']].map((row, ri) =>
            row.map((key, ci) => (
              <button
                key={`${ri}-${ci}`}
                onClick={() => handleKeyClick(key)}
                style={{
                  height: buttonHeight,
                  fontSize: key === 'ok' || key === 'del' ? fontSizeAction : fontSizeNumber,
                  fontWeight: '600',
                  background: key === 'ok' ? color : key === 'del' ? '#555' : 'var(--background_secondary)',
                  color: key === 'del' ? '#fff' : 'var(--text_primary)',
                  border: 'none',
                  borderRadius: borderRadius,
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}
              >
                {key === 'ok' ? 'ОК' : key === 'del' ? '⌫' : key}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};