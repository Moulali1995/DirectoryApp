import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: [
        {
          node: "/",
          child: [
            { node: "home", child: [{ node: "folder1", child: [] }] },
            { node: "admin", child: [{ node: "admin1", child: [] }] }
          ]
        }
      ],
      treeview: [],
      value: "",
      currentnode: "",
      subtreeview: [],
      currentree: []
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
    const newFolder = [
      ...this.state.tree,
      { node: this.state.value, child: [] }
    ];
    this.setState({ tree: newFolder }, () => this.addFolder());
  }
  handleTreetraverse(index) {
    this.setState({ currentnode: index });
    const currentree = this.state.tree;
    console.log(currentree[0]);
    this.setState({ currentree: currentree }, () =>
      console.log(this.state.currentree)
    );
    const subtreeview = this.state.currentree.map((item, index) => {
      return (
        <div>
          <button key={index} onClick={() => this.handleTreetraverse(index)}>
            {item.child[index].node}
          </button>
          <br />
          {item.child.length !== 0 ? (
            <div>
              {item.child.map((item, index) => {
                return (
                  <div>
                    <button
                      key={index}
                      onClick={() => this.handleTreetraverse(index)}
                    >
                      {item.node}
                    </button>
                    <br />
                  </div>
                );
              })}
            </div>
          ) : (
            <p />
          )}{" "}
          <br />
        </div>
        // </button> // <button key={index} onClick={() => this.handleTreetraverse(index)}>
      );
    });
    console.log(subtreeview);
    this.setState({ subtreeview: subtreeview });
  }
  addFolder() {
    const treeview = this.state.tree.map((item, index) => {
      return (
        <div>
          <button key={index} onClick={() => this.handleTreetraverse(index)}>
            {item.node}
          </button>
          <br />
          {/* {item.child.length !== 0 ? (
            <div>
              {item.child.map((item, index) => {
                return (
                  <button key={index} onClick={()=>this.handleTreetraverse(index)}>
                    {item.node}
                  </button>
                );
              })}
            </div>
          ) : (
            <p />
          )} */}
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
        {this.state.subtreeview}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
