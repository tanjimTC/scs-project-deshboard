import React, { useState } from "react";
import { db } from "../../firebase.config";
const Protected = () => {
  const [spells, setSpells] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("links").get();
      setSpells(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Protected</h1>
      {/* {links && links.map((x) => <li>{x.title}</li>)} */}
      {spells.map((spell) => (
        <li key={spell.link}>{spell.title}</li>
      ))}
    </div>
  );
};

export default Protected;
