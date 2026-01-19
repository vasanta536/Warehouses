import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/custom.scss";
import OdwenLogo from '../assets/OwenLogo.jpg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const dropdownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    if (e.target.value === "AddWarehouse") navigate("/add-warehouse");
    if (e.target.value === "ListedWarehouse") navigate("/listed-warehouse");
  }
  const location = useLocation();
  useEffect(() => {
    if (location.state?.dropdown) {
  console.log("location.state?.dropdown",location.state?.dropdown)

      setSelected(location.state.dropdown);
    }
  }, [location.state]);

  const handleLogout=()=>{
    navigate("/logout")
  }

  return (
    <header className="d-flex  g-small g-md-base g-lg-large align-items-center">
      <div>
        <img className="ms-3 w-5em" src={OdwenLogo} alt="Logo" />
      </div>
      <nav className="nav">
        <ul className='list-unstyled d-flex g-small g-md-base g-lg-large m-0 p-0'>
          <li><a className="fs-small fs-md-base fs-lg-large text-decoration-none text-dark" href="/about">Dashboard</a></li>
          <li><a className="fs-small fs-md-base fs-lg-large text-decoration-none text-dark" href="/contact">Outwards</a></li>
          <li>
            <select
              className="fs-small fs-md-base fs-lg-large form-select bg-primary text-white"
              value={selected}
              onChange={(e) => { dropdownHandler(e) }}
            >
              <option value="" disabled>Masters</option>
              <option value="AddWarehouse">Add Warehouse</option>
              <option value="ListedWarehouse">Listed Warehouse</option>
            </select>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;