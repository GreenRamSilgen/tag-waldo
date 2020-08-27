import React from 'react';

export class GameOver extends React.Component{
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
                    <form>
                        <input type="text" placeholder="Your Name Here..."></input>
                        <input type="submit"></input>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}