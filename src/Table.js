import React from 'react'
import "./Table.css";
import { prettyPrintStat } from "./util";
const Table = ({countries}) => {
    return (
        <div className="table">
          {
              countries.map(({country,cases})=> (
                  <tr>
                      <td>{country}</td>
                      <td><strong>{prettyPrintStat(cases)}</strong></td>
                          
                      
                  </tr>         
              ))
          }
        </div>
    )
}

export default Table
