import React from 'react';
import './NewMapModal.css';
import firebase from "firebase/app";
import "firebase/firestore";


export class NewMapModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mapType: "easyMap",
            allMaps: [],
        }

        this.getEzMap = this.getEzMap.bind(this);
        this.getMedMap = this.getMedMap.bind(this);
        this.getHardMap = this.getHardMap.bind(this);
        this.mapSelected = this.mapSelected.bind(this);

        this.setUpMaps("easyMap");
        
    }

    getEzMap(){
        this.setUpMaps("easyMap");
        this.props.setEzMap();
    }

    getMedMap(){
        this.setUpMaps("medMap");
        this.props.setMedMap();
    }

    getHardMap(){
        this.setUpMaps("hardMap");
        this.props.setHardMap();
    }

    setUpMaps(type){
        let tempMaps = [];
        firebase.firestore().collection(type).get().then((querySnapshot)=>{
            querySnapshot.forEach(function(doc){
                let obj = {
                    id: doc.id,
                    data: doc.data(),
                }
                tempMaps.push(obj);
            });
            this.setState({
                mapType: type,
                allMaps: tempMaps,
            });
        });
    }

    mapSelected(e,obj){
        this.props.setMapObj(obj);
    }
    render(){
        let i = 0;
        return(
            <div className="newMapPopUp">
            <div className="mapSelect">
            <div>
                <button className="newMapBtns" onClick={this.getEzMap}>Easy</button>
                <button className="newMapBtns" onClick={this.getMedMap}>Medium</button>
                <button className="newMapBtns" onClick={this.getHardMap}>Hard</button>
            </div>
            <div className="madMode">
                {(this.state.mapType === "easyMap") ? "EASY MAPS" : null}
                {(this.state.mapType === "medMap") ? "MEDIUM MAPS" : null}
                {(this.state.mapType === "hardMap") ? "HARD MAPS" : null}
            </div>
            <div className="newMapClose" onClick={this.props.closeNewMapPopUp}>X</div>
            </div>
            <div className="cardHolder">
            {this.state.allMaps.map((obj)=>{
                return(
                    <div className="mapCard" key={i++}>
                        <img className="mapCardImg" onClick={(e)=>{this.mapSelected(e,obj)}} src={obj.data.imgUrl} alt="waldo map"></img>
                    </div>
                );
            })}
            </div>
            </div>
        );
    }
} 