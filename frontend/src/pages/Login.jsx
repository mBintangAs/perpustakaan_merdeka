import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Alert from "../partials/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // type, message
  const [alert, setAlert] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Baca data dari Local Storage atau Session Storage
    const storedFlashData = localStorage.getItem("alert");

    if (storedFlashData) {
      const flashData = JSON.parse(storedFlashData);
      // Gunakan data flashData di sini
      setAlert([flashData])
      // Hapus data dari Local Storage atau Session Storage
      localStorage.removeItem("alert");
    }
    if (localStorage.getItem('email')) {
      setEmail(localStorage.getItem('email'))
      localStorage.removeItem('email')
    }
    if (localStorage.getItem('key')) {
      checkMe();
    }
    async function checkMe() {
      try {
        await axios.post('/me',null, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })

        navigate('/books')
      } catch (e) {

      }
    }
  }, []);
  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      localStorage.setItem('key', res.data.access_token);
      navigate("/");
    } catch (err) {
      setAlert([{ type: "danger", message: err.response.data.error }]);
      // console.log(error);
    }
  }

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
              {alert &&
                alert.map(
                  (e) => <Alert key={e.message} color={e.type} message={e.message} />
                )}
              <form onSubmit={login} >
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                  Sign In
                </button>
              </form>
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
