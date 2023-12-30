import Sidebar from "../partials/Sidebar";
import Navbar from "../partials/Navbar";
import { useEffect } from "react";
import { axiosInstance } from "../main";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
        async function loadBook() {
            try {
                const res= await axiosInstance.get('/books',{ headers:'Bearer '+localStorage.getItem('key') })
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    return navigate('/login')
                    // Handle error 401 here
                } else {
                    console.log(error);
                }
            }
           
        }
        loadBook();
    },[])
  return (
    <>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar role={"admin"} username={"bintang"} activeId={"dashboard"} />
        <div className="content">
          <Navbar />
        </div>
      </div>
    </>
  );
}
