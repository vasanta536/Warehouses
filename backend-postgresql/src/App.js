// import React,{useState} from 'react';
// import AddWarehouseForm from './components/AddWarehouseForm';
// import Header from './components/Header';
// import ListedWarehouse from './components/ListedWarehouse';
// import { Routes, Route } from "react-router-dom";

// function App() {
//   const [selected, setSelected] = useState<string>("");
  
//   return (
// <div>
//   <Header onSelect={setSelected}/>
//   {selected === "" && <ListedWarehouse />}
//   {selected === "AddWarehouse" &&  <AddWarehouseForm />}
//   {selected === "ListedWarehouse" && <ListedWarehouse />}
// <Routes>
//       <Route path="/listed-warehouse" element={<ListedWarehouse />} />
// </Routes>

// </div>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route } from "react-router-dom";
import AddWarehouseForm from './components/AddWarehouseForm';
import Header from './components/Header';
import ListedWarehouse from './components/ListedWarehouse';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<ListedWarehouse />} />

        {/* Listed warehouses page */}
        <Route path="/listed-warehouse" element={<ListedWarehouse />} />

        {/* Add warehouse page */}
        <Route path="/add-warehouse" element={<AddWarehouseForm />} />
      </Routes>
    </div>
  );
}

export default App;