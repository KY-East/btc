<template>
  <canvas ref="particleCanvas" class="particle-bg"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const particleCanvas = ref(null);
let animationFrameId;

onMounted(() => {
  if (!particleCanvas.value) return;
  
  const canvas = particleCanvas.value;
  const ctx = canvas.getContext('2d');
  
  // 设置canvas尺寸为全屏
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // 粒子属性
  const particles = [];
  const flowLines = []; // 流动轨迹数组
  
  // 根据设备性能动态调整粒子数量
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const particleCount = isMobile ? 200 : 350; // 增加粒子数量
  const flowLineCount = isMobile ? 6 : 12; // 流动轨迹数量
  
  let mouseX = 0;
  let mouseY = 0;
  let mouseRadius = 180; // 增大鼠标影响范围
  let mousePressed = false; // 鼠标按下状态
  
  // 创建量子符号数组
  const symbols = ['0', '1', '₿', '₮', 'Ξ', '∞', '∑', 'Ω', '∆', '⚡', '⚛', '◐', '◯', '⟁', '⟲', '⟳'];
  
  // 创建能量波纹数组
  const energyWaves = [];
  
  // 创建流动轨迹
  for (let i = 0; i < flowLineCount; i++) {
    // 创建贝塞尔曲线控制点
    const points = [];
    const pointCount = Math.floor(Math.random() * 3) + 3; // 3-5个控制点
    
    for (let j = 0; j < pointCount; j++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }
    
    flowLines.push({
      points,
      color: `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, ${Math.random() * 0.3 + 0.1})`,
      width: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }
  
  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    let size = Math.random() * 3 + 1; // 随机粒子大小
    
    // 星星效果 - 有少数大粒子
    if (Math.random() > 0.97) {
      size = Math.random() * 5 + 3;
    }
    
    // 30%的粒子有符号
    const hasSymbol = Math.random() > 0.7;
    const symbol = hasSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : null;
    
    // 30%的粒子跟随流动轨迹
    const followsFlow = Math.random() > 0.7;
    const flowLineIndex = followsFlow ? Math.floor(Math.random() * flowLines.length) : -1;
    const flowPosition = followsFlow ? Math.random() : -1;
    
    // 粒子颜色 - 更丰富的量子色彩
    const colorSchemes = [
      // 蓝色系
      `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 150 + 200)}, 255, ${Math.random() * 0.5 + 0.5})`,
      // 紫色系
      `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 55 + 200)}, ${Math.random() * 0.5 + 0.5})`,
      // 青色系
      `rgba(0, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 55 + 200)}, ${Math.random() * 0.5 + 0.5})`,
      // 绿色系 (少量)
      `rgba(0, ${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.random() * 0.5 + 0.5})`
    ];
    
    const colorIndex = Math.random() > 0.9 ? 3 : Math.floor(Math.random() * 3); // 10%概率为绿色
    
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: size,
      color: colorSchemes[colorIndex],
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      pulseSpeed: 0.01 + Math.random() * 0.02, // 脉冲速度
      pulseAmount: Math.random() * Math.PI * 2, // 随机初始相位
      symbol: symbol,
      symbolColor: hasSymbol ? `rgba(${Math.floor(Math.random() * 55 + 200)}, ${Math.floor(Math.random() * 155 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, 0.9)` : null,
      symbolSize: hasSymbol ? Math.floor(Math.random() * 12) + 8 : null,
      followsFlow: followsFlow,
      flowLineIndex: flowLineIndex,
      flowPosition: flowPosition,
      flowSpeed: followsFlow ? Math.random() * 0.003 + 0.001 : 0,
      originalSpeed: { x: 0, y: 0 },
      trailLength: Math.random() > 0.8 ? Math.floor(Math.random() * 5) + 3 : 0, // 20%的粒子有尾迹
      trail: []
    });
  }
  
  // 鼠标交互事件
  canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
  
  canvas.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
      mouseX = event.touches[0].clientX;
      mouseY = event.touches[0].clientY;
    }
  });
  
  canvas.addEventListener('mousedown', () => {
    mousePressed = true;
    // 创建能量波纹
    createEnergyWave(mouseX, mouseY);
  });
  
  canvas.addEventListener('touchstart', (event) => {
    if (event.touches.length > 0) {
      mouseX = event.touches[0].clientX;
      mouseY = event.touches[0].clientY;
      mousePressed = true;
      createEnergyWave(mouseX, mouseY);
    }
  });
  
  canvas.addEventListener('mouseup', () => {
    mousePressed = false;
  });
  
  canvas.addEventListener('touchend', () => {
    mousePressed = false;
  });
  
  canvas.addEventListener('mouseout', () => {
    mouseX = undefined;
    mouseY = undefined;
    mousePressed = false;
  });
  
  // 创建能量波纹
  function createEnergyWave(x, y) {
    energyWaves.push({
      x: x,
      y: y,
      radius: 5,
      maxRadius: 200,
      lineWidth: 3,
      alpha: 1,
      color: Math.random() > 0.5 ? 
        `rgba(0, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 0.5)` : 
        `rgba(${Math.floor(Math.random() * 100 + 155)}, 100, ${Math.floor(Math.random() * 100 + 155)}, 0.5)`,
      speed: 3 + Math.random() * 2
    });
  }
  
  // 绘制流动轨迹
  function drawFlowLines() {
    flowLines.forEach(line => {
      // 更新控制点位置
      line.points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
        
        // 边界检查
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
      });
      
      // 绘制曲线
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      
      // 使用二次贝塞尔曲线连接点
      for (let i = 1; i < line.points.length - 1; i++) {
        const xc = (line.points[i].x + line.points[i + 1].x) / 2;
        const yc = (line.points[i].y + line.points[i + 1].y) / 2;
        ctx.quadraticCurveTo(line.points[i].x, line.points[i].y, xc, yc);
      }
      
      // 如果有足够的点，连接最后两个点
      if (line.points.length > 1) {
        const lastIdx = line.points.length - 1;
        ctx.quadraticCurveTo(line.points[lastIdx - 1].x, line.points[lastIdx - 1].y, line.points[lastIdx].x, line.points[lastIdx].y);
      }
      
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.stroke();
    });
  }
  
  // 计算粒子在流线上的位置
  function getPositionOnFlowLine(lineIndex, position) {
    const line = flowLines[lineIndex];
    const points = line.points;
    
    // 确保位置在0-1范围内
    position = position % 1;
    if (position < 0) position += 1;
    
    // 如果只有一个点，直接返回
    if (points.length === 1) {
      return { x: points[0].x, y: points[0].y };
    }
    
    // 计算曲线总长度的估计值（线段之和）
    const segments = points.length - 1;
    const targetSegment = Math.floor(position * segments);
    const segmentPosition = (position * segments) % 1;
    
    // 计算点在线段上的位置
    const p1 = points[targetSegment];
    const p2 = points[targetSegment + 1];
    
    return {
      x: p1.x + (p2.x - p1.x) * segmentPosition,
      y: p1.y + (p2.y - p1.y) * segmentPosition
    };
  }
  
  // 绘制能量波纹
  function drawEnergyWaves() {
    for (let i = energyWaves.length - 1; i >= 0; i--) {
      const wave = energyWaves[i];
      
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = wave.lineWidth * (1 - wave.radius / wave.maxRadius);
      ctx.globalAlpha = wave.alpha * (1 - wave.radius / wave.maxRadius);
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      // 更新波纹
      wave.radius += wave.speed;
      wave.alpha -= 0.01;
      
      // 如果波纹消失，从数组中移除
      if (wave.radius > wave.maxRadius || wave.alpha <= 0) {
        energyWaves.splice(i, 1);
      }
    }
  }
  
  // 绘制粒子
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 星空背景 - 创建深色渐变背景
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#070b34');
    bgGradient.addColorStop(1, '#0c0e27');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制流动轨迹
    drawFlowLines();
    
    // 更新和绘制能量波纹
    drawEnergyWaves();
    
    // 绘制连线 - 增加发光效果
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.05)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      
      // 粒子脉动效果
      p1.pulseAmount += p1.pulseSpeed;
      if (p1.pulseAmount > Math.PI * 2) {
        p1.pulseAmount = 0;
      }
      
      const pulseSize = p1.radius * (1 + Math.sin(p1.pulseAmount) * 0.2);
      
      // 如果粒子跟随流动轨迹
      if (p1.followsFlow && p1.flowLineIndex >= 0) {
        p1.flowPosition += p1.flowSpeed;
        if (p1.flowPosition > 1) p1.flowPosition = 0;
        
        const newPos = getPositionOnFlowLine(p1.flowLineIndex, p1.flowPosition);
        p1.x = newPos.x;
        p1.y = newPos.y;
      } else {
        // 鼠标交互增强 - 更明显的吸引/排斥效果
      if (mouseX && mouseY) {
        const dx = p1.x - mouseX;
        const dy = p1.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
            // 在鼠标附近的粒子会被吸引/排斥
          const force = (mouseRadius - distance) / mouseRadius;
            const repel = mousePressed || distance < mouseRadius * 0.3; // 鼠标按下或非常近时排斥
            
            if (repel) {
              p1.x += dx * force * 0.1;
              p1.y += dy * force * 0.1;
              
              // 按下鼠标时粒子加速
              if (mousePressed) {
                p1.speedX = p1.speedX * 1.05;
                p1.speedY = p1.speedY * 1.05;
              }
            } else {
              p1.x -= dx * force * 0.03;
              p1.y -= dy * force * 0.03;
            }
          }
        }
        
        // 正常移动粒子
        p1.x += p1.speedX;
        p1.y += p1.speedY;
        
        // 边界检查 - 平滑循环
        if (p1.x < -50) {
          p1.x = canvas.width + 50;
        } else if (p1.x > canvas.width + 50) {
          p1.x = -50;
        }
        
        if (p1.y < -50) {
          p1.y = canvas.height + 50;
        } else if (p1.y > canvas.height + 50) {
          p1.y = -50;
        }
      }
      
      // 更新尾迹
      if (p1.trailLength > 0) {
        p1.trail.unshift({ x: p1.x, y: p1.y });
        if (p1.trail.length > p1.trailLength) {
          p1.trail.pop();
        }
        
        // 绘制尾迹
        if (p1.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p1.trail[0].x, p1.trail[0].y);
          
          for (let j = 1; j < p1.trail.length; j++) {
            ctx.lineTo(p1.trail[j].x, p1.trail[j].y);
          }
          
          ctx.strokeStyle = p1.color;
          ctx.lineWidth = p1.radius * 0.8;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      
      // 绘制连线 - 距离近的粒子之间连线
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + 
          Math.pow(p1.y - p2.y, 2)
        );
        
        // 如果距离足够近，则绘制连线
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.globalAlpha = 1 - (distance / 120);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    
    // 绘制粒子
    particles.forEach(p => {
      // 绘制光晕效果 - 粒子外发光
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 3);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, 'rgba(0, 100, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // 绘制粒子本身
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // 绘制符号（如果有）
      if (p.symbol) {
        ctx.font = `${p.symbolSize}px monospace`;
        ctx.fillStyle = p.symbolColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 符号旋转效果
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.pulseAmount);
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      }
    });
    
    // 偶发深空闪烁效果 (1%概率)
    if (Math.random() < 0.01) {
      ctx.fillStyle = `rgba(200, 255, 255, ${Math.random() * 0.05 + 0.02})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    animationFrameId = requestAnimationFrame(drawParticles);
  }
  
  drawParticles();
});

// 清理动画，避免内存泄漏
onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #070b34; /* 更深的蓝色调 */
  cursor: default;
}
</style> 