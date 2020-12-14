import React, { Component } from "react";
import { withAuthenticator } from "aws-amplify-react";
import { API, graphqlOperation } from "aws-amplify";
import { createNote } from "./graphql/mutations";

class App extends Component {
  state = {
    note: "",
    notes: [],
  };
  handleChangeNode = (event) => this.setState({ note: event.target.value });

  handleAddNote = async (event) => {
    const { note, notes } = this.state;
    event.preventDefault();
    const input = { note };
    const result = await API.graphql(graphqlOperation(createNote, { input }));
    const newNode = result.data.createNote;
    const updatedNotes = [newNode, ...notes];
    this.setState({ notes: updatedNotes, note: "" });
  };

  render() {
    const { notes, note } = this.state;
    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">Amplify Notetaker</h1>
        {/*Note Form*/}
        <form onSubmit={this.handleAddNote} className="mb3">
          <input
            type="text"
            className="pa2 f4"
            placeholder="Write your note"
            onChange={this.handleChangeNode}
            value={note}
          />
          <button className="pa2 f4" type="submit">
            Add note
          </button>
        </form>
        {/*Notes list*/}
        <div>
          {notes.map((item) => (
            <div key={item.id} className="flex-items-center">
              <li className="list pa1 f3">
                {item.note}
                <button className="bg-transparent bn f4">
                  <span>&times;</span>
                </button>
              </li>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
