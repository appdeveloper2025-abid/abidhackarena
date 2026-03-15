// Dashboard Charts - Beautiful Animated Graphs
class DashboardCharts {
    constructor() {
        this.colors = {
            green: '#00ff41',
            blue: '#0066ff',
            purple: '#8a2be2',
            orange: '#ffaa00',
            pink: '#ff0066',
            cyan: '#00ffff'
        };
        this.initCharts();
    }

    initCharts() {
        this.drawXPLineChart();
        this.drawSkillsBarChart();
        this.drawCategoryPieChart();
        this.drawActivityBarChart();
    }

    drawXPLineChart() {
        const canvas = document.getElementById('xpLineChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const data = [120, 250, 380, 520, 680, 850, 1050];
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        this.drawLineGraph(ctx, canvas, data, labels, this.colors.green);
    }

    drawLineGraph(ctx, canvas, data, labels, color) {
        const padding = 40;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;
        const max = Math.max(...data);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }
        
        // Draw line
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.beginPath();
        
        data.forEach((value, i) => {
            const x = padding + (width / (data.length - 1)) * i;
            const y = canvas.height - padding - (value / max) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
        
        // Draw points
        data.forEach((value, i) => {
            const x = padding + (width / (data.length - 1)) * i;
            const y = canvas.height - padding - (value / max) * height;
            
            ctx.fillStyle = color;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Labels
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ccc';
            ctx.font = '12px Fira Code';
            ctx.textAlign = 'center';
            ctx.fillText(labels[i], x, canvas.height - 10);
        });
    }

    drawSkillsBarChart() {
        const canvas = document.getElementById('skillsBarChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const skills = [
            { name: 'Web Exploitation', value: 75, color: this.colors.green },
            { name: 'Network Security', value: 60, color: this.colors.blue },
            { name: 'Cryptography', value: 45, color: this.colors.purple },
            { name: 'Password Attacks', value: 80, color: this.colors.orange },
            { name: 'Forensics', value: 55, color: this.colors.pink }
        ];
        
        const padding = 40;
        const barHeight = 30;
        const barSpacing = 20;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        skills.forEach((skill, i) => {
            const y = padding + i * (barHeight + barSpacing);
            const barWidth = (canvas.width - padding * 2) * (skill.value / 100);
            
            // Bar background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(padding, y, canvas.width - padding * 2, barHeight);
            
            // Bar fill with gradient
            const gradient = ctx.createLinearGradient(padding, y, padding + barWidth, y);
            gradient.addColorStop(0, skill.color);
            gradient.addColorStop(1, skill.color + '80');
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 15;
            ctx.shadowColor = skill.color;
            ctx.fillRect(padding, y, barWidth, barHeight);
            
            // Label
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.font = '12px Fira Code';
            ctx.textAlign = 'left';
            ctx.fillText(skill.name, padding + 5, y + barHeight / 2 + 4);
            
            // Percentage
            ctx.textAlign = 'right';
            ctx.fillStyle = skill.color;
            ctx.fillText(skill.value + '%', canvas.width - padding - 5, y + barHeight / 2 + 4);
        });
    }

    drawCategoryPieChart() {
        const canvas = document.getElementById('categoryPieChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const data = [
            { label: 'Web', value: 35, color: this.colors.green },
            { label: 'Network', value: 25, color: this.colors.blue },
            { label: 'Crypto', value: 20, color: this.colors.purple },
            { label: 'OSINT', value: 20, color: this.colors.orange }
        ];
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;
        let currentAngle = -Math.PI / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        data.forEach((item, i) => {
            const sliceAngle = (item.value / 100) * Math.PI * 2;
            
            // Draw slice
            ctx.fillStyle = item.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = item.color;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            // Draw label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
            
            ctx.shadowBlur = 0;
            ctx.fillStyle = item.color;
            ctx.font = 'bold 14px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, labelX, labelY);
            ctx.font = '12px Fira Code';
            ctx.fillText(item.value + '%', labelX, labelY + 15);
            
            currentAngle += sliceAngle;
        });
    }

    drawActivityBarChart() {
        const canvas = document.getElementById('activityBarChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const data = [12, 19, 15, 25, 22, 30, 28];
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const colors = [this.colors.green, this.colors.blue, this.colors.purple, this.colors.orange, this.colors.pink, this.colors.cyan, this.colors.green];
        
        const padding = 40;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;
        const barWidth = width / data.length - 10;
        const max = Math.max(...data);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        data.forEach((value, i) => {
            const x = padding + (width / data.length) * i + 5;
            const barHeight = (value / max) * height;
            const y = canvas.height - padding - barHeight;
            
            // Bar with gradient
            const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding);
            gradient.addColorStop(0, colors[i]);
            gradient.addColorStop(1, colors[i] + '40');
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 15;
            ctx.shadowColor = colors[i];
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Label
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ccc';
            ctx.font = '12px Fira Code';
            ctx.textAlign = 'center';
            ctx.fillText(labels[i], x + barWidth / 2, canvas.height - 10);
            
            // Value
            ctx.fillStyle = colors[i];
            ctx.fillText(value, x + barWidth / 2, y - 10);
        });
    }
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new DashboardCharts();
    }, 500);
});
