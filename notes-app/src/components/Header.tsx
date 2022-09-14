import React from "react";

function Header(): JSX.Element {
  function home() {
    localStorage.setItem("val", "");
    window.open("/", "_self");
  }
  const logo = (
    <img
      src="https://img.icons8.com/fluency/48/000000/google-keep.png"
      alt="logo"
    />
  );
  return (
    <div className="header">
      {logo}
      <button className="home" onClick={home}>
        Keep
      </button>
    </div>
  );
}

export default Header;
