import React from "react";

function Count({ count }: { count: string }) {
  return (
    <div className="count">
      <h3>{count}</h3>
    </div>
  );
}

export default Count;
