import React from 'react';
import fire from "../../Fire";



function Cart(){
    const [games, setGames]=React.useState([]);
    const [submit, setSubmit]=React.useState(false)
    const [mess,setMess]=React.useState("");
    const [show, setShow]=React.useState(false)



    const db=fire.firestore();

    React.useEffect(()=>{
        let newItems=[];

        db.collection("cart").get().then(function(snapshot){
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

        console.log()
    }, [db, submit]);


    const purchaseStyle={
        position: "fixed",
        top: 0,
        right: 0,



    }

    const boxStyle={

        height: "470px",
        width: "300px",
        justifyItems: "center",
        color: "white",
        display: "inline-flex",
        paddingBottom: "10px",
        flexWrap: "wrap",
        margin: "50px",
        objectFit: "contain",
        backgroundColor: "blue"


    }

    const remove=(id)=>{
        db.collection("cart").doc(id).delete().then(()=>{
            setSubmit(true)
        })
    }

    const purchase =()=>{
        db.collection("cart").get().then(function (snapshot){
            snapshot.forEach(function (doc){
                doc.ref.delete().then(()=>{
                    setSubmit(true)



                });
            });
        });
        setMess("Purchased items!")
        setShow(true)

    }

    const game = games.map((it, idx) =>
        <div key={idx} style={boxStyle}>
            <div>
                <img src={it.image} alt={it.name} width="250px" height="300px"/>
                <h3>Name: {it.name}</h3>
                <h3>Stock: {it.stock < 10 ?  "Low Stock!": it.stock}</h3>
                <h3>Price: ${it.price}</h3>
            </div>
                <button onClick={() => remove(it.id)}>Remove from Cart</button>
        </div>
    );

    return(
        <div>
            <h1>Cart</h1>
            <h2>{mess}</h2>
            {game}
            {show===false&&<button onClick={purchase} style={purchaseStyle}>Purchase</button>}
        </div>

    )
}

export default Cart;
