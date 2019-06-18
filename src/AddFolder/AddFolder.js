import React from "react";
import "./AddFolder.css";
import NoteContext from "../NoteContext";
import ValidationError from "../ValidationError";

class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.numberInput = React.createRef();
    this.state = {
      formValid: false,
      nameValid: false,
      submitError: false,
      validationMessages: {
        name: "",
        id: ""
      }
    };
  }

  static contextType = NoteContext;

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }

  updateName(name) {
    this.setState({ name }, () => {
      this.validateName(name);
    });
  }

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "Name is required";
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = "Name must be at least 3 characters long";
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    );
  }

  postFolder(folder, callback) {
    const foldersENDPOINT = "http://localhost:9090/folders";
    //FOLDERS API FETCH
    fetch(foldersENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        this.props.history.push("/");
        callback(folder);
      })
      .catch(error => console.log(error));
  }

  handleSubmit(e) {
    const randomId = function() {
      return (
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9)
      );
    };

    e.preventDefault();
    const folder = {
      name: this.nameInput.current.value,
      id: randomId()
    };

    if (
      (!folder.name && !folder.id) ||
      (folder.name.length < 3 || folder.id.length < 3)
    ) {
      this.setState({
        submitError: true
      });
    } else {
      this.postFolder(folder, this.context.handleAddFolder);
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <h2>Add a Folder</h2>
        <label htmlFor="folder-name">enter folder name</label>
        <input
          name="folder-name"
          type="text"
          ref={this.nameInput}
          onChange={e => this.updateName(e.target.value)}
        />
        <ValidationError
          hasError={!this.state.nameValid}
          message={this.state.validationMessages.name}
        />

        <button disabled={!this.state.formValid} type="submit">
          Submit
        </button>
        {this.state.submitError ? (
          <p id="error-render" className="error">
            Please enter Folder Name and ID correctly.
          </p>
        ) : null}
      </form>
    );
  }
}

export default AddFolder;
