import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/generalZone/Home'
import About from './components/generalZone/About'
import BestPlaces from './components/generalZone/Bestplaces'
import Member from './components/generalZone/Member'
import Packages from './components/generalZone/packages.jsx'
import Booknow from './components/generalZone/Booknow.jsx'
import Login from './components/generalZone/Login.jsx'
import Placedetail from './components/generalZone/Placedetail.jsx'
import Contact from './components/generalZone/Contact.jsx'
import Dashboard from './components/AdminZone/Dashboard.jsx'
import Users from './components/AdminZone/Users.jsx'
import Bookings from './components/AdminZone/Bookings.jsx'
import Destinations from './components/AdminZone/Destinations.jsx'
import Packagemgmt from './components/AdminZone/Packagemgmt.jsx'
import Contactmgmt from './components/AdminZone/Contactmgmt.jsx'
import Changepassword from './components/AdminZone/Changepassword.jsx'
import Adminlogin from './components/AdminZone/Adminlogin.jsx'
import Schroll from './components/Schroll.jsx'
import Protected from './components/AdminZone/Protected.jsx'
import { BrowserRouter , Routes , Route , Navigate} from 'react-router-dom'
import  Userprofile  from './components/generalZone/Userprofile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Schroll />
     <Routes>
    <Route path='/' element={<Home/>} ></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/bestplaces' element={<BestPlaces/>}></Route>
    <Route path='/member' element={<Member/>}></Route>
    <Route path='/booknow/:id' element={ <Booknow />}></Route>
    <Route path='/packages' element={<Packages/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/placedetail/:id' element={<Placedetail />}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/profile' element={<Userprofile/>}></Route>


    <Route path='/admin' element={<Navigate to="/admin/login" />} />
    <Route path='/admin/login' element={<Adminlogin />} />
    <Route path='/admin/dashboard' element={<Protected><Dashboard /></Protected>} />
    <Route path='/admin/bookings' element={<Protected><Bookings/></Protected>  } />
    <Route path='/admin/destinations' element={<Protected><Destinations /></Protected>} />
    <Route path='/admin/users' element={<Protected><Users /></Protected>} />
    <Route path='/admin/packagesmgmt' element={<Protected><Packagemgmt /></Protected>} />
    <Route path='/admin/changepassword' element={<Protected><Changepassword /></Protected>} />
    <Route path='/admin/contactmgmt' element={<Protected><Contactmgmt/></Protected>} />
     </Routes>
    </BrowserRouter>
  </StrictMode>
)
