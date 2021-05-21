import React  from "react";
import {NavLink} from "react-router-dom";

function Navigation(){
    const Navi = {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        top: 0,
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",

    }

    return(
        <nav>
            <NavLink className="Navi" activeStyle={{fontWeight: "bold", color: "black"}} exact to={"/"}>Store</NavLink>
            <NavLink   className="Navi" activeStyle={{fontWeight: "bold", color: "black"}} to={"/Cart"}>Cart</NavLink>
            <NavLink   className="Navi" activeStyle={{fontWeight: "bold", color: "black"}} to={"/Admin"}>Admin</NavLink>
        </nav>
    )
}

export default Navigation;
