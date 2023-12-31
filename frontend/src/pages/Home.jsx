import Sidebar from "../partials/Sidebar";
import Navbar from "../partials/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate,Outlet } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [role,setRole] = useState('')
  const [name,setName] = useState('')
  const [search ,setSearch] = useState('')
  useEffect(() => {
    async function is_login() {
      try {
        const me = await axios.post('/me',null, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
        setName(me.data.name)
        setRole(me.data.is_admin?"Admin":"User")
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("alert", JSON.stringify({ type: "warning", message: "Login Dahulu" }));
          return navigate('/login')
          // Handle error 401 here
        } else {
          console.log(error);
        }
      }

    }
    is_login();
  }, [])
  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar role={role} username={name} activeId={"dashboard"} />
        <div className="content">
          <Navbar setSearch={setSearch} />
          <Outlet context={search}/>
        </div>
      </div>
    </>
  );
}
