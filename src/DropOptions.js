import React from "react";

export class DropOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacter: "",
      charToFind: ["NA"], //TODO: ASSIGN THIS FROM PROS WHEN USER PICKS THE MAP
    };

    this.characterSelected = this.characterSelected.bind(this);
    this.didUserFindChar = this.didUserFindChar.bind(this);
  }

  characterSelected(e) {
    e.preventDefault();
    let charName = e.target.value;
    if(this.props.mapObj){
    //!CHECK IF CORRECT CHARACTE SELECTED
    for(let i = 0; i < this.props.charToFind.length; i++){
      if(charName === this.props.charToFind[i]){
        if (this.didUserFindChar({margins: this.props.mapObj.data[charName],})) {
          this.props.handleCharFound(charName);
          console.log("FOUND");
        } else {
          console.log("NO CHAR");
        }
      }
    }
  }
  }

  didUserFindChar({margins}) {
    if (
      margins[0] < Number(this.props.posY) &&
      Number(this.props.posY) < margins[2]
    ) {
      if (
        margins[3] < Number(this.props.posX) &&
        Number(this.props.posX) < margins[1]
      ) {
        return true;
      }
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <form>
          <select
            onClick={this.characterSelected}
            id="charSelect"
            name="charSelect"
            ref="selectCharacter"
          >
            {this.props.charToFind
              ? this.props.charToFind.map((char) => {
                  if (char === "NA") {
                    return (
                      <option key={"NA"} value="NA" selected disabled hidden>
                        {" "}
                        Pick{" "}
                      </option>
                    );
                  }
                  return (
                    <option key={char} value={char}>
                      {char}
                    </option>
                  );
                })
              : null}
          </select>
        </form>
      </div>
    );
  }
}
