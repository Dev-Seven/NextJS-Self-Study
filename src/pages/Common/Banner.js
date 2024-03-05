import React, { useState } from 'react'
import { Box, Button, FormControl, FormHelperText, Grid, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { img_url } from 'src/common/Service'

const Banner = ({
  formik,
  id,
  imgPrw,
  imgSrc,
  setImgSrc,
  setImgPrw,
  setIsEdit,
  name,
  formikName,
  profile,
  view,
  edit,
  size
}) => {
  // ** State
  const [inputValue, setInputValue] = useState('')

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

  const ImgStyled = styled('img')(({ theme }) => ({
    width: profile ? 150 : 250,
    height: 120,
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius
  }))

  // ** function to handle image preview
  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
    if (id) {
      setImgPrw(true)
    }
  }

  const onInputChange = event => {
    handleInputImageChange(event)
    formik.setFieldValue(formikName, event.currentTarget.files[0])
    setIsEdit(true)

    // formik.setFieldTouched('BannerImage', true);
  }

  return (
    <>
      <Grid item xs={12} sm={12}>
        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>{name}</h4>
        {/* {view ? null : ( */}
        {view ? null : (
          <Typography sx={{ color: 'red' }} style={{ fontSize: '13px' }}>
            Note :- You can upload only .jpg, .jpeg and .png file format and file max size {size} should be up to 2 MB.
          </Typography>
        )}
        {/* )} */}
      </Grid>
      <br />
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {id && imgPrw === false ? (
              <ImgStyled src={`${img_url}${imgSrc}`} alt='database img' loading='eager' />
            ) : imgPrw === true ? (
              <ImgStyled src={imgSrc} alt='default img' loading='eager' />
            ) : (
              <ImgStyled
                src={
                  !formik.errors[formikName]
                    ? `${imgSrc}`
                    : profile
                    ? '/admin/images/avatars/1.png'
                    : '/admin/images/Banner.png'
                }
                alt='preview img'
                name='ProfileImage'
                loading='eager'
              />
            )}
            {view || edit ? null : (
              <div>
                {profile ? (
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      name={formikName}
                      accept='image/png, image/jpeg'
                      onChange={onInputChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                ) : (
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload Banner
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      name={formikName}
                      accept='image/png, image/jpeg'
                      onChange={onInputChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                )}

                {formik.errors[formikName] && formik.touched[formikName] ? (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {formik.errors[formikName]}
                  </FormHelperText>
                ) : null}
              </div>
            )}
          </Box>
        </FormControl>
      </Grid>
    </>
  )
}

export default Banner
