import React from 'react';
import './HighScoreModal.css';


export class HighScoreModal extends React.Component{
    render(){
        let highScoreNum = 0;
        return(
            <div className="highScorePopUp">
            <div className="highScorePopUp_topBar">
            <div className="highScoreClose" onClick={this.props.closeHighScorePopUp}>X</div>
            </div>
            <div className="highScoreTitle"> HIGH SCORES</div>
            <div className="highScorePopUp_content">
            <div className="scoreNames">
            {
                (this.props.scoresName) ? 
                this.props.scoresName.map((name)=>{
                    highScoreNum++;
                    return(
                        <div>{highScoreNum}. {name}</div>
                    );
                })
                : null
            }
            </div>
            <div className="scores">
            {
                (this.props.scores) ? 
                this.props.scores.map((score)=>{
                    return(
                        <div>{score}</div>
                    );
                })
                : null
            }
            </div>
            </div>
            </div>
        );
    }
} 