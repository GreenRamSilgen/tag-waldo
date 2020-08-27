import React from "react";
import './LeftBar.css'
import {Timer} from './Timer';

class LeftBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      barClicked: false,
    };

    this.barStyle = {
        display: "block",
    }
    this.removeBarStyle ={
        display: "none",
    }


    this.leftBarAnim = this.leftBarAnim.bind(this);
  }

  leftBarAnim(){
      this.setState({
          barClicked: !this.state.barClicked,
      });
  }

  render() {
    if(this.state.barClicked){
      document.querySelector("html").style.overflow = "hidden";
    }else{
      document.querySelector("html").style.overflow = "";
    }
    return (
      <div>
        <nav>
          <div  onClick={this.leftBarAnim} className="sideModalBtn"><i className="fas fa-bars fa-2x"></i></div>
          <div>{(this.props.charToFind[0] === "NA") ? "TIME TO TAG": <div className="barToTag">TAG: {this.props.charToFind.map((char)=>{
            return <div>{char}</div>
          })}</div>}</div>
          {(this.props.mapObj) ? <Timer seconds={this.props.seconds}/> : "0sec"}
        </nav>

        <div  onClick={this.leftBarAnim} className={(this.state.barClicked) ? "sideModalBack slideOutAnim" : "sideModalBack" } style={(this.state.barClicked)? this.barStyle : this.removeBarStyle}>
          <div className="sideModal">
            <div className="sideModal__content">
              <div className="sideModal__contentItem">
                <button className="leftBarBtns" onClick={this.props.newMapClick}>NEW MAP</button>
              </div>
              <div className="sideModal__contentItem">
                <button className="leftBarBtns" onClick={this.props.highScoreClick}>HIGH SCORE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {LeftBar}