import React from "react";
import fire from "../../Fire";

function Admin(){

    const [games, setGames]=React.useState([]);
    const [submit, setSubmit]=React.useState(false)
    const [form, setForm] = React.useState({
        name:"",
        stock:"",
        price:""
    })

    const db=fire.firestore();

    React.useEffect(()=>{
        let newItems=[];

        db.collection("store").get().then(function(snapshot){
            snapshot.forEach(function (doc){
                const obj=doc.data();

                let item = {
                    id: doc.id,
                    name: obj.name,
                    stock: obj.stock,
                    price: obj.price,
                    image: obj.image
                };

                console.log(obj);
                newItems.push(item);
            })

            setGames(newItems)
        });


    }, [db, submit]);



    const handleChange = prop => event =>{
        setForm({
            ...form,
            [prop]:event.target.value
        })
    };

    const handleSubmit = ()=>{
        db.collection("store").add(form).then(() => {
            setForm({
                name:"",
                stock: "",
                price:"",
                image:""
            });
            setSubmit(true)
        });
    };

    const boxStyle = {

        height: "470px",
        width: "300px",
        justifyItems: "center",
        color: "black",
        display: "inline-flex",
        paddingBottom: "10px",
        flexWrap: "wrap",
        margin: "50px",
        objectFit: "contain",
        backgroundColor: "blue",


    }

    const game = games.map((it, idx)=>
        <div key={idx} style={boxStyle}>
            <h1>Name: {it.name}</h1>
            <h3>Price: ${it.price}</h3>
            <h3>Quantity: {it.stock}</h3>
            <img src = {it.image} alt ={it.name} width="250px" height="300px"/>
        </div>
    );

    return(
        <div>
            <h1>Admin</h1>
            <input type="text" placeholder={"Game..."} onChange={handleChange("name")}/>
            <input type="text" placeholder={"Stock..."} onChange={handleChange("stock")}/>
            <input type="text" placeholder={"Price..."} onChange={handleChange("price")}/>
            <input type="text" placeholder={"Image..."} onChange={handleChange("image")}/>
            <button onClick={handleSubmit}>Submit</button>
            {game}
        </div>
    )
}

export default Admin;
