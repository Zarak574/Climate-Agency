import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import "../../css/LineChartStyles.css";

ChartJS.register(...registerables, MatrixController, MatrixElement);

const CorrelationHeatmap = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/correlations')
      .then((res) => res.json())
      .then((rawData) => {
        const labels = rawData.labels;
        const matrix = rawData.matrix;

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Correlation Matrix',
              data: [],
              backgroundColor: (context) => {
                const value = context.raw.v;
                return value > 0.5
                  ? 'rgba(51, 143, 122, 0.93)'
                  : value < -0.5
                  ? 'rgba(255, 0, 0, 0.5)'
                  : 'rgba(255, 180, 51, 0.69)';
              },
              // borderColor: 'rgba(149, 213, 255, 0.5)',
              borderWidth: 1,
              width: ({ chart }) => (chart.chartArea || {}).width / labels.length,
              height: ({ chart }) => (chart.chartArea || {}).height / labels.length,
            },
          ],
        };

        matrix.forEach((row, i) => {
          row.forEach((value, j) => {
            chartData.datasets[0].data.push({ x: j, y: i, v: value });
          });
        });

        setData({ labels, chartData });
      })
      .catch((err) => console.error('Error loading correlation data:', err));
  }, []);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');

    chartRef.current = new ChartJS(ctx, {
      type: 'matrix',
      data: data.chartData,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          x: {
            type: 'category',
            labels: data.labels,
            // title: { display: true, text: 'Variables' },
          },
          y: {
            type: 'category',
            labels: data.labels,
            // title: { display: true, text: 'Variables' },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} id="correlation-heatmap" />
    </div>
  );
};

export default CorrelationHeatmap;
