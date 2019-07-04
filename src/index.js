import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: [
        { node: "/", pnode: null },
        { node: "home", pnode: "/" },
        { node: "Songs", pnode: "/" },
        { node: "Videos", pnode: "/" },
        { node: "Songs1", pnode: "Songs" },
        { node: "Songs2", pnode: "Songs" },
        { node: "Videos1", pnode: "Videos" },
        { node: "Videos2", pnode: "Videos" }
      ],
      treeview: [],
      value: "",
      currentnode: "/",
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
      { node: this.state.value, pnode: this.state.currentnode }
    ];
    this.setState({ tree: newFolder }, () => {
      this.addFolder();
      this.handleTreetraverse(this.state.currentnode);
    });
  }
  handleTreetraverse(node) {
    this.setState({ currentnode: node });
    let present = false;
    this.state.tree.forEach(item => {
      if (item.pnode === node) present = true;
    });
    const subtreeview = this.state.tree.map((item, index) => {
      return item.pnode === node ? (
        <div>
          <button
            key={index}
            onClick={() => this.handleTreetraverse(item.node)}
          >
            >{item.node}
          </button>
          <br />
        </div>
      ) : (
        <p />
      );
    });
    if (present === false)
      this.setState({ subtreeview: "No sub-folders found" });
    else this.setState({ subtreeview: subtreeview });
  }
  addFolder() {
    const treeview = this.state.tree.map((item, index) => {
      return item.node === "/" ? (
        <div>
          <button
            key={index}
            onClick={() => this.handleTreetraverse(item.node)}
          >
            {item.node}
          </button>
        </div>
      ) : (
        <p />
      );
    });
    this.setState({ treeview: treeview });
  }
  render() {
    return (
      <div className="App">
        <h3>Folder Management</h3>
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
        <hr />
        PWD : {this.state.currentnode}
        <hr />
        {this.state.treeview}
        {this.state.subtreeview}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
