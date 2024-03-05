// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getPopularTopics } from 'src/store/slices/AdminSlice'

const ChartjsHorizontalBarChart = props => {
  // ** Props
  const { info, warning, primaryColor, labelColor, borderColor, legendColor, title, label, datas } = props

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    elements: {
      bar: {
        borderRadius: {
          topRight: 15,
          bottomRight: 15
        }
      }
    },
    layout: {
      padding: { top: -4 }
    },
    scales: {
      x: {
        min: 0,
        grid: {
          drawTicks: false,
          drawBorder: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        grid: {
          borderColor,
          display: false,
          drawBorder: false
        },
        ticks: { color: labelColor }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: { color: legendColor }
      }
    }
  }

  const data = {
    labels: label,
    datasets: [
      {
        maxBarThickness: 15,
        label: `Popular ${title}`,
        backgroundColor: info,
        borderColor: 'transparent',
        data: datas
      }

      // {
      //   maxBarThickness: 15,
      //   backgroundColor: info,
      //   label: 'Personal Data',
      //   borderColor: 'transparent',
      //   data: [430, 590, 510, 240, 360]
      // }
    ]
  }

  return (
    <Card>
      {/* <CardHeader title={title} subheader='$74,123' /> */}
      <CardHeader title={title} />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsHorizontalBarChart
