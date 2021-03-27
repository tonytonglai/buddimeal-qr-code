import { useState, useEffect } from 'react';
import React from 'react';
import List from './List';
import QRScanner from './QRScanner';

//declare something here to pass into QRScanner as a prop, so 
//other components can access the data


const App = () => {

    const [modalActivate, setModalActivate] = useState(false);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);

    useEffect(() => {
        const getPastOrders = async () => {
            const pastFromServer = await fetchPastOrders();
            setPastOrders(pastFromServer);
        }

        const getPendingOrders = async () => {
            const currentOrders = await fetchPendingOrders();
            setPendingOrders(currentOrders);
        }
        getPastOrders();
        getPendingOrders();
    }, []);

    //  to fetch the pending orders 
    const fetchPendingOrders = async () => {
        const res = await fetch('http://localhost:5000/pendingOrders');
        const data = await res.json();
        return data;
    }

    // to fetch PAST orders...
    const fetchPastOrders = async () => {
        const res = await fetch('http://localhost:5000/pastOrders');
        const data = await res.json();
        return data;
    }

    const updateOrder = async (id) => {
        
        const orderToGo = pendingOrders.filter(order => order.id == id);

        await fetch(`http://localhost:5000/pendingOrders/${id}`,{
            method: "DELETE"
        })
        setPendingOrders(pendingOrders.filter((orderReady) => orderReady.id !== id))


        const res = await fetch(`http://localhost:5000/pastOrders`,{
            method: "POST" ,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(orderToGo).slice(1,-1)
        })

        const data = await res.json();
        setPastOrders([...pastOrders, data]);
    }

    const examineData = (id) => {
        pendingOrders.forEach((order) => {
            // i COULD have some specific state here that gets passed into
            // the QRScanner, or...
            if (order.id == id) {
                setModalActivate(true);
            }
        })
    }

    

    return (
    <div>
        <h1 className="" style={{
            padding: '10px', 
            paddingTop:'40px', 
            textAlign:'center', 
            boxShadow:"0px 10px 0px 0px black blur",
        }}
        >
            BuddieMeal QR Code Scanner
        </h1>
        <QRScanner 
            examineData={examineData} 
            modalActivate={modalActivate} 
            setModalActivate={setModalActivate}
            updateOrder={updateOrder}
        />
        <List pastOrders={pastOrders}/>
    </div>
        );
}

export default App;