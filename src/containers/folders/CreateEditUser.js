import React from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Input, Radio } from "antd";
import { showModal, hideModal, createFolder } from "../../reducer";
import ModalRedux from "../ModalRedux";

const RadioGroup = Radio.Group;

class CreateEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalId: "addUser", newFolderName: "", folderType: "user" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit() {
    this.props.createFolder({
      type: this.state.folderType,
      name: this.state.newFolderName,
      parentKey: this.props.selectedFolderKey
    });
    this.props.hideModal(this.state.modalId);
  }

  onCancel() {
    this.props.hideModal(this.state.modalId);
  }

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    return (
      <ModalRedux
        modalId={this.state.modalId}
        title={"Add User"}
        footer={[
          <Button key="back" onClick={this.onCancel.bind(this)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={this.onSubmit.bind(this)}
          >
            Create
          </Button>
        ]}
      >
        <Row>
          <Col span={"6"}>Name:</Col>
          <Col>
            <Input
              name={"newFolderName"}
              style={{ width: "50%" }}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </ModalRedux>
    );
  }
}

const mapStateToProps = state => ({
  selectedFolderKey: state.folders.selectedFolderKey,
  selectedFolder: state.folders.selectedFolder
});

const mapDispatchToProps = dispatch => ({
  showModal: id => dispatch(showModal(id)),
  hideModal: id => dispatch(hideModal(id)),
  createFolder: (type, folder) => dispatch(createFolder(type, folder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditUser);
