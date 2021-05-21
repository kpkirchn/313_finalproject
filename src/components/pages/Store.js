import React from "react";
import fire from "../../Fire";


function Store() {
    const [games, setGames] = React.useState([]);





    const db = fire.firestore();

    React.useEffect(()=>{
        let newItems = [];

        db.collection("store").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const obj = doc.data();

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

    }, [db]);


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

    function addCart(game) {
        db.collection("cart").add(game).then(() => {
            console.log(game);
        });
    }




    const game = games.map((it, idx) =>
        <div key={idx} style={boxStyle}>
            <div>
                <img src={it.image} alt={it.name} width="250px" height="300px" />
                <h3>Name: {it.name}</h3>
                <h3>Stock: {it.stock} </h3>
                <h3>Price: ${it.price}</h3>
                <button onClick={() => addCart(it)}>Add to Cart</button>
            </div>


        </div>
    );
        return (
            <div>
                <h1>Store</h1>
                {game}
            </div>
        )

}

export default Store;
