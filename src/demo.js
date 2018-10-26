import React from "react";
import { connect } from "react-redux";
import { Layout, Button, Row, Col, Input, Radio } from "antd";
import { showModal, hideModal, createFolder } from "./reducer";
import ModalRedux from "./containers/ModalRedux";
import FolderTree from "./containers/folders/FolderTree";
import CreateEditFolder from "./containers/folders/CreateEditStaffFolder";
import CreateEditUser from "./containers/folders/CreateEditUser";
import CreateEditSite from "./containers/folders/CreateEditSite";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.setEditMode = this.setEditMode.bind(this);
  }

  setEditMode() {
    switch (this.props.selectedFolder.type) {
      case "site":
        this.props.showModal("createSite", { mode: "edit" });
        break;
      case "roleFolder":
        this.props.showModal("createStaffGroup", { mode: "edit" });
        break;
      case "role":
        this.props.showModal("createStaffGroup", { mode: "edit" });
        break;
      default:
        return;
    }
  }

  render() {
    const { selectedFolder, showModal } = this.props;

    return (
      <Layout style={{ height: "100%", background: "#fff" }}>
        <Row>
          <Col>
            <CreateEditSite />
            <CreateEditFolder />
            <CreateEditUser />
            <Button onClick={() => showModal("createSite")}>Create Site</Button>
            &nbsp;
            <Button
              disabled={
                selectedFolder.type !== "staffFeature" &&
                selectedFolder.type !== "roleFolder"
              }
              onClick={() => showModal("createStaffGroup")}
            >
              Create Staff Folder
            </Button>
            &nbsp;
            <Button
              disabled={selectedFolder.type !== "role"}
              onClick={() => showModal("addUser")}
            >
              Add User
            </Button>
            &nbsp;
            <Button
              disabled={
                selectedFolder.type === undefined ||
                selectedFolder.type === "staffFeature"
              }
              onClick={this.setEditMode}
            >
              Edit
            </Button>
            <FolderTree />
          </Col>
          <Col span={6} />
        </Row>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  selectedFolderKey: state.folders.selectedFolderKey,
  selectedFolder: state.folders.selectedFolder
});

const mapDispatchToProps = dispatch => ({
  showModal: (id, settings) => dispatch(showModal(id, settings)),
  hideModal: id => dispatch(hideModal(id)),
  createFolder: (type, folder) => dispatch(createFolder(type, folder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);
