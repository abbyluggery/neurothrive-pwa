/**
 * Data Visualization for NeuroThrive PWA
 * Chart.js integration for mood and energy trends
 *
 * @author Claude Code Assistant
 * @date 2025-11-15
 */

class DataVisualization {
    constructor() {
        this.charts = {};
        this.colors = {
            mood: '#6B46C1', // Purple
            energy: '#FFB300', // Amber
            background: {
                mood: 'rgba(107, 70, 193, 0.1)',
                energy: 'rgba(255, 179, 0, 0.1)'
            }
        };
    }

    /**
     * Get mood data for the last N days
     */
    getMoodData(days = 7) {
        const moods = JSON.parse(localStorage.getItem('moods') || '{}');
        const labels = [];
        const moodData = [];
        const energyData = [];

        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            // Format label (e.g., "Mon 11/15")
            const label = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'numeric',
                day: 'numeric'
            });
            labels.push(label);

            // Get average mood/energy for the day
            const dayData = moods[dateStr];
            if (dayData) {
                const times = Object.values(dayData);
                const avgMood = times.reduce((sum, t) => sum + (t.mood || 0), 0) / times.length;
                const avgEnergy = times.reduce((sum, t) => sum + (t.energy || 0), 0) / times.length;
                moodData.push(Math.round(avgMood * 10) / 10);
                energyData.push(Math.round(avgEnergy * 10) / 10);
            } else {
                moodData.push(null);
                energyData.push(null);
            }
        }

        return { labels, moodData, energyData };
    }

    /**
     * Create mood/energy trend line chart
     */
    createMoodTrendChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error(`Canvas ${canvasId} not found`);
            return null;
        }

        const { labels, moodData, energyData } = this.getMoodData(7);

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if it exists
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        this.charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Mood',
                        data: moodData,
                        borderColor: this.colors.mood,
                        backgroundColor: this.colors.background.mood,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Energy',
                        data: energyData,
                        borderColor: this.colors.energy,
                        backgroundColor: this.colors.background.energy,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '/10';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                            callback: function(value) {
                                return value + '/10';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });

        return this.charts[canvasId];
    }

    /**
     * Get wins data for category breakdown
     */
    getWinsData() {
        const wins = JSON.parse(localStorage.getItem('wins') || '{}');
        const categories = {};

        // Count wins per day (for last 7 days)
        const today = new Date();
        let totalWins = 0;

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const dayWins = wins[dateStr] || [];
            totalWins += dayWins.length;
        }

        return { totalWins };
    }

    /**
     * Update energy meter on dashboard
     */
    updateEnergyMeter() {
        const moods = JSON.parse(localStorage.getItem('moods') || '{}');
        const today = new Date().toISOString().split('T')[0];
        const todayData = moods[today];

        if (todayData && todayData.morning) {
            const energy = todayData.morning.energy;
            const energyFill = document.getElementById('energyFill');
            if (energyFill) {
                energyFill.style.width = (energy * 10) + '%';
                energyFill.textContent = energy + '/10';
            }
        }
    }

    /**
     * Initialize all charts and visualizations
     */
    initializeAll() {
        // Create mood trend chart
        this.createMoodTrendChart('moodTrendChart');

        // Update energy meter
        this.updateEnergyMeter();

        console.log('✅ Data visualizations initialized');
    }

    /**
     * Refresh all charts (call after new data is added)
     */
    refreshCharts() {
        Object.keys(this.charts).forEach(chartId => {
            if (chartId === 'moodTrendChart') {
                this.createMoodTrendChart(chartId);
            }
        });
        this.updateEnergyMeter();
    }
}

// Create singleton instance
const dataViz = new DataVisualization();

// Make available globally
if (typeof window !== 'undefined') {
    window.dataViz = dataViz;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataVisualization };
}
