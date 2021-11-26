import { useState, useEffect } from 'react'
import {
   CButton,
   CCard,
   CCardBody,
   CCardGroup,
   CCol,
   CContainer,
   CForm,
   CFormInput,
   CRow,
} from '@coreui/react'
import Logo from '../../../assets/brand/logo.png'
import { localStorageUtil, toastUtil } from '../../../utils'
import { authService } from '../../../services'
import { useAuthStore } from '../../../stores'


const Login = (props: any) => {
   const auth = useAuthStore()
   const [loading, setLoading] = useState(false)
   const [textLoading, setTextLoading] = useState('Login')
   const [state, setState] = useState({
      username: '',
      password: '',
   })

   useEffect(() => {
      if (localStorageUtil.get('auth')) {
         props.history.push('/')
      }
   }, [props])

   const handleSubmit = async (e: any) => {
      e.preventDefault()
      const { username, password } = state
      try {
         if (username === '') return toastUtil.useAlert('Username tidak boleh kosong!')
         if (password === '') return toastUtil.useAlert('Password tidak boleh kosong!')
         setLoading(true)
         setTextLoading('Loading...')
         const response = await authService.login({ username, password })
         const random = Buffer.from(`${new Date().getTime()}:${Math.random()}`).toString('base64')
         localStorageUtil.set('auth', random);
         auth.setUser(response.data)
         props.history.push('/')
      } catch (error: any) {
         setLoading(false)
         setTextLoading('Login')
         toastUtil.useAlert(error?.response?.data?.message || error?.message)
      }
   }

   return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
         <CContainer>
            <CRow className="justify-content-center">
               <CCol md={5}>
                  <CCardGroup>
                     <CCard className="p-4 not-rounded">
                        <CCardBody>
                           <CForm onSubmit={handleSubmit}>
                              <div className="text-center">
                                 <img src={Logo} height={'50'} alt="logo" />
                                 <span className="text-dark">React Starter App</span>
                              </div>
                              <h3>Sign In</h3>
                              <p className="text-medium-emphasis">Your account</p>
                              <div className="mb-3">
                                 <CFormInput className="not-rounded" type="text" id="username" placeholder="Username" autoComplete="off" autoFocus onChange={e => setState({ ...state, username: e.target.value })} />
                              </div>
                              <div className="mb-3">
                                 <CFormInput className="not-rounded" type="password" id="password" placeholder="Password" autoComplete="off" onChange={e => setState({ ...state, password: e.target.value })} />
                              </div>
                              <CRow>
                                 <CCol xs={12}>
                                    <div className="d-grid gap-2">
                                       <CButton disabled={loading} color="success" className="not-rounded text-white px-4" type="submit">
                                          {textLoading}
                                       </CButton>
                                    </div>
                                 </CCol>
                              </CRow>
                           </CForm>
                        </CCardBody>
                     </CCard>
                  </CCardGroup>
               </CCol>
            </CRow>
         </CContainer>
      </div>
   )
}

export default Login
