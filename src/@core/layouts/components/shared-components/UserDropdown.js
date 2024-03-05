// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Button, Grid, Modal, TextField, FormControl, FormHelperText } from '@mui/material'
import { useFormik, useFormikContext } from 'formik'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import { useSelector } from 'react-redux'
import { img_url } from 'src/common/Service'
import KeyIcon from '@mui/icons-material/Key'
import { changepasswordschema, topicNewsSchema } from 'src/schemas'
import { changePassword } from 'src/store/slices/AuthSlice'
import { useDispatch } from 'react-redux'
import Toast from 'src/pages/Common/Toast'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  const userData = useSelector(state => state.AuthSlice.data)

  const userdata = JSON.parse(localStorage.getItem('data'))
  const permission = JSON.parse(localStorage.getItem('permission'))

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const style = {
    position: 'absolute',

    // top: '110%',
    // left: '68%',
    transform: 'translate(-50%, -50%)',

    // width: 150,
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 6
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const initialValues = {
    OldPassword: '',
    NewPassword: ''
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: changepasswordschema,
    onSubmit: values => {
      dispatch(changePassword(values)).then(res => {
        if (res?.payload?.status === 200) {
          handleClose()
          Toast({ response: res })
        } else {
          Toast({ response: res, error: true })
        }
      })
    }
  })

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <>
      <Fragment>
        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar
            alt={`${userdata?.FirstName}`}
            onClick={handleDropdownOpen}
            sx={{ width: 40, height: 40 }}
            src={`${img_url}${userdata?.ProfileImage}`}
          />
        </Badge>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        >
          <Box sx={{ pt: 2, pb: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar
                  alt={`${userdata?.FirstName}`}
                  src={`${img_url}${userdata?.ProfileImage}`}
                  sx={{ width: '2.5rem', height: '2.5rem' }}
                />
              </Badge>
              <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {userdata?.FirstName} {userdata?.LastName}
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                  {userdata?.RoleName ? userdata?.RoleName : 'Super Admin'}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* {/ <Divider sx={{ mt: '0 !important' }} /> /} */}
          {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:account-outline' />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:email-outline' />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:message-outline' />
            Chat
          </Box>
        </MenuItem> */}
          <Divider />
          <MenuItem
            sx={{ p: 0 }}
            onClick={() => {
              router.replace({
                pathname: '/Profile'

                // query: { id: id, view: true }
              })
              handleDropdownClose()
            }}
          >
            <Box sx={styles}>
              <Icon icon='mdi:account-outline' />
              Profile
            </Box>
          </MenuItem>
          <MenuItem
            sx={{ p: 0 }}
            onClick={() => {
              formik.resetForm()
              handleOpen()
              handleDropdownClose()
            }}
          >
            <Box sx={styles}>
              {/* <Icon icon='mdi:cog-outline' /> */}
              <KeyIcon />
              Change Password
            </Box>
          </MenuItem>
          {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:currency-usd' />
            Pricing
          </Box>
        </MenuItem> */}
          {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:help-circle-outline' />
            FAQ
          </Box>
        </MenuItem> */}
          <Divider />
          <MenuItem
            onClick={handleLogout}
            sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
          >
            <Icon icon='mdi:logout-variant' />
            Logout
          </MenuItem>
        </Menu>
      </Fragment>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          className='changepassword'

          // hideBackdrop={true}
        >
          <Box sx={style} className='topic-modal-content'>
            <formik>
              <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Change Password</h4>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password'>Old Password</InputLabel>
                    <OutlinedInput
                      value={formik.values.OldPassword}
                      name='OldPassword'
                      onBlur={formik.handleBlur}
                      label='Old Password'
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
                    {formik.errors.OldPassword && formik.touched.OldPassword ? (
                      <FormHelperText sx={{ color: 'error.main' }} id=''>
                        {formik.errors.OldPassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password'>New Password</InputLabel>
                    <OutlinedInput
                      value={formik.values.NewPassword}
                      name='NewPassword'
                      onBlur={formik.handleBlur}
                      label='New Password'
                      onFocus={function (e) {
                        var val = e.target.value
                        e.target.value = ''
                        e.target.value = val
                      }}
                      onChange={formik.handleChange}
                      id='auth-login-v2-password'
                      type={showPassword1 ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword1(!showPassword1)}>
                            <Icon icon={showPassword1 ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {formik.errors.NewPassword && formik.touched.NewPassword ? (
                      <FormHelperText sx={{ color: 'error.main' }} id=''>
                        {formik.errors.NewPassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item sm={12}>
                  <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                    <Button
                      size='large'
                      onClick={() => {
                        formik.handleSubmit()
                      }}
                      variant='contained'
                      style={{ marginRight: '10px' }}
                    >
                      Save
                    </Button>
                    <Button
                      size='large'
                      onClick={() => {
                        handleClose()
                        formik.setTouched(false)
                      }}
                      variant='contained'
                      style={{ marginRight: '10px' }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </formik>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default UserDropdown
