import { Routes, Route, Outlet } from 'react-router-dom'
import BasicLayout from "./layouts";
import * as Pages from './pages'
import './assets/css/bootstrap.min.css'
import './assets/css/App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<Pages.MainPage/>} />
        <Route path="/login" element={<Pages.Login/>} />
        <Route path="/register" element={<Pages.Register/>} />
        <Route path="/task/:id" element={<Pages.TaskPage/>} />
        <Route path="/account" element={<Pages.AccountPage/>}>
          <Route index element={<Pages.CollectionPage/>} />
          <Route path="collection" element={<Outlet/>} />
          <Route path="tasks" element={<Pages.AllTasksPage/>} />
          <Route path="users" element={<Pages.AllUsersPage/>} />
          <Route path="settings" element={<Pages.AccountSettingsPage/>} />
        </Route>
        <Route path='*' element={<Pages.PageNotFound/>} />
      </Route>
    </Routes>
  )
}

export default App
