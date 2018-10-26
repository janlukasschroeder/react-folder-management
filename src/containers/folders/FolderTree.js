import React from "react";
import { Tree, Icon } from "antd";
import { connect } from "react-redux";

import { selectFolder } from "../../reducer";

const TreeNode = Tree.TreeNode;

const LeafIcon = (text, type) => {
  return (
    <div>
      <i className={type} /> {text}
    </div>
  );
};

const constructNodes = nodes => {
  if (nodes.length > 0) {
    return nodes.map((node, i) => (
      <TreeNode
        key={""}
        title={LeafIcon(node.name, node.icon)}
        folderType={node.type}
        folderName={node.name}
      >
        {constructNodes(node.children)}
      </TreeNode>
    ));
  }
};

class FolderTree extends React.Component {
  onSelect = (selectedKeys, info) => {
    // console.log("selected", selectedKeys, info);
    // this.props.selectFolder(selectedKeys[0]);
    this.props.selectFolder({
      key: selectedKeys[0],
      type: info.node.props.folderType,
      name: info.node.props.folderName
    });
  };

  render() {
    const { folders } = this.props;

    return (
      <Tree
        showLine
        // defaultExpandedKeys={["0-0-0"]}
        defaultExpandAll
        // showIcon={false}
        onSelect={this.onSelect}
        // onMouseEnter={() => console.log("Test")}
      >
        {folders && constructNodes(folders)}
      </Tree>
    );
  }
}

const mapStateToProps = state => ({
  folders: state.folders.folders
});

const mapDispatchToProps = dispatch => ({
  selectFolder: key => dispatch(selectFolder(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderTree);

// export default NavBar;
