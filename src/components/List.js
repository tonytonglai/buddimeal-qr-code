import React from 'react';
import { useState } from 'react';
import Entry from './Entry';

const List = ({ pastOrders }) => {

    return (
        <div className="container bill">
            <h1>Previous Orders</h1>
            {pastOrders.map(order => (
                <Entry key={order.id} order={order}/>
            ))}
        </div>
    )
}

export default List
