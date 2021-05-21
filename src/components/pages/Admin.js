import React from "react";
import fire from "../../Fire";

function Admin(){

    const [games, setGames]=React.useState([]);
    const [submit, setSubmit]=React.useState("True")
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
            setSubmit(!submit)
        });
    };

    return(
        <div>
            <h1>Admin</h1>
            <input type="text" placeholder={"Game..."} onChange={handleChange("name")}/>
            <input type="text" placeholder={"Stock..."} onChange={handleChange("stock")}/>
            <input type="text" placeholder={"Price..."} onChange={handleChange("price")}/>
            <input type="text" placeholder={"Image..."} onChange={handleChange("image")}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Admin;
