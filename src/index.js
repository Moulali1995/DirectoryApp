import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Sample tree
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
      ppwd: "",
      subtreeview: [],
      subtreeview2: [],
      currentree: [],
      showprevioustree: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.rootFolder = this.rootFolder.bind(this);
    this.handleTreetraverse = this.handleTreetraverse.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  // Handle the input change
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  // To render the root directory
  componentDidMount() {
    this.rootFolder();
  }
  // To handle th form data and add the folder to the tree.
  handleSubmit(event) {
    event.preventDefault();
    alert("Folder added"); // alert after folder is added
    const newFolder = [
      ...this.state.tree,
      { node: this.state.value, pnode: this.state.currentnode }
    ]; // save the folder to the previous tree
    this.setState({ tree: newFolder }, () => {
      this.rootFolder();
      this.handleTreetraverse(this.state.currentnode);
    }); // call the different functions for re-rendering of the updated components.
  }
  // To display the heirarchical view of the directory
  handleTreetraverse(node) {
    const ppwd = this.state.currentnode; // save the currentnode as previousnode for back functionality
    this.setState({ currentnode: node, ppwd: ppwd });
    let present = false;
    // check if the folder contains one or more folders inside it
    this.state.tree.forEach(item => {
      if (item.pnode === node) present = true;
    });
    // subtreeview to render the sub folders inside a particular folder which is clicked upon
    const subtreeview = this.state.tree.map((item, index) => {
      // ereturn only the nodes after filtering.
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
      // update if no sub-folder exists
      this.setState({ subtreeview: "No sub-folders found" });
    else {
      // update if any sub folders exists
      this.setState({ subtreeview: subtreeview });
    }
  }
  rootFolder() {
    // To render the root directory upon application start
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

  // Handle the back button feature to display the previous directory tree
  handleBack() {
    this.handleTreetraverse(this.state.ppwd);
    console.log(this.state.subtreeview2);
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
        <input type="button" value="Back" onClick={this.handleBack} />
        &nbsp;&nbsp; <b>PWD : {this.state.currentnode} </b>
        <hr />
        {this.state.treeview}
        {this.state.showprevioustree
          ? this.state.subtreeview2
          : this.state.subtreeview}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
