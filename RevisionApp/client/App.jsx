import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import * as Layouts from "./layouts";
import * as Pages from "./pages";
import { Preloader } from "./components";
import "./assets/css/bootstrap.min.css";
import "./assets/css/App.css";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);
  return (
    loading ? (
        <Preloader />
      ) : (
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
      </Route>

        <Route path="/account" element={<Layouts.account />}>
          <Route index element={<Pages.AccountPage/>} />
          <Route path="collection" element={<Pages.CollectionPage/>} />
          <Route path="tasks" element={<Pages.AllTasksPage/>} />
          <Route path="users" element={<Pages.AllUsersPage/>} />
         <Route path="settings" element={<Pages.AccountSettingsPage/>}/>
        </Route>
         
        <Route path="*" element={<Pages.PageNotFound />} />
      
    </Routes>
      )
  );
}

export default App;
