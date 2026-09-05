import React, { useEffect, useState } from 'react';

interface LaserPointerProps {
  isActive: boolean;
}

export const LaserPointer: React.FC<LaserPointerProps> = ({ isActive }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsPressing(true);
    const handleMouseUp = () => setIsPressing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 隐藏系统光标
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 激光笔外圈大光晕 */}
      <div
        className="absolute rounded-full pointer-events-none transition-transform duration-75 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isPressing ? '52px' : '40px',
          height: isPressing ? '52px' : '40px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 75%)',
        }}
      />

      {/* 激光笔核心高亮发光红点 */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: position.x,
          top: position.y,
          width: isPressing ? '14px' : '10px',
          height: isPressing ? '14px' : '10px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#ff2d55',
          boxShadow: '0 0 12px #ff2d55, 0 0 24px #ff3b30',
        }}
      />
    </div>
  );
};
