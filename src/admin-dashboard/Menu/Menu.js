import React, { useState, useEffect } from 'react';
import "./Menu.css";

function Menu() {

  const [menu, setMenu] = useState(null)

  const fetchMenu = async() => { 
    const res = await fetch("http://localhost:8000/api/product/getAllFood/All"); 
    const result = await res.json(); 
    setMenu(result.data.food)
    
  }
  useEffect(() => {
    // fetch("http://localhost:8000/api/product/getAllFood")
    //   .then(res => res.json())
    //   .then(data => setMenu(data))
    //   .catch(err => console.log(err));
    // console.log(menu, "this is menu");
    fetchMenu(); 

  }, []);


  console.log(menu); 
  return (

    <div className='menu-wrapper'>
      <h1>Menu</h1>
      <div className='menu-table'>

        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Extra Toppings</th>
            </tr>
          </thead>
          <tbody>
            {menu !== null ?
              (<>
                {menu.map((item, indx) => (
                  <tr>
                    <td>{indx + 1}</td>
                    <td>
                      {item.title}
                    </td>
                    <td>
                      {item.desc}
                    </td>
                    <td>
                      {item.extraOptions?.map((topping) => ( 
                        <>
                          <span>{topping.text}</span>
                          <br/>
                        </>
                      ))}
                    </td>
                  </tr>
                ))}
              </>) :
              (<>Loading . . . </>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Menu