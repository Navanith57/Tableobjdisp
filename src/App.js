import React, { useState  } from "react";
import data from "./data";
import { FaFilter, FaSort } from "react-icons/fa";

function App() {
  const [colnos, setColnos] = useState("");
  const [click, setClick] = useState(Object.keys(data[0])); 
  const [show, setShow] = useState(false); 
  const [filter,setFilter]=useState(null);
  const [filtervalues,setFilterValues]=useState([]);
  const [sortcol,setSortCol]=useState(null);
  const [selectedfilter,setSelectedFilter]=useState([]);
  const [filtereddata,setFiltereddata]=useState(data);
  const [sortorder,setSortOrder]=useState("asc");
  
  function handleClick() {
    if ( colnos < 1 ) {
      alert("Enter a valid number " );
      return;
    }
    setShow(true);
    setClick(Object.keys(data[0]).slice(0, colnos));
  }
  const OpenPopup=(click)=>{
    setFilter(click);
    const unique=[...new Set(data.map((item)=>(item[click])))]
    setFilterValues(unique);
    setSelectedFilter((prev)=>({...prev,[click]:prev[click] || [],}))
  }

  const SortPopup=(click)=>{
    setSortCol(click);
  }

  

  const HandleFilter = (value) => {
    setSelectedFilter((prev) => {
      const updated = { ...prev };
      if (!updated[filter]) {
        updated[filter] = [];
      }

      if (updated[filter].includes(value)) {
        updated[filter] = updated[filter].filter((v) => v !== value);
      } else {
        updated[filter].push(value);
      }

      return updated;
    });
  };

  const ApplyFilter=()=>{
    let tempdata=data;
    Object.keys(selectedfilter).forEach((element) => {
      if(selectedfilter[element].length>0){
        tempdata=tempdata.filter((item)=>selectedfilter[element].includes(item[element]));
      }
      
    });
    setFiltereddata(tempdata);
  }
  
  const applySorting = (order) => {
    if (!sortcol) return;
  
    const sorted = [...filtereddata].sort((a, b) => {
      const valA = a[sortcol];
      const valB = b[sortcol];
  
      if (typeof valA === "number" && typeof valB === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      } else {
        return order === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
  
    setFiltereddata(sorted);
    setSortOrder(order);
    setSortCol(null);
  };
  


  

  return (
    <div className="Table">
      <h1>Table</h1>

      <label htmlFor="hi">Enter number of columns</label>
      <br />
      <input
        type="number"
        placeholder="Enter number of columns"
        id="hi"
        value={colnos}
        onChange={(e) => setColnos(e.target.value)}
      />
      <button onClick={handleClick} >Enter</button>
      <br />
      
      {show && 
      <table border="1px solid black" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {click.map((key, index) => (
              <th key={index}>
                {key}
                <FaFilter onClick={()=>{OpenPopup(key)}}/>
                  <FaSort onClick={()=>{SortPopup(key)}} />
                </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtereddata.map((item, index) => (
            <tr key={index}>
              {click.map((value, i) => (
                <td key={i}>{item[value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>}
     
     {filter && <div>
     {filtervalues.map((key,index)=>(
        <div key={index}>
          <input
          type="checkbox"
          checked={selectedfilter[filter]?.includes(key) || false}
          onChange={()=>{HandleFilter(key)}}
          />{key}
        </div>
      
     ))}
     <button onClick={()=>{ApplyFilter()}}>Apply Filters</button>
     </div>}

     {sortcol && (
        <div >
          <button onClick={() => applySorting("asc")}>Ascending</button>
          <button onClick={() => applySorting("desc")}>Descending</button>
        </div>
      )}

    </div>
  );
}

export default App;
