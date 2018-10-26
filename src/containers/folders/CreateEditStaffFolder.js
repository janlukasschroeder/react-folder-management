import React from "react";
import { connect } from "react-redux";
import { Layout, Button, Row, Col, Input, Radio } from "antd";
import { showModal, hideModal, createFolder } from "../../reducer";
import ModalRedux from "../ModalRedux";

const RadioGroup = Radio.Group;

const modalId = "createStaffGroup";

class CreateEditFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { folderName: "", folderType: "role" };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedFolder.name !== prevProps.selectedFolder.name) {
      const name =
        this.props.settings && this.props.settings.mode === "edit"
          ? this.props.selectedFolder.name
          : "";
      this.setState({ folderName: name });
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newFolderName: e.target.value });
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
      name: this.state.folderName,
      parentKey: this.props.selectedFolderKey
    });
    this.props.hideModal(modalId);
  }

  onCancel() {
    this.props.hideModal(modalId);
  }

  render() {
    const { settings } = this.props;
    const title = settings && settings.mode === "edit" ? "Edit" : "Create";
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    return (
      <ModalRedux
        modalId={modalId}
        title={title}
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
          <Col span={"6"}>Folder name:</Col>
          <Col>
            <Input
              name={"folderName"}
              style={{ width: "50%" }}
              value={this.state.folderName}
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>

        <Row>
          <Col span={"6"}>What will the folder contain?</Col>
          <Col>
            <RadioGroup
              name={"folderType"}
              onChange={this.handleInputChange}
              value={this.state.folderType}
            >
              <Radio style={radioStyle} value={"role"}>
                Users
              </Radio>
              <Radio style={radioStyle} value={"roleFolder"}>
                Other Folders
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
      </ModalRedux>
    );
  }
}

const getSettings = modals => {
  const m = modals.find(modal => modal.id === modalId);
  return m !== undefined ? m.settings : undefined;
};

const mapStateToProps = state => ({
  selectedFolderKey: state.folders.selectedFolderKey,
  selectedFolder: state.folders.selectedFolder,
  settings: getSettings(state.modals.modals)
});

const mapDispatchToProps = dispatch => ({
  showModal: id => dispatch(showModal(id)),
  hideModal: id => dispatch(hideModal(id)),
  createFolder: (type, folder) => dispatch(createFolder(type, folder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditFolder);
