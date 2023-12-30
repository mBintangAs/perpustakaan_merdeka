import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Alert from "../partials/Alert";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  useEffect(() => {
    // Baca data dari Local Storage atau Session Storage
    const storedFlashData = localStorage.getItem("flash_data");

    if (storedFlashData) {
      const flashData = JSON.parse(storedFlashData);
      // Gunakan data flashData di sini
      setAlert(flashData)

      // Hapus data dari Local Storage atau Session Storage
      localStorage.removeItem("flashData");
      
    }
  }, []);

  return (
    <>
      {/* Sign In Start */}
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <img src={"./KMLOGO.png"} alt="" style={{ width: "300px" }} />
              </div>
              <div className="d-flex align-items-center  mb-3">
                <h3>Sign In</h3>
              </div>
              <div className="d-flex align-items-center  mb-3">
                <h3 className="text-primary">PERPUS MERDEKA</h3>
              </div>
              {alert.length>0 && (
                <Alert color={"success"} message={"Registrasi Berhasil"} />
              )}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  onChange={e=>setEmail(e.target.value)}
                  value={email}
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e=>setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                Sign In
              </button>
              <NavLink to={"/register"} className="text-center mb-0">
                Don't have an Account? Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* Sign In End */}
    </>
  );
}
