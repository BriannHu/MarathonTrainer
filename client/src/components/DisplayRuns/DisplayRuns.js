import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Run = (props) => (
  <tr>
    <td>{props.run.name}</td>
    <td>{props.run.date.substring(0, 10)}</td>
    <td>{props.run.distance}</td>
    <td>{props.run.duration}</td>
    <td>{props.run.pace}</td>
    <td>
      <Link to={"/edit/" + props.run._id}>edit</Link> |{" "}
      <a
        href="/#"
        onClick={() => {
          props.deleteRun(props.run._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class DisplayRuns extends Component {
  constructor(props) {
    super(props);

    this.deleteRun = this.deleteRun.bind(this);

    this.state = { runs: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/runs/")
      .then((response) => {
        this.setState({ runs: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteRun(id) {
    axios.delete("http://localhost:5000/runs/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      runs: this.state.runs.filter((el) => el._id !== id),
    });
  }

  allRuns() {
    return this.state.runs.map((run) => {
      return <Run run={run} deleteRun={this.deleteRun} key={run._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>All Runs</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Pace</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.allRuns()}</tbody>
        </table>
      </div>
    );
  }
}
