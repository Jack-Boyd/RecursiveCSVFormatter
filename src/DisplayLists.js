import React, { Component } from 'react';
import DisplayListItem from './DisplayListItem';

export default class DisplayLists extends Component {

  hasChildren(parent) {
    //Filter based on if parameters Id exists in any rows ParentId column
    return this.props.rows.filter((row) => row[2] === parent[0]).length;
  }

  render(){
    //Get level
    const level = this.props.level || 0;
    //Get ParentId if available
    const parentId = this.props.parentId || 0;
    //Get the Parents children, if no parent exists, get everyone
    const rowsForLevel = parentId != 0 ? this.props.rows.filter((row) => row[2] === parentId) : this.props.rows;

    return (
      <div level={level}>
        {
          rowsForLevel.map((row, i) => {
            //Stop iteration if there is no name in row
            if (!row[1]) return null;
            //Stop iteration if iteration has a parent on the top level
            if (row[2] && level == 0) return null;

            return (
              //Show list for this level
              //Recurssively call DisplayLists component if the current row has children, checked with hasChildren function
              <ul key={`level-${level}-${i}`}>
                <DisplayListItem {...row} />
                {this.hasChildren(row) > 0 && <DisplayLists rows={this.props.rows} parentId={row[0]} level={level+1}/>}
              </ul>
            )
          })
        }
      </div>
    )
  }
}

