// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Line } from 'react-chartjs-2'

const ChartjsLineChart = props => {
  // ** Props
  const {
    white,
    primary,
    success,
    warning,
    labelColor,
    borderColor,
    legendColor,
    title,
    title2,
    label,
    datas,
    duration
  } = props

  const maxValue = datas.length ? Math.max(...datas) : 0

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor
        }
      },
      y: {
        min: 0,
        max: maxValue,
        ticks: {
          stepSize: maxValue / 10,
          color: labelColor
        },
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }

  const data = {
    labels: label,
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: `${title2}`,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: primary,
        data: datas
      }

      // {
      //   fill: false,
      //   tension: 0.5,
      //   label: 'Asia',
      //   pointRadius: 1,
      //   pointHoverRadius: 5,
      //   pointStyle: 'circle',
      //   borderColor: warning,
      //   backgroundColor: warning,
      //   pointHoverBorderWidth: 5,
      //   pointHoverBorderColor: white,
      //   pointBorderColor: 'transparent',
      //   pointHoverBackgroundColor: warning,
      //   data: [80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200, 280]
      // },
      // {
      //   fill: false,
      //   tension: 0.5,
      //   pointRadius: 1,
      //   label: 'Africa',
      //   pointHoverRadius: 5,
      //   pointStyle: 'circle',
      //   borderColor: success,
      //   backgroundColor: success,
      //   pointHoverBorderWidth: 5,
      //   pointHoverBorderColor: white,
      //   pointBorderColor: 'transparent',
      //   pointHoverBackgroundColor: success,
      //   data: [80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180]
      // }
    ]
  }

  return (
    <Card>
      <CardHeader title={title} subheader={duration} />
      <CardContent>
        <Line data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsLineChart
