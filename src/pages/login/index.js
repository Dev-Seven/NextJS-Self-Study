/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 06-03-2023                       ADD Login                              DHRUV
// 1002,                 07-03-2023                       Routes Authentication                  ADITYA

// 1001 START
// Import necessary dependencies and components
import { useState } from 'react'
import Link from 'next/link'
import logo from 'public/images/SelfStudy.png'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'

import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useFormik } from 'formik'
import { loginSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { login } from 'src/store/slices/AuthSlice'
import Toast from '../Common/Toast'

// Styled components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const initialValues = {
  Email: '',
  Password: ''
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useDispatch()
  const router = useRouter()

  const { skin } = settings

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(login(values)).then(res => {
        if (res?.payload?.status === 200) {
          // Store user data in localStorage
          localStorage.setItem('permission', JSON.stringify(res?.payload?.permission))
          localStorage.setItem('userToken', JSON.stringify(res?.payload?.token))
          localStorage.setItem('data', JSON.stringify(res?.payload?.data))

          // Redirect to appropriate page based on user permission
          if (res?.payload?.permission?.dashboard?.dashboard === true) {
            router.push('/home').then(res => {})
          } else {
            router.push('/WelcomePage').then(res => {})
          }
          Toast({ response: res })
        } else {
          Toast({ response: res, error: true })
        }
      })
    }
  })

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right'>
      {/* Render the login illustration and footer illustrations */}
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/admin/images/pages/${imageSource}-${theme.palette.mode}.png`}
              loading='eager'
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <img loading='eager' src={logo.src} alt='logo' width={250} fill='none' height={120} />

            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>{`Welcome to Selfstudy! 👋🏻`}</TypographyStyled>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              {/* Email input */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <TextField
                  name='Email'
                  label='Email'
                  type='Email'
                  value={formik.values.Email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.Email && formik.touched.Email ? (
                  <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Email}</FormHelperText>
                ) : null}
              </FormControl>
              {/* Password input */}
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                <OutlinedInput
                  value={formik.values.Password}
                  name='Password'
                  onBlur={formik.handleBlur}
                  label='Password'
                  onFocus={function (e) {
                    var val = e.target.value
                    e.target.value = ''
                    e.target.value = val
                  }}
                  onChange={formik.handleChange}
                  id='auth-login-v2-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.errors.Password && formik.touched.Password ? (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {formik.errors.Password}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <br />
                {/* Forgot password link */}
                <Typography
                  variant='body2'
                  component={Link}
                  href='/forgot-password'
                  sx={{ color: 'primary.main', textDecoration: 'none', mt: 7 }}
                >
                  Forgot Password?
                </Typography>
              </Box>
              {/* Login button */}
              <Button fullWidth size='large' type='submit' variant='contained'>
                Login
              </Button>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

// Set the layout for the page
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

// Set guestGuard to true to prevent authenticated users from accessing the login page
LoginPage.guestGuard = true

export default LoginPage

// 1001 END

// /* eslint-disable lines-around-comment */
// // IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// // ==============================================================================================================//
// // 1001,                 06-03-2023                       ADD Login                              DHRUV
// // 1002,                 07-03-2023                       Routes Authentication                  ADITYA

// // 1001 START
// // Import necessary dependencies and components
// import { useState } from 'react'
// import Link from 'next/link'
// import logo from 'public/images/SelfStudy.png'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import InputLabel from '@mui/material/InputLabel'
// import IconButton from '@mui/material/IconButton'
// import Box from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import { styled, useTheme } from '@mui/material/styles'
// import FormHelperText from '@mui/material/FormHelperText'
// import InputAdornment from '@mui/material/InputAdornment'
// import Typography from '@mui/material/Typography'
// import Icon from 'src/@core/components/icon'

// import { useSettings } from 'src/@core/hooks/useSettings'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
// import { useFormik } from 'formik'
// import { loginSchema } from 'src/schemas'
// import { useDispatch } from 'react-redux'
// import { useRouter } from 'next/router'
// import { login } from 'src/store/slices/AuthSlice'
// import Toast from '../Common/Toast'
// import Image from 'next/image'

// // Styled components
// const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(20),
//   paddingRight: '0 !important',
//   [theme.breakpoints.down('lg')]: {
//     padding: theme.spacing(10)
//   }
// }))

// const LoginIllustration = styled('div')(({ theme }) => ({
//   // maxWidth: '48rem',
//   // maxHeight: '40rem', // Set the maximum height for the illustration
//   // width: '100%', // Set the width to occupy the full parent container
//   // height: 'auto', // Allow the height to adjust automatically while maintaining aspect ratio
//   // [theme.breakpoints.down('xl')]: {
//   //   maxWidth: '38rem',
//   //   maxHeight: '30rem' // Adjust the maximum height for smaller screens
//   // },
//   // [theme.breakpoints.down('lg')]: {
//   //   maxWidth: '30rem',
//   //   maxHeight: '24rem' // Adjust the maximum height for even smaller screens
//   // }
//   maxWidth: '48rem',
//   [theme.breakpoints.down('xl')]: {
//     maxWidth: '38rem'
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxWidth: '30rem'
//   }
// }))

// const RightWrapper = styled(Box)(({ theme }) => ({
//   width: '100%',
//   [theme.breakpoints.up('md')]: {
//     maxWidth: 400
//   },
//   [theme.breakpoints.up('lg')]: {
//     maxWidth: 450
//   }
// }))

// const BoxWrapper = styled(Box)(({ theme }) => ({
//   width: '100%',
//   [theme.breakpoints.down('md')]: {
//     maxWidth: 400
//   }
// }))

// const TypographyStyled = styled(Typography)(({ theme }) => ({
//   fontWeight: 600,
//   letterSpacing: '0.18px',
//   marginBottom: theme.spacing(1.5),
//   [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
// }))

// const initialValues = {
//   Email: '',
//   Password: ''
// }

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false)

//   const theme = useTheme()
//   const { settings } = useSettings()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))
//   const dispatch = useDispatch()
//   const router = useRouter()

//   const { skin } = settings

//   const formik = useFormik({
//     initialValues: initialValues,
//     validationSchema: loginSchema,
//     onSubmit: values => {
//       dispatch(login(values)).then(res => {
//         if (res?.payload?.status === 200) {
//           // Store user data in localStorage
//           localStorage.setItem('permission', JSON.stringify(res?.payload?.permission))
//           localStorage.setItem('userToken', JSON.stringify(res?.payload?.token))
//           localStorage.setItem('data', JSON.stringify(res?.payload?.data))

//           // Redirect to appropriate page based on user permission
//           if (res?.payload?.permission?.dashboard?.dashboard === true) {
//             router.push('/home').then(res => {})
//           } else {
//             router.push('/WelcomePage').then(res => {})
//           }
//           Toast({ response: res })
//         } else {
//           Toast({ response: res, error: true })
//         }
//       })
//     }
//   })

//   const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

//   return (
//     <Box className='content-right'>
//       {/* Render the login illustration and footer illustrations */}
//       {!hidden ? (
//         <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
//           <LoginIllustrationWrapper>
//             <LoginIllustration>
//               <Image
//                 alt='login-illustration'
//                 src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
//                 layout='responsive'
//                 quality={100}
//                 placeholder='blur'
//                 loading='lazy'
//                 blurDataURL={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
//                 width={608} // Set the appropriate width value
//                 height={591} // Set the appropriate height value
//               />
//             </LoginIllustration>
//           </LoginIllustrationWrapper>
//           <FooterIllustrationsV2 />
//         </Box>
//       ) : null}
//       <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
//         <Box
//           sx={{
//             p: 7,
//             height: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: 'background.paper'
//           }}
//         >
//           <BoxWrapper>
//             <Image
//               loading='lazy'
//               placeholder='blur'
//               blurDataURL={logo.src}
//               quality={100}
//               src={logo.src}
//               alt='logo'
//               width={250}
//               height={120}
//             />

//             <Box sx={{ mb: 6 }}>
//               <TypographyStyled variant='h5'>{`Welcome to Selfstudy! 👋🏻`}</TypographyStyled>
//               <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
//             </Box>
//             <form onSubmit={formik.handleSubmit}>
//               {/* Email input */}
//               <FormControl fullWidth sx={{ mb: 4 }}>
//                 <TextField
//                   name='Email'
//                   label='Email'
//                   type='Email'
//                   value={formik.values.Email}
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                 />
//                 {formik.errors.Email && formik.touched.Email ? (
//                   <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Email}</FormHelperText>
//                 ) : null}
//               </FormControl>
//               {/* Password input */}
//               <FormControl fullWidth>
//                 <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
//                 <OutlinedInput
//                   value={formik.values.Password}
//                   name='Password'
//                   onBlur={formik.handleBlur}
//                   label='Password'
//                   onFocus={function (e) {
//                     var val = e.target.value
//                     e.target.value = ''
//                     e.target.value = val
//                   }}
//                   onChange={formik.handleChange}
//                   id='auth-login-v2-password'
//                   type={showPassword ? 'text' : 'password'}
//                   endAdornment={
//                     <InputAdornment position='end'>
//                       <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
//                         <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//                 {formik.errors.Password && formik.touched.Password ? (
//                   <FormHelperText sx={{ color: 'error.main' }} id=''>
//                     {formik.errors.Password}
//                   </FormHelperText>
//                 ) : null}
//               </FormControl>
//               <Box
//                 sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
//               >
//                 <br />
//                 {/* Forgot password link */}
//                 <Typography
//                   variant='body2'
//                   component={Link}
//                   href='/forgot-password'
//                   sx={{ color: 'primary.main', textDecoration: 'none', mt: 7 }}
//                 >
//                   Forgot Password?
//                 </Typography>
//               </Box>
//               {/* Login button */}
//               <Button fullWidth size='large' type='submit' variant='contained'>
//                 Login
//               </Button>
//             </form>
//           </BoxWrapper>
//         </Box>
//       </RightWrapper>
//     </Box>
//   )
// }

// // Set the layout for the page
// LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

// // Set guestGuard to true to prevent authenticated users from accessing the login page
// LoginPage.guestGuard = true

// export default LoginPage

// // 1001 END
