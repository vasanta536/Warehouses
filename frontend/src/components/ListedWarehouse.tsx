import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import homeLogo from '../assets/homeLogo.jpg';
import CustomPagination from "./Pagination";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store'
// import { increment, decrement } from '../features/counter/counterSlice';
import { setPerPageCount } from '../features/counter/counterSlice';


type Warehouse = {
  _id: string;
  id:string;
  name: string;
  address1: string;
  stateName: string;
  city: string;
  plotArea: number;
  AllowedSpace?: number;
  frontViewImage: string;
};

const ListedWarehouse: React.FC = () => {
  // const API_URL = process.env.REACT_APP_MONGODB_API_URL ||"http://localhost:5000/api"; 
const API_URL = process.env.REACT_APP_POSTGRES_API_URL||"http://localhost:5001/api"; 

//  const countVal = useSelector((state: RootState) => state.counter.value);
 const perPageVal = useSelector((state: RootState) => state.perPage.value);
 console.log("???????????perPageVal",perPageVal)

  const dispatch = useDispatch();

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [nameSearch, setNameSearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [PerPage, setPerPage]=useState(5)
  const [count,setCount]=useState(0)
const itemsPerPage = useRef<HTMLSelectElement>(null);
const navigate = useNavigate();

  const fetchWarehouses = (page = 1) => {
  console.log("itemsPerPage?.current?.value",itemsPerPage?.current?.value)
    axios.get(`${API_URL}/warehouses`, {
      params: {
        page,
        // limit:PerPage,
        limit:perPageVal,
        name: nameSearch,
        stateName: stateSearch,
        city: citySearch,
      },
    })
      .then(res => {
        setWarehouses(res.data.data);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.page);
        setCount(res.data.count)
      })
      .catch(err => console.error("Error fetching warehouses:", err));
  };
  useEffect(() => {
    fetchWarehouses(1);
  // }, [PerPage]);
  }, [perPageVal]);


  const handleSearch = () => {
    fetchWarehouses(1);
  };

  const getCumulativeRanges = (val: number): { label: string; end: number }[] => {
  const ranges: { label: string; end: number }[] = [];
  const max = Math.min(val, 15); // clamp to 15

  for (let end = 5; end <= max; end += 5) {
    ranges.push({ label: `1 - ${end}`, end });
  }

  // If max isn't a multiple of 5, add the final range
  if (max % 5 !== 0) {
    ranges.push({ label: `1 - ${max}`, end: max });
  }

  return ranges;
};

  const options = getCumulativeRanges(count);

  console.log("totalItems...", count)

  const dropdownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(">>>>>>>>>>>>>>>>>>",Number(itemsPerPage.current?.value))
    // setPerPage(Number(itemsPerPage.current?.value))
    // dispatch(setPerPageCount(Number(e.target.value)));
    // dispatch(setPerPageCount(15))
    const selected = Number(e.target.value); // <-- use the actual selected value 
    dispatch(setPerPageCount(selected));
  }

  const editWarehouse = async (id: string) => {
    console.log("heeeeeeee", id)
    navigate("/add-warehouse",
      { state: { id: id } }
    );
  }

  const handleReset = () => {
    setNameSearch("");
    setStateSearch("");
    setCitySearch("");
    fetchWarehouses(1);
  };

  return (
    <div className="p-4 rounded-3 bg-light">
      <div className="bg-white pb-4">
        <div className='d-flex col justify-content-between'>
          <div className='d-flex align-items-center m-2'>
          <img className="me-2 h-2em" src={homeLogo} alt="home logo" />
          <h1 className='fs-lg-5 fs-sm-6 fs-base fw-bold mb-0 text-nowrap'>Listed Warehouse</h1>
          </div>
          
          <div className='d-flex align-items-center m-2'>
            <h2 className='fs-lg-5 fs-sm-6 fs-base fw-bold mb-0'>Range:</h2>
             {/* <select id="dropdown" ref={itemsPerPage} onChange={(e) => { dropdownHandler(e) }} className="fs-small fs-md-base fs-lg-large form-select bg-primary text-white me-2 mx-sm-3">
        {options.map((opt) => (
          <option key={opt} value={opt} >
            {opt}
          </option>
        ))}
      </select> */}
      <select id="dropdown" 
      // ref={itemsPerPage} 
      value={perPageVal}
      onChange={dropdownHandler} 
      className="fs-small fs-md-base fs-lg-large form-select bg-primary text-white me-2 mx-sm-3" >
         {options.map((opt) => ( <option key={opt.end} value={opt.end}> {opt.label} </option> ))} 
         </select>
            </div>
        </div>

        <div className="row m-3 bg-light p-3">
          <div className="col-12 col-lg-3 mb-3 mb-lg-0">
            <label className="mb-1 small fw-bold">Warehouse Name</label>
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search by name..."
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3 mb-3 mb-lg-0">
            <label className="mb-1 small fw-bold">Warehouse State</label>
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search by state..."
              value={stateSearch}
              onChange={(e) => setStateSearch(e.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3 mb-3 mb-lg-0">
            <label className="mb-1 small fw-bold">Storage City</label>
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search by city..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3 d-flex gap-2 mt-3">
            <button onClick={handleSearch} className="btn btn-primary">Search</button>
            <button onClick={handleReset} className="btn reset-btn">Reset</button>
          </div>
        </div>

        <div className='table-responsive m-3'>
        <table className="table table-bordered table-striped table-hover"  >
          <thead className='table-primary'>
            <tr>
              <th className='text-nowrap'>Warehouse Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th className='text-nowrap'>Total Space</th>
              <th className='text-nowrap'>Allowed Space</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.length > 0 ? (
              warehouses.map((w) => (
                <tr key={w.id || w._id}>
                  <td>{w.name}</td>
                  <td>{w.address1}</td>
                  <td>{w.city}</td>
                  <td>{w.stateName}</td>
                  <td>{w.plotArea}</td>
                  <td>{w.AllowedSpace ?? w.plotArea}</td>
                  <td><button className='btn btn-info rounded-pill text-white w-lg-75 w-100'>Published</button></td>
                  <td><SearchIcon className="action-icon" onClick={()=>{editWarehouse(w.id||w._id)}} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center fst-italic">No warehouses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center pt-4"> 
        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => { setCurrentPage(p); fetchWarehouses(p); }} /> 
      </div>
    </div>
     </div>
  );
};

export default ListedWarehouse;