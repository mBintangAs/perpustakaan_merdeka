import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({});
  useEffect(() => {
    if (localStorage.getItem('key')) {
      checkMe();
    }
    async function checkMe() {
      try {
        await axios.post('/me',null,{headers:{Authorization:'Bearer ' + localStorage.getItem('key')}})

        navigate('/books')
      } catch (e) {

      }
    }
  })
  async function register(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/register", {
        email,
        password,
        name,
      });
      localStorage.setItem('email', email);
      localStorage.setItem('alert', JSON.stringify({ type: "success", message: "Registrasi Berhasil" }));
      navigate("/login");
    } catch (err) {
      setError(err.response.data.errors);
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
                <h3>Sign Up</h3>
              </div>
              <div className="d-flex align-items-center  mb-3">
                <h3 className="text-primary">PERPUS MERDEKA</h3>
              </div>
              <form onSubmit={register}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                  />
                  <label htmlFor="floatingInput">Name</label>
                  {error?.name &&
                    <p className="text-danger text-xs mt-1">{error?.name[0]}</p>
                  }
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                  {error?.email &&
                    <p className="text-danger text-xs mt-1">{error?.email[0]}</p>
                  }
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {error?.password &&
                    <p className="text-danger text-xs mt-1">{error?.password[0]}</p>
                  }
                </div>
                <button
                  type="submit"
                  className="btn btn-primary py-3 w-100 mb-4"
                >
                  Sign In
                </button>
              </form>

              <NavLink to={"/login"} className="text-center mb-0">
                Already have an Account? Sign In
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* Sign In End */}
    </>
  );
}
