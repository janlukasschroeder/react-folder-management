import React from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Input, Radio } from "antd";
import { showModal, hideModal, createFolder } from "../../reducer";
import ModalRedux from "../ModalRedux";

class CreateEditSite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalId: "createSite",
      // mode: "create",
      folderName: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { settings, selectedFolder } = this.props;
    if (selectedFolder.name !== prevProps.selectedFolder.name) {
      const name =
        settings && settings.mode === "edit" ? selectedFolder.name : "";
      this.setState({ folderName: name });
    }
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
      type: "site",
      name: this.state.folderName
      // parentKey: this.props.selectedFolderKey
    });
    this.props.hideModal(this.state.modalId);
  }

  onCancel() {
    this.props.hideModal(this.state.modalId);
  }

  render() {
    const { settings } = this.props;
    const editMode = settings && settings.mode === "edit";
    const title = editMode ? "Edit" : "Create";

    return (
      <ModalRedux
        modalId={this.state.modalId}
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
            {editMode && "Update"}
            {!editMode && "Create"}
          </Button>
        ]}
      >
        Name:{}
        <Input
          name={"folderName"}
          onChange={this.handleInputChange}
          value={this.state.folderName}
        />
        Settings: holidays, timezone, address, default language <br />
        Activated features: leave, notifications, sms, documents
      </ModalRedux>
    );
  }
}

const getSettings = modals => {
  const m = modals.find(modal => modal.id === "createSite");
  return m !== undefined ? m.settings : undefined;
};

const mapStateToProps = state => ({
  selectedFolderKey: state.folders.selectedFolderKey,
  selectedFolder: state.folders.selectedFolder,
  settings: getSettings(state.modals.modals)
});

const mapDispatchToProps = dispatch => ({
  // showModal: id => dispatch(showModal(id)),
  hideModal: id => dispatch(hideModal(id)),
  createFolder: (type, folder) => dispatch(createFolder(type, folder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditSite);
