import * as React from "react";
import "./card.css";
import FixedCards from "./fixedCards.js";

// In BoardCards.js
const BoardCards = ({ project, useBoardDrag,text,assignee }) => {
 

  let data = localStorage.getItem(`${text}1${assignee}`) && JSON.parse(localStorage.getItem(`${text}1${assignee}`)) ;
  
  const fixed_cont = <FixedCards Fixeditem={project} text={text} assignee={assignee}  />;
  const fixed_cont1 = <FixedCards Fixeditem={data} text={text}  assignee={assignee}/>;
  return ( 
    <React.Fragment>
     {data !== null? <div className="card-container" >{fixed_cont1}</div>: <div className="card-container" >{fixed_cont}</div>}
    </React.Fragment>
  );
};


export default BoardCards;
