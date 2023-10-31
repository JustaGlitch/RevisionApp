import { Routes, Route, Outlet } from "react-router-dom";
import * as Layouts from "./layouts";
import * as Pages from "./pages";
import "./assets/css/bootstrap.min.css";
import "./assets/css/App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Layouts.auth />}>
        <Route index element={<Pages.Login />} />
      </Route>
      <Route path="/register" element={<Layouts.auth />}>
        <Route index element={<Pages.Register />} />
      </Route>
      <Route path="/" element={<Layouts.task />}>
        <Route path="/task/:id" element={<Pages.TaskPage/>} />
      </Route>

      <Route path="/" element={<Layouts.main />}>

        <Route index element={<Pages.MainPage/>} />
        <Route path="/account" element={<Pages.AccountPage/>}>
          <Route index element={<Pages.CollectionPage/>} />
          <Route path="collection" element={<Outlet/>} />
          <Route path="tasks" element={<Pages.AllTasksPage/>} />
          <Route path="users" element={<Pages.AllUsersPage/>} />
          <Route path="settings" element={<Pages.AccountSettingsPage/>} />
        </Route>
        <Route path="*" element={<Pages.PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
