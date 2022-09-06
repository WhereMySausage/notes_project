import React from "react";

function Header(props: any):JSX.Element {
        const logo = (<img src="https://img.icons8.com/fluency/48/000000/google-keep.png" 
        alt="logo" />);
    return (
        <div className="header">
            {logo}
            <h3>Keep</h3>
        </div>
    );
}

export default Header;