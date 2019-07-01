import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: [{ node: "/", child: [] }, { node: "home", child: ["folder1"] }],
      treeview: [],
      value: "",
      currentnode: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFolder = this.addFolder.bind(this);
    this.handleTreetraverse = this.handleTreetraverse.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  componentDidMount() {
    this.addFolder();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert("Folder added");
    const newFolder = [...this.state.tree, this.state.value];
    this.setState({ tree: newFolder }, () => this.addFolder());
  }
  handleTreetraverse(index) {
    this.setState({ currentnode: index });
    const treeview = this.state.tree.map((item, index) => {
      return (
        <button key={index} onClick={this.handleTreetraverse(index)}>
          {item}
        </button>
      );
    });
    this.setState({ treeview: treeview });
  }
  addFolder() {
    const treeview = this.state.tree.map((item, index) => {
      return (
        <div>
          <button key={index} onClick={this.handleTreetraverse(index)}>
            {item.node}
          </button>
          {item.child.length !== 0 ? (
            <div>
              {item.child.map((item, index) => {
                return (
                  <button key={index} onClick={this.handleTreetraverse(index)}>
                    {item}
                  </button>
                );
              })}
            </div>
          ) : (
            <p />
          )}
        </div>
      );
    });
    this.setState({ treeview: treeview });
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.treeview}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
