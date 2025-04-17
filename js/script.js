document.addEventListener('DOMContentLoaded', function() {
    const forgiveBtn = document.getElementById('forgive');
    const notForgiveBtn = document.getElementById('not-forgive');
    const questionText = document.getElementById('question');
    const resultDiv = document.getElementById('result');
    const emoji = document.querySelector('.emoji');
    const heartsContainer = document.querySelector('.hearts');
    const title = document.querySelector('.title');
    
    // 问题列表，每次点"不原谅"时更换问题
    const questions = [
        "宝贝，我真的知道错了，再给我一次机会好吗？",
        "你不原谅我，我今晚会睡不着的... 😢",
        "我保证以后会更加珍惜你，不会再惹你生气！",
        "你是我最爱的人，没有你我真的好难过",
        "我已经反思了自己的错误，请你原谅我吧",
        "如果你原谅我，我请你吃好吃的、看电影、买礼物！",
        "宝宝，我真的很爱你，别不理我好吗？",
        "没有你的世界黯淡无光，我需要你的原谅",
        "你就是我的全世界，请不要离开我"
    ];
    
    // 表情变化
    const emojis = ['🧸', '😢', '😭', '🥺', '😩', '🙏', '💔', '🐻', '🌹'];
    
    // 默认表情
    const defaultEmoji = '🧸';
    // 开心表情
    const happyEmoji = '😊';
    // 难过表情
    const sadEmoji = '😭';
    
    let currentQuestion = 0;
    let buttonSize = 1;
    
    // 创建随机爱心效果
    function createHearts() {
        const heartTypes = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                
                const size = Math.random() * 25 + 15;
                const x = Math.random() * 100;
                const duration = Math.random() * 3 + 3;
                const randomHeart = heartTypes[Math.floor(Math.random() * heartTypes.length)];
                
                heart.style.left = `${x}%`;
                heart.style.bottom = '-50px';
                heart.style.animationDuration = `${duration}s`;
                heart.style.fontSize = `${size}px`;
                heart.innerHTML = randomHeart;
                
                heartsContainer.appendChild(heart);
                
                // 动画结束后删除
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 300);
        }
    }
    
    // 增加标题效果
    function updateTitleEffect() {
        title.innerHTML = title.textContent.split('').map(char => {
            return char === ' ' ? ' ' : `<span class="heartbeat">${char}</span>`;
        }).join('');
        
        // 为每个字符添加不同的动画延迟
        const spans = title.querySelectorAll('.heartbeat');
        spans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // 初始化标题效果
    setTimeout(updateTitleEffect, 1000);
    
    // 鼠标悬停效果 - 为按钮添加事件监听器
    // 原谅按钮 - 悬停时放大按钮和表情变开心
    forgiveBtn.addEventListener('mouseenter', function() {
        emoji.textContent = happyEmoji;
        forgiveBtn.style.transform = 'scale(1.15)';
        notForgiveBtn.style.transform = 'scale(0.9)';
    });
    
    forgiveBtn.addEventListener('mouseleave', function() {
        emoji.textContent = defaultEmoji;
        forgiveBtn.style.transform = 'scale(1)';
        notForgiveBtn.style.transform = 'scale(1)';
    });
    
    // 不原谅按钮 - 悬停时按钮变小和表情变难过
    notForgiveBtn.addEventListener('mouseenter', function() {
        emoji.textContent = sadEmoji;
        notForgiveBtn.style.transform = 'scale(0.85)';
        forgiveBtn.style.transform = 'scale(1.15)';
    });
    
    notForgiveBtn.addEventListener('mouseleave', function() {
        emoji.textContent = defaultEmoji;
        notForgiveBtn.style.transform = 'scale(1)';
        forgiveBtn.style.transform = 'scale(1)';
    });
    
    notForgiveBtn.addEventListener('click', function() {
        if (currentQuestion < questions.length) {
            // 更新问题和表情动画效果
            questionText.classList.remove('animate__fadeIn');
            void questionText.offsetWidth; // 触发重排
            questionText.classList.add('animate__fadeIn');
            
            // 更新问题和表情
            questionText.textContent = questions[currentQuestion];
            emoji.textContent = emojis[currentQuestion % emojis.length];
            defaultEmoji = emojis[currentQuestion % emojis.length]; // 更新默认表情
            
            // 增大"不原谅"按钮，并且让它晃动
            buttonSize += 0.15;
            this.classList.add('growing');
            this.style.transform = `scale(${buttonSize})`;
            
            // 增加"原谅你"按钮的吸引力，让它闪烁或跳动
            forgiveBtn.classList.add('animate__animated', 'animate__heartBeat');
            setTimeout(() => {
                forgiveBtn.classList.remove('animate__heartBeat');
            }, 1000);
            
            // 字体也增大
            forgiveBtn.style.fontSize = `${1.3 + (currentQuestion * 0.05)}rem`;
            
            // 下一个问题
            currentQuestion++;
            
            // 加强泪滴效果
            const tears = document.querySelectorAll('.tear');
            tears.forEach(tear => {
                tear.style.opacity = '1';
                tear.style.animationDuration = '1.5s';
            });
            
            // 如果已经到最后一个问题，准备结束
            if (currentQuestion >= questions.length) {
                setTimeout(() => {
                    // 自动点击原谅按钮
                    forgiveBtn.click();
                }, 2000);
            }
        }
    });
    
    forgiveBtn.addEventListener('click', function() {
        // 隐藏按钮和问题
        forgiveBtn.style.display = 'none';
        notForgiveBtn.style.display = 'none';
        questionText.style.display = 'none';
        
        // 显示结果动画
        resultDiv.innerHTML = `
            <p class="animate__animated animate__bounceIn" style="font-size: 1.8rem; color: #e91e63; margin-bottom: 15px;">我就知道宝宝最爱我了！❤️</p>
            <p class="animate__animated animate__bounceIn animate__delay-1s" style="font-size: 1.4rem;">谢谢宝宝原谅我~</p>
            <p class="animate__animated animate__fadeIn animate__delay-2s" style="font-size: 1.2rem; margin-top: 20px;">我会用行动证明我的爱！</p>
            <div class="animate__animated animate__zoomIn animate__delay-3s" style="font-size: 3rem; margin-top: 20px;">❤️</div>
        `;
        
        // 更换表情
        emoji.textContent = '😍';
        emoji.classList.add('animate__animated', 'animate__tada');
        
        // 制造爱心特效
        createHearts();
        
        // 更改标题
        title.textContent = "我爱你！";
        updateTitleEffect();
        title.classList.add('animate__animated', 'animate__rubberBand');
    });
    
    // 初始化页面时的爱心效果
    setTimeout(() => {
        createHearts();
    }, 500);
    
    // 防止"不原谅"按钮移出视口
    window.addEventListener('resize', function() {
        const btnRect = notForgiveBtn.getBoundingClientRect();
        if (btnRect.right > window.innerWidth || btnRect.bottom > window.innerHeight) {
            buttonSize = 1;
            notForgiveBtn.style.transform = `scale(${buttonSize})`;
        }
    });
});