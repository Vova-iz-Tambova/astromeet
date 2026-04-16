import { FC, useRef, useCallback } from 'react';
import { Pada } from '../data/padas';

interface WheelPickerProps {
  items: Pada[];
  selectedId: number;
  onSelect: (id: number) => void;
  label?: string;
  color?: string;
}

const ITEM_H = 52;

export const WheelPicker: FC<WheelPickerProps> = ({
  items,
  selectedId,
  onSelect,
  label,
  color = '#4bb34b',
}) => {
  const idx = items.findIndex(x => x.globalId === selectedId);
  const current = idx >= 0 ? idx : 0;
  const count = items.length;
  const mod = (i: number) => ((i % count) + count) % count;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: number) => {
    onSelect(items[mod(current + dir)].globalId);
  }, [current, items, mod, onSelect]);

  const handlePress = (dir: number) => {
    go(dir);
    timeoutRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => go(dir), 80);
    }, 250);
  };

  const handleRelease = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div style={{ width: '100%', minWidth: 110, margin: '0 auto 20px', position: 'relative', zIndex: 1 }}>
      {label && (
        <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text_secondary)' }}>
          {label}
        </div>
      )}

      <div style={{
        position: 'relative',
        height: ITEM_H * 3,
        overflow: 'hidden',
        borderRadius: 14,
        background: 'var(--background_content)',
        border: `2px solid ${color}30`,
        boxShadow: `inset 0 2px 6px rgba(0,0,0,0.05)`,
        zIndex: 2,
      }}>
        {[ -2, -1, 0, 1, 2 ].map(offset => {
          const i = mod(current + offset);
          const item = items[i];
          const centered = offset === 0;
          const y = offset * ITEM_H;
          
          return (
            <div
              key={`${item.globalId}-${offset}`}
              onClick={() => onSelect(item.globalId)}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: ITEM_H,
                marginTop: -ITEM_H / 2,
                transform: `translateY(${y}px)`,
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: centered ? 1 : 0.35,
                cursor: 'pointer',
                zIndex: centered ? 10 : 1,
                transition: 'transform 0.2s, opacity 0.15s',
              }}
            >
              <div style={{ fontSize: centered ? 28 : 16, fontWeight: centered ? 700 : 500, letterSpacing: 1, color: centered ? color : 'var(--text_secondary)' }}>
                {item.code}
              </div>
              <div style={{ fontSize: centered ? 13 : 9, color: centered ? color : 'var(--text_secondary)', opacity: 0.7 }}>
                {item.nakshatraName} п{item.padaNumber}
              </div>
            </div>
          );
        })}

        <div style={{
          position: 'absolute',
          top: '28%',
          bottom: '28%',
          left: 0,
          right: 0,
          border: `3px solid ${color}`,
          borderRadius: 12,
          pointerEvents: 'none',
          zIndex: 15,
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, gap: 20 }}>
        <button onPointerDown={(e) => { e.preventDefault(); handlePress(-1); }} onPointerUp={handleRelease} onPointerLeave={handleRelease} style={{ width: 44, height: 44, borderRadius: 22, background: `${color}20`, border: `2px solid ${color}50`, color, fontSize: 16, cursor: 'pointer', touchAction: 'none' }}>▲</button>
        <button onPointerDown={(e) => { e.preventDefault(); handlePress(1); }} onPointerUp={handleRelease} onPointerLeave={handleRelease} style={{ width: 44, height: 44, borderRadius: 22, background: `${color}20`, border: `2px solid ${color}50`, color, fontSize: 16, cursor: 'pointer', touchAction: 'none' }}>▼</button>
      </div>
    </div>
  );
};