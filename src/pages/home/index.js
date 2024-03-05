/* eslint-disable newline-before-return */
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'

// ** Third Party Styles Import
import 'chart.js/auto'

// import ChartjsHorizontalBarChart from '../charts/ChartjsHorizontalBarChart'
// import ChartjsLineChart from '../charts/ChartjsLineChart'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
  getAllDashboardQuiz,
  getAllDashboardRevenue,
  getAllDashboardSubject,
  getAllDashboardTopic,
  getAllDashboardUser,
  getAllSupportRequest,
  getPopularQuiz,
  getPopularSubjects,
  getPopularTopics,
  threeMonthsRevenue,
  threeMonthsUsers
} from 'src/store/slices/AdminSlice'
import Link from 'next/link'

import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))
const ChartjsHorizontalBarChart = dynamic(() => import('../charts/ChartjsHorizontalBarChart'))
const ChartjsLineChart = dynamic(() => import('../charts/ChartjsLineChart'))
const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))

const Home = () => {
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const theme = useTheme()

  const dispatch = useDispatch()

  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...'
    }
    return str
  }

  function convertToInternationalCurrencySystem(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(labelValue))
  }

  const popularTopics = useSelector(state => state.AdminSlice.popularTopics)
  const popularSubjects = useSelector(state => state.AdminSlice.popularSubjects)
  const popularQuiz = useSelector(state => state.AdminSlice.popularQuiz)
  const threeMonths = useSelector(state => state.AdminSlice.threeMonths)
  const threeMonthsRevenues = useSelector(state => state.AdminSlice.threeMonthsRevenue)
  const allDashboardUser = useSelector(state => state.AdminSlice?.allDashboardUser)
  const allDashboardSubject = useSelector(state => state.AdminSlice?.allDashboardSubjects)
  const allDashboardTopic = useSelector(state => state.AdminSlice?.allDashboardTopics)
  const allDashboardQuiz = useSelector(state => state.AdminSlice?.allDashboardQuizes)
  const allDashboardRevenue = useSelector(state => state.AdminSlice?.allDashboardRevenue)
  const allSupportRequest = useSelector(state => state.AdminSlice?.allSupportRequest?.data)

  useEffect(() => {
    dispatch(getAllDashboardUser())
    dispatch(getAllDashboardSubject())
    dispatch(getAllDashboardTopic())
    dispatch(getAllDashboardQuiz())
    dispatch(getAllDashboardRevenue())
    dispatch(getPopularTopics())
    dispatch(getPopularSubjects())
    dispatch(getPopularQuiz())
    dispatch(threeMonthsUsers())
    dispatch(threeMonthsRevenue())
    dispatch(getAllSupportRequest())
  }, [dispatch])

  // Vars
  const whiteColor = '#fff'
  const yellowColor = '#ffe802'
  const primaryColor = '#836af9'
  const areaChartBlue = '#2c9aff'
  const barChartYellow = '#ffcf5c'
  const polarChartGrey = '#4f5d70'
  const polarChartInfo = '#299aff'
  const lineChartYellow = '#d4e157'
  const polarChartGreen = '#28dac6'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const horizontalBarInfo = '#26c6da'
  const polarChartWarning = '#ff8131'
  const scatterChartGreen = '#28c76f'
  const warningColorShade = '#ffbd1f'
  const areaChartBlueLight = '#84d0ff'
  const areaChartGreyLight = '#edf1f4'
  const scatterChartWarning = '#ff9f43'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <>
            <Grid container spacing={6} className='match-height'>
              <Grid item xs={6} sm={3} md={2} className='dashboard-card'>
                <Link href='/Learning/AppUser' prefetch={false} style={{ textDecoration: 'none' }}>
                  <CardStatisticsVertical
                    stats={allDashboardUser?.data?.AllUsers}
                    activeStats={allDashboardUser?.data?.ActiveUser}
                    color='primary'
                    title='All Users'
                    activeTitle='Active Users'
                    chipText='Last 4 Month'
                    primaryColor={primaryColor}
                    icon={<Icon icon='mdi:account-details' />}
                  />
                </Link>
              </Grid>
              <Grid item xs={6} sm={3} md={2} className='dashboard-card'>
                <Link href='/Learning/Subject' prefetch={false} style={{ textDecoration: 'none' }}>
                  <CardStatisticsVertical
                    stats={allDashboardSubject?.data?.totalSubjects}
                    color='primary'
                    title='Total Subjects'
                    chipText='Last Six Month'
                    icon={<Icon icon='mdi:book-open-page-variant' />}
                  />
                </Link>
              </Grid>
              <Grid item xs={6} sm={3} md={2} className='dashboard-card'>
                <Link href='/Learning/Topic' prefetch={false} style={{ textDecoration: 'none' }}>
                  <CardStatisticsVertical
                    stats={allDashboardTopic?.data?.totalTopic}
                    color='primary'
                    title='Total Topics'
                    chipText='Last Six Month'
                    icon={<Icon icon='mdi:view-headline' />}
                  />
                </Link>
              </Grid>
              <Grid item xs={6} sm={3} md={2} className='dashboard-card'>
                <Link href='/QuizManager/Quiz' prefetch={false} style={{ textDecoration: 'none' }}>
                  <CardStatisticsVertical
                    stats={allDashboardQuiz?.data?.totalQuiz}
                    color='primary'
                    title='Total Quiz'
                    chipText='Last Six Month'
                    icon={<Icon icon='mdi:lightbulb-question' />}
                  />
                </Link>
              </Grid>
              <Grid item xs={6} sm={3} md={2} className='dashboard-card'>
                <Link href='/Payments' prefetch={false} style={{ textDecoration: 'none' }}>
                  <CardStatisticsVertical
                    stats={`₹ ${convertToInternationalCurrencySystem(allDashboardRevenue?.data?.TotalRevenue)}`}
                    color='primary'
                    title='Total Revenue'
                    chipText='Last Six Month'
                    icon={<Icon icon='uil:rupee-sign' />}
                  />
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={6} my={2}>
              <Grid item xs={12} sm={12} md={4}>
                <ChartjsHorizontalBarChart
                  labelColor={labelColor}
                  info={horizontalBarInfo}
                  borderColor={borderColor}
                  legendColor={legendColor}
                  warning={warningColorShade}
                  label={popularSubjects?.map(data => truncateString(data?.SubjectName, 20))}
                  datas={popularSubjects?.map(data => data?.user)}
                  title='Subjects'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <ChartjsHorizontalBarChart
                  labelColor={labelColor}
                  info={horizontalBarInfo}
                  borderColor={borderColor}
                  legendColor={legendColor}
                  warning={warningColorShade}
                  label={popularTopics?.map(data => truncateString(data.TopicName, 20))}
                  datas={popularTopics?.map(data => data?.user)}
                  title='Topics'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <ChartjsHorizontalBarChart
                  labelColor={labelColor}
                  info={horizontalBarInfo}
                  borderColor={borderColor}
                  legendColor={legendColor}
                  warning={warningColorShade}
                  label={popularQuiz?.map(data => truncateString(data.QuizName, 20))}
                  datas={popularQuiz?.map(data => data?.user)}
                  title='Quizes'
                />
              </Grid>
            </Grid>
            <Grid container spacing={6} my={2}>
              <Grid item xs={12} sm={12} md={12}>
                <ChartjsLineChart
                  white={whiteColor}
                  labelColor={labelColor}
                  success={lineChartYellow}
                  borderColor={borderColor}
                  legendColor={legendColor}
                  primary={lineChartPrimary}
                  warning={lineChartWarning}
                  label={threeMonthsRevenues?.data?.months?.map(data => data)}
                  datas={threeMonthsRevenues?.data?.revenue?.map(data => data) ?? []}
                  duration={threeMonthsRevenues?.Duretion}
                  title='Monthwise Revenue'
                  title2='Revenue'
                />
              </Grid>
            </Grid>
            <Grid container spacing={6} my={2}>
              <Grid item xs={12} sm={12} md={12}>
                <ChartjsLineChart
                  white={whiteColor}
                  labelColor={labelColor}
                  success={lineChartYellow}
                  borderColor={borderColor}
                  legendColor={legendColor}
                  primary={lineChartPrimary}
                  warning={lineChartWarning}
                  threeMonths={threeMonths}
                  label={threeMonths?.data?.months?.map(data => data)}
                  datas={threeMonths?.data?.users?.map(data => data) ?? []}
                  duration={threeMonths?.Duretion}
                  title='Monthwise Users'
                  title2='Users'
                />
              </Grid>
            </Grid>
            <Grid container spacing={6} my={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Table allSupportRequest={allSupportRequest} />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Home
