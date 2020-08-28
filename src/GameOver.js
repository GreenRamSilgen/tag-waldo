import React from 'react';
import './GameOver.css'
import firebase from "firebase/app";
import "firebase/firestore";


export class GameOver extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isTimeFaster = this.isTimeFaster.bind(this);
    }
    
    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let newScores = this.isTimeFaster(this.props.winTime, this.props.mapObj.data.highScores, this.props.mapObj.data.highScoresName);
        if(newScores !== null){
            let docRef = firebase.firestore().collection(this.props.mapType).doc(this.props.mapObj.id);
            docRef.update({
                highScores: newScores.scoreArr,
                highScoresName: newScores.scoreNames,
            });
        }

        this.props.closeGameOverPopUp();
    }

    isTimeFaster(winTime, scores, scoreNames){
        let newScoreArr = scores;
        let newScoreNameArr = scoreNames;
        for(let i = 0; i < scores.length; i++){
            if(winTime < scores[i]){
                newScoreArr.splice(i,0, winTime);
                newScoreNameArr.splice(i,0,this.state.value);
                if(newScoreArr.length > 5){
                    return {
                        scoreArr: newScoreArr.slice(0,5),
                        scoreNames: newScoreNameArr.slice(0,5),
                    }
                }else{
                    return {
                        scoreArr: newScoreArr,
                        scoreNames: newScoreNameArr,
                    }
                }
            }
        }

        return null;
    }


    render(){
        return(
            <div className="gameOverPopUp">
                <div className="gameOverPopUp_topBar">
                    <div className="gameOverPopUpClose" onClick={this.props.closeGameOverPopUp}>X</div>
                </div>
                <div className="gameOverContent">
                    <div className="gameOverCongratz">
                        CONGRATULATIONS!
                    </div>
                    <div className="gameOverTime">
                        YOU FOUND ALL CHARACTERS IN {this.props.winTime}sec!
                    </div>

                    <div className="gameOverQuestion">
                        WOULD YOU LIKE TO SUBMIT YOUR SCORE? <br></br> {"(Disclaimer: Only top 5 will be displayed in high score)"}
                    </div>

                    <div className="gameOverForm">
                    <form onSubmit={this.handleSubmit}>
                        <input type="name" placeholder="Your Name Here..." value={this.state.value} onChange={this.handleChange}></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}