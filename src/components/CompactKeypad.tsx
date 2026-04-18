import { FC } from 'react';

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
          width: '240px',
          backgroundColor: 'var(--background_content)',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          padding: '10px',
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          textAlign: 'center',
          fontSize: '18px',
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
          gap: '6px',
        }}>
          {[['1','2','3'],['4','5','6'],['7','8','9'],['del','0','ok']].map((row, ri) =>
            row.map((key, ci) => (
              <button
                key={`${ri}-${ci}`}
                onClick={() => handleKeyClick(key)}
                style={{
                  height: '40px',
                  fontSize: key === 'ok' || key === 'del' ? '13px' : '16px',
                  fontWeight: '600',
                  background: key === 'ok' ? color : key === 'del' ? '#555' : 'var(--background_secondary)',
                  color: key === 'del' ? '#fff' : 'var(--text_primary)',
                  border: 'none',
                  borderRadius: '8px',
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