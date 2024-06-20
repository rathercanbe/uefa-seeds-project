import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router";
import { TableContext } from "../../../stores/StoreProvider";

const Tables = (props) => {
  const { league_code } = useParams();
  const table = useContext(TableContext);
  const [currentTable, setCurrentTable] = useState([]);

  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  useEffect(() => {
    if (table) {
      const currentTableFiltered = table.filter(
        (current) => current.league_code === league_code
      );
      setCurrentTable(currentTableFiltered);
    }
  }, [league_code, table]);

  const tableHTML = currentTable.map((table) => {
    return table.table.map((team) => {
      return (
        <tr key={team.position}>
          <th scope="row">{team.position}</th>
          <td>{team.name}</td>
          <td>{team.games}</td>
          <td>{team.points}</td>
          <td>{team.winners}</td>
          <td>{team.draws}</td>
          <td>{team.losers}</td>
          <td>{team.bilance}</td>
          <td>{team.difference}</td>
        </tr>
      );
    });
  });

  return (
    <>
      <Sidebar sidebar_type="tables" />
      {league_code ? (
        <div className="table-responsive">
          <table
            className="table table-dark table-striped"
            style={{
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th scope="col">Pos</th>
                <th scope="col">Club</th>
                <th scope="col">Games</th>
                <th scope="col">Points</th>
                <th scope="col">Winners</th>
                <th scope="col">Draws</th>
                <th scope="col">Losers</th>
                <th scope="col">Goals</th>
                <th scope="col">+/-</th>
              </tr>
            </thead>
            <tbody>{tableHTML}</tbody>
          </table>
        </div>
      ) : (
        "Select league from sidebar"
      )}
    </>
  );
};

export default Tables;
