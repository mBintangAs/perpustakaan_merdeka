import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ role, username }) {
  const navigate = useNavigate()
  async function logout() {
    try {
      await axios.post('/logout',null, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
      localStorage.removeItem('key')
      navigate('/login')
    } catch (error) {

    }

  }
  return (
    <>
      {/* Sidebar Start */}
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <div className="navbar-brand mx-4 mb-3">
            <img src={"./KMLOGO.png"} alt="" style={{ width: "100px" }} />
          </div>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <i className="fas fa-user-alt" style={{ fontSize: 40 }}></i>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">{username}</h6>
              <span>{role}</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <NavLink to={'/books'} activeclassname="active" className="nav-item nav-link mb-3">
              <i className="fas fa-clipboard-list me-2"></i>
              Buku
            </NavLink>
            <NavLink to={'/categori'} activeclassname="active" className="nav-item nav-link mb-3">
              <i className="fas fa-th me-2"></i>
              Kategori
            </NavLink>
            <NavLink onClick={logout}  className="nav-item nav-link ">
              <i className="fa fa-sign-out-alt me-2"></i>
              Logout
            </NavLink>

          </div>
        </nav>
      </div>
      {/* Sidebar End */}
    </>
  );
}
