/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { img_url } from 'src/common/Service'
import {
  addCategory,
  editCategory,
  getCategoryById,
  getCategoryBySubject,
  getSubjectById
} from 'src/store/slices/LearningSlice'
import { loadData, setData } from 'src/store/slices/StorageSlice'
import { useTheme } from '@mui/material/styles'
import FallbackSpinner from 'src/@core/components/spinner'
import Link from 'next/link'
import { categorySchema } from 'src/schemas'
import Toast from 'src/pages/Common/Toast'
import Banner from 'src/pages/Common/Banner'
// import MultiMenus from './CategoryBar'

const AddCategory = () => {
  const [preview, setPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [categoryRes, setCategoryRes] = useState([])
  const [treeViewData, setTreeViewData] = useState([])
  const [subjectName, setSubjectName] = useState('')
  const [imgPath, setImgPath] = useState('')
  const [status, setStatus] = useState(false)
  const [subjectId, setSubjectId] = useState('')
  const [isParent, setIsParent] = useState(false)
  const [imgPrw, setImgPrw] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const theme = useTheme()

  // console.log('parentId', isParent)
  const [category, setCategory] = React.useState('')

  const getCategory = useSelector(state => state.LearningSlice.getSubjectCategory)
  const byIdresponse = useSelector(state => state.LearningSlice?.catgeoryId)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const getUpdatedResponse = useSelector(state => state.storageSlice)

  const dispatch = useDispatch()
  const router = useRouter()
  // const { id, view, _id } = router.query
  const id = localStorage.getItem('subjectID')
  const _id = localStorage.getItem('id')
  // const params = router.query.AddCategory
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

  // useEffect(() => {
  //   if (getCategory) {
  //     setMenus(
  //       getCategory?.map(item => {
  //         return { label: item?.CategoryName, id: item?._id }
  //       })
  //     )
  //   }
  // }, [getCategory])

  // ** useEffect to handle form data during edit
  useEffect(() => {
    if (_id) {
      dispatch(getCategoryById(_id)).then(res => {
        if (res?.payload?.data) {
          let updateData = res?.payload?.data
          setImgPath(updateData?.BannerImage)
          fetch(updateData?.BannerImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${updateData?.BannerImage}`)
              formik.setFieldValue('CategoryName', updateData?.CategoryName),
                formik.setFieldValue('categoryHierarchy', updateData?.categoryHierarchy),
                formik.setFieldValue('ParentCategoryId', updateData?.ParentCategoryId),
                formik.setFieldValue('BannerImage', file)
              dispatch(getCategoryBySubject({ SubjectId: updateData?.SubjectId, ParentCategoryId: updateData?._id }))
            })
          if (updateData?.ParentCategoryId == '') {
            setIsParent(true)
          }
          setTreeViewData(updateData?.categoryHierarchy)
          setSubjectName(updateData?.SubjectName)
          setSubjectId(updateData?.SubjectId)
          setImgSrc(updateData?.BannerImage)
          setdbImage(true)
          setPreview(true)
          setLoading(true)
        }
      })
    }
  }, [_id])

  async function readImage(e, func) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      let binaryData = e.target.result
      let base64String = window.btoa(binaryData)
      func(base64String)
    }

    let image = reader.readAsBinaryString(file)
    return image
  }

  // ** formik initialValues
  const initialValues = {
    SubjectId: id,
    ParentCategoryId: '',
    CategoryName: '',
    BannerImage: '',
    categoryHierarchy: []
  }

  const handleNewField = () => {
    formik.setFieldValue('ParentCategoryId', [...formik.values.ParentCategoryId])
  }

  const CatDropdownTree = JSON.parse(localStorage.getItem('tree'))
  // console.log('🚀 ~ file: [AddCategory].js:144 ~ CatDropdownTree:', CatDropdownTree)

  // ** formik state to handle form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: categorySchema,
    onSubmit: values => {
      const { ParentCategoryId, CategoryName, BannerImage } = values
      let data = new FormData()
      data.append('ParentCategoryId', ParentCategoryId)
      data.append('CategoryName', CategoryName)
      data.append('categoryHierarchy', JSON.stringify(CatDropdownTree || []))
      data.append('BannerImage', isEdit ? BannerImage : imgPath)
      if (_id) {
        data.append('_id', _id)
        data.append('SubjectId', subjectId)
      } else {
        data.append('SubjectId', id)
      }
      // console.log('🚀 ~ file: [AddCategory].js:152 ~ data:', Object.fromEntries(data))

      const action = _id ? editCategory(data) : addCategory(data)

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (_id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Learning/Category')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  useEffect(() => {
    dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: '' }))
  }, [dispatch, id])

  // ** function to handle change of category dropdown
  const handleChange = async e => {
    try {
      const { payload } = await dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: e.target.value }))
      if (payload?.status === 400) {
        setStatus(true)
        toast.success(`${payload.message} please add New category`, {
          style: {
            padding: '16px',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`
          },
          iconTheme: {
            primary: theme.palette.primary.main,
            secondary: theme.palette.primary.contrastText
          }
        })
      }
    } catch (error) {
      // console.error(error)
    }

    try {
      const { payload } = await dispatch(getCategoryById(e.target.value))
      const categoryObj = payload?.data
      setCategoryRes(categoryObj)
      setTreeViewData(prevData => [...prevData, categoryObj])
    } catch (error) {
      // console.error(error)
    }
  }

  // ======================= local storage ==========================//

  if (categoryRes?.ParentCategoryId == '' || treeViewData?.length > 0) {
    dispatch(setData(treeViewData))
    localStorage.setItem('tree', JSON.stringify(treeViewData))
  }

  // ======================= Handle Remove Category ==========================//

  const handleRemoveCategory = async item => {
    const index = treeViewData.findIndex(e => e.CategoryName === item.CategoryName)

    if (index >= 0) {
      setTreeViewData(prevTreeViewData => prevTreeViewData.slice(0, index))
      localStorage.setItem('tree', JSON.stringify(treeViewData.slice(0, index)))

      const lastElement = treeViewData[index - 1]

      formik.setFieldValue('ParentCategoryId', lastElement?._id)
      const promises = []

      if (lastElement) {
        promises.push(dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: lastElement?._id })))
      } else {
        promises.push(dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: '' })))
      }

      Promise.all(promises).then(results => {
        const res = results[0]
        if (res?.payload?.status === 200) {
          toast('result', res)
        } else {
          toast(res?.payload?.message)
        }
      })
      setStatus(false)
    }
  }

  // ======================= unique array & reverse ==========================//

  // let unique = []
  // mergedArray.filter(function (item) {
  //   var i = unique.findIndex(x => x?.CategoryName == item?.CategoryName)
  //   if (i <= -1) {
  //     unique.push(item)
  //   }
  //   return null
  // })

  // const reversedArray = mergedArray
  // setTreeView(reversedArray)
  // localStorage.setItem('reversedArray', JSON.stringify(reversedArray))

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 250,
    height: 120,
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius
  }))

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(4)
    }
  }))

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/admin/images/avatars/1.png')
  }

  // ** getSubject by id api calling for subject name
  useEffect(() => {
    dispatch(getSubjectById(id)).then(res => {
      setSubjectName(res?.payload?.data?.SubjectName)
    })
  }, [dispatch])

  return (
    <>
      {/* {isLoading === true ? (
        <FallbackSpinner />
      ) : ( */}
      <div className='category-container'>
        <div className='dropdown-container'>
          {/* <MultiMenus menus={menus} setMenus={setMenus} /> */}
          <h3>{params == 'EditCategory' ? byIdresponse?.SubjectName : subjectName}</h3>
          {params == 'ViewCategory'
            ? formik.values.categoryHierarchy?.map((item, i) => {
                return (
                  <>
                    <h4 key={i} className='cat-container-h4'>
                      {item.CategoryName == undefined ? null : item.CategoryName}
                    </h4>
                  </>
                )
              })
            : treeViewData?.map((item, i) => {
                return (
                  <>
                    {/* <h3>{subjectName}</h3> */}
                    <h4 key={i} className='cat-container-h4'>
                      {item.CategoryName == undefined ? null : item.CategoryName}

                      {item.CategoryName == undefined
                        ? null
                        : !byIdresponse?.isUsed && (
                            <button
                              className='cat-remove-btn'
                              onClick={() => {
                                handleRemoveCategory(item)
                                setLoading(false)
                              }}
                            >
                              {' '}
                              -
                            </button>
                          )}
                    </h4>
                  </>
                )
              })}

          {status === false && !isParent ? (
            params == 'ViewCategory' ? null : loading ? null : getCategory ? (
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                  {treeViewData?.length > 0 ? 'Select Sub Category' : 'Select Category'}
                </InputLabel>
                <Select
                  autoWidth
                  onBlur={formik.handleBlur}
                  onChange={e => {
                    handleChange(e)
                    formik.handleChange(e)
                  }}
                  label={treeViewData?.length > 0 ? 'Select Sub Category' : 'Select Category'}
                  value={category}
                  name='ParentCategoryId'
                  labelId='validation-basic-select'
                  aria-describedby='validation-basic-select'
                  placeholder='select'
                  id='validation-basic-select'
                >
                  {getCategory?.map(item => (
                    <MenuItem key={item} value={`${item._id}`}>
                      {item.CategoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <h3>No category found</h3>
            )
          ) : null}
        </div>

        <div className='form-container'>
          {params == 'ViewCategory' ? (
            isLoading === true ? (
              <FallbackSpinner />
            ) : (
              <Card>
                <CardHeader title='View Category' />
                <Divider />
                <CardContent>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                          <TextField
                            placeholder='Category'
                            label='Category'
                            name='CategoryName'
                            type='text'
                            InputProps={{ readOnly: true, disableUnderline: true }}
                            value={formik.values.CategoryName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          <Typography sx={{ mt: 5, color: 'text.disabled' }}>
                            {formik.errors.CategoryName && formik.touched.CategoryName ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik.errors.CategoryName}
                              </FormHelperText>
                            ) : null}
                          </Typography>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                          <h4>Category Banner</h4>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {preview === false ? (
                              <ImgStyled src={imgSrc} alt='defaultImage' name='BannerImage' />
                            ) : dbImage === true ? (
                              <ImgStyled src={`${img_url}${imgSrc}`} alt='dbImage' name='BannerImage' />
                            ) : (
                              <ImgStyled
                                src={`data:image/jpeg;base64,${imgSrc}`}
                                alt='PreviewImage'
                                name='BannerImage'
                              />
                            )}
                            <div>
                              <Typography sx={{ mt: 5, color: 'text.disabled' }}>
                                {formik.errors.BannerImage && formik.touched.BannerImage ? (
                                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                    {formik.errors.BannerImage}
                                  </FormHelperText>
                                ) : null}
                              </Typography>
                            </div>
                          </Box>
                        </FormControl>
                      </Grid>
                      <Grid item sm={12}>
                        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                          <Link prefetch={false} href='/Learning/Category/' style={{ textDecoration: 'none' }}>
                            <Button
                              size='large'
                              onClick={() => localStorage.removeItem('id')}
                              variant='contained'
                              style={{ marginRight: '10px' }}
                            >
                              Cancel
                            </Button>
                          </Link>

                          {/* <Button size='large' variant='contained' type='submit'>
                        Save
                      </Button> */}
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            )
          ) : isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader title={_id ? 'Edit Category' : 'Add Category'} />
              <Divider />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          InputProps={{
                            readOnly: byIdresponse?.isUsed ? true : false,
                            disableUnderline: true
                          }}
                          value={formik.values.CategoryName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          // error={formik.errors.subject}
                          placeholder='Category'
                          label='Category'
                          name='CategoryName'
                          type='text'
                        />
                        <Typography sx={{ color: 'text.disabled' }}>
                          {formik.errors.CategoryName && formik.touched.CategoryName ? (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                              {formik.errors.CategoryName}
                            </FormHelperText>
                          ) : null}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Banner
                        name='Category Banner'
                        size='(144px X 87px)'
                        formikName='BannerImage'
                        formik={formik}
                        id={_id}
                        imgPrw={imgPrw}
                        imgSrc={imgSrc}
                        setImgSrc={setImgSrc}
                        setImgPrw={setImgPrw}
                        setIsEdit={setIsEdit}
                      />
                    </Grid>
                    {/*
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {preview === false ? (
                            <ImgStyled src={imgSrc} alt='defaultImage' name='ProfileImage' />
                          ) : dbImage === true ? (
                            <ImgStyled src={`${img_url}${imgSrc}`} alt='dbImage' name='BannerImage' />
                          ) : (
                            <ImgStyled
                              src={
                                !formik.errors.BannerImage ? `data:image/jpeg;base64,${imgSrc}` : '/admin/images/Banner.png'
                              }
                              alt='PreviewImage'
                              name='BannerImage'
                            />
                          )}
                          <div>
                            <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                              Upload Banner
                              <input
                                hidden
                                type='file'
                                name='BannerImage'
                                onBlur={formik.handleBlur}
                                accept='image/png, image/jpeg'
                                onChange={e => {
                                  formik.setFieldValue('BannerImage', e.target.files[0])
                                  readImage(e, setImgSrc)
                                  setPreview(true)
                                  setdbImage(false)
                                }}
                                id='account-settings-upload-image'
                              />
                            </ButtonStyled>
                            {/* <Typography sx={{ mt: 5, color: 'text.disabled' }}>
                              Allowed PNG, JPG and JPEG. Max size of 2MB.
                            </Typography> */}
                    {/* <Typography sx={{ color: 'text.disabled' }}>
                              {formik.errors.BannerImage || formik.touched.BannerImage ? (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                  {formik.errors.BannerImage}
                                </FormHelperText>
                              ) : null}
                            </Typography>
                          </div>
                        </Box>
                      </FormControl>
                    </Grid> */}
                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        {!_id ? (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Save
                          </Button>
                        ) : (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Update
                          </Button>
                        )}
                        <Link
                          href='/Learning/Category/'
                          onClick={() => {
                            localStorage.removeItem('subjectID')
                            localStorage.removeItem('tree')
                          }}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button size='large' variant='contained'>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {/* // )} */}
    </>
  )
}

export default AddCategory
