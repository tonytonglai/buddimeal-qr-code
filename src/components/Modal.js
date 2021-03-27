import React from 'react';

const Modal = ({modalVisible, scanBool, setScanBool, setModalVisible}) => {
    
    // console.log("Modal visibility is", modalVisible);
    // console.log("Scan boolean is ", scanBool);
    // setScanBool(false);

    return (
        <div 
        style={
            { 
            visibility: (modalVisible? 'visible':'hidden'), 
            backgroundColor: 'lightgreen',
            display:'grid'
            }
        }
        onClick={() => {
            setScanBool(true)
            setModalVisible(false);
        }}
        >
            <div style={{textAlign:'center'}}>
                <i className="ui large icon check"></i>
                <h1 style={{display:'inline'}}>All good! You're good to go.</h1>
            </div>
        </div>
    )
}

export default Modal;