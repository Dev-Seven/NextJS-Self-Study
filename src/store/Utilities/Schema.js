import moment from 'moment/moment'
import * as Yup from 'yup'

export const validatePhone = phone => {
  return Yup.number()
    .integer()
    .positive()
    .test(phone => {
      return phone && phone.toString().length === 10 ? true : false
    })
    .isValidSync(phone)
}

export const MobileSignInSchema = Yup.object({
  mobile_number: Yup.string()
    .required('Please enter your mobile number')
    .max(10, 'Please enter 10 Digit')
    .test('mobile_number', 'Please enter valid mobile number', value => {
      return validatePhone(parseInt(value ?? '0'))
    }),
  termsAndConditions: Yup.bool().oneOf([true], 'You need to accept the terms and conditions')
})

export const SelectSchema = Yup.object({
  city_id: Yup.string().required('Please select your city')
})

export const SignUpSchema = Yup.object({
  email: Yup.string().email('Please enter valid email').required('Please enter your email'),
  first_name: Yup.string()
    .max(32, 'First name should be less than 32 characters')
    .required('Please enter your first name'),
  last_name: Yup.string()
    .max(32, 'Last name should be less than 32 characters')
    .required('Please enter your last name'),
  age: Yup.string().required('Please enter your Age'),
  dob: Yup.string()
    .required('DOB is Required')
    .test('DOB', 'Please choose a valid date of birth', value => {
      return moment().diff(moment(value), 'years') >= 0.1
    }),
  gender: Yup.string().required('Please selecte Gender'),
  height: Yup.number().required('Please Enter Height'),
  weight: Yup.number().min(0).required('Please Enter Weight')
})
