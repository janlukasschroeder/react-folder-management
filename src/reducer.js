import { combineReducers } from "redux";

export const registerModal = id => ({
  type: "REGISTER_MODAL",
  id
});

export const showModal = (id, settings) => ({
  type: "SHOW_MODAL",
  id,
  settings
});

export const hideModal = id => ({
  type: "HIDE_MODAL",
  id
});

export const createFolder = folder => ({
  type: "CREATE_FOLDER",
  folder
});

export const selectFolder = folder => ({
  type: "SELECT_FOLDER",
  folder
});

const initialState = {
  modals: [],
  selectedFolderKey: undefined,
  selectedFolder: {},
  folders: [
    {
      name: "Liverpool",
      type: "site",
      icon: "fas fa-hospital",
      children: [
        {
          name: "Staff",
          type: "staffFeature",
          icon: "fas fa-users",
          children: []
        }
      ]
    },
    {
      name: "MUH",
      key: "MUH",
      type: "site",
      icon: "fas fa-hospital",
      children: [
        {
          name: "Staff",
          type: "staffFeature",
          icon: "fas fa-users",
          children: [
            {
              name: "Admin",
              type: "role",
              icon: "fas fa-users",
              children: [
                {
                  name: "Charles Layman",
                  icon: "fas fa-user",
                  children: []
                },
                {
                  name: "Jan Schroeder",
                  icon: "fas fa-user",
                  children: []
                }
              ]
            },
            {
              name: "Anaesthesia",
              type: "roleFolder",
              icon: "fas fa-users",
              children: [
                {
                  name: "Consultant",
                  type: "role",
                  icon: "fas fa-users",
                  children: [
                    {
                      name: "Chris Jones",
                      icon: "fas fa-user",
                      children: []
                    }
                  ]
                },
                {
                  name: "Registrar",
                  type: "role",
                  icon: "fas fa-users",
                  children: [
                    {
                      name: "Terry Li",
                      icon: "fas fa-user",
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_MODAL":
      const newModal = {
        id: action.id,
        visible: false,
        settings: undefined
      };
      // console.log("REGISTER_MODAL", newModal);
      return {
        ...state,
        modals: [...state.modals, newModal]
      };
    case "SHOW_MODAL":
      // console.log(action.settings);
      const newModalsA = state.modals.map(modal => {
        const m = { ...modal };
        if (m.id === action.id) {
          m.visible = true;
          m.settings = action.settings;
        }
        return m;
      });
      return {
        ...state,
        modals: newModalsA
      };
    case "HIDE_MODAL":
      const newModalsB = state.modals.map(modal => {
        if (modal.id === action.id) {
          modal.visible = false;
        }
        return modal;
      });
      return {
        ...state,
        modals: newModalsB
      };
    // case "CREATE_FOLDER":
    //   return { ...state, folders: [...state.folders, action] };
    default:
      return state;
  }
};

const folders = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_FOLDER":
      return {
        ...state,
        selectedFolderKey: action.folder.key,
        selectedFolder: action.folder
      };
    case "CREATE_FOLDER":
      const { name, type, parentKey = "0" } = action.folder;
      let newFolder;
      switch (type) {
        case "site":
          newFolder = {
            name,
            type,
            icon: "fas fa-hospital",
            children: [
              {
                name: "Staff",
                type: "staffFeature",
                icon: "fas fa-users",
                children: []
              }
            ]
          };
          break;
        case "roleFolder":
        case "role":
          newFolder = {
            name,
            type,
            icon: "fas fa-users",
            children: []
          };
          break;
        case "user":
          newFolder = {
            name,
            type: "user",
            icon: "fas fa-user",
            children: []
          };
          break;
        default:
          newFolder = {};
      }

      let path = parentKey.split("-");
      path.shift();
      const newFolders = addFolder(path, [...state.folders], newFolder);

      // return { ...state, folders: [...state.folders, newFolder] };
      return { ...state, folders: newFolders };

    default:
      return state;
  }
};

const addFolder = (path, tree, newNode) => {
  const newPath = [...path];
  const newTree = [...tree];

  if (newPath.length === 0) {
    newTree.push(newNode);
    return newTree;
  }

  const parent = newPath.shift();

  const editedTree = addFolder(newPath, newTree[parent].children, newNode);
  newTree[parent].children = editedTree;
  return newTree;
};

export default combineReducers({
  modals,
  folders
});
