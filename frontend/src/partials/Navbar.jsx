import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleSidebarToggle = () => {
      // Logika penanganan event listener di sini
      console.log("Sidebar Toggled");
      // Contoh: Toggle kelas di beberapa elemen
      document.querySelector(".sidebar").classList.toggle("open");
      document.querySelector(".content").classList.toggle("open");
    };

    // Menambahkan event listener ke elemen dengan kelas 'sidebar-toggler'
    document
      .querySelector(".sidebar-toggler")
      .addEventListener("click", handleSidebarToggle);

   
  }, []); // Dependency array kosong agar useEffect hanya berjalan sekali saat komponen dipasang

  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-3">
        <div style={{ backgroundColor:"transparent" }} className="sidebar-toggler flex-shrink-0">
          <i className="fa fa-bars" />
        </div>
          <input
            className="form-control border-0"
            type="search"
            placeholder="Search"
          />
       
      </nav>
      {/* Navbar End */}
    </>
  );
}
