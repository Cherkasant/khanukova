import React from "react";
import styles from "./Menu.module.css";

import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { PaymentsIcon } from "../../../Assets/icons/PaymentsIcon";
import { ChatsIcon } from "../../../Assets/icons/ChatsIcon";
import { LibraryIcon } from "../../../Assets/icons/LibraryIcon";
import { NotificationsIcon } from "../../../Assets/icons/NotificationsIcon";
import { OpenMenuIcon } from "../../../Assets/icons/OpenMenuIcon";
import Button, { ButtonTypes } from "../../Button";
import { AddNewProjectIcon } from "../../../Assets/icons/AddNewProjectIcon";
import { FileCreateIcon } from "../../../Assets/icons/FileCreateIcon";
import { TransformIcon } from "../../../Assets/icons/TransformIcon";
import { ProjectsIcon } from "../../../Assets/icons/ProjectsIcon";

const UserMenu = () => {
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100%", width: "244px" }}>
      <Sidebar
        collapsedWidth="80px"
        backgroundColor="white"
        defaultCollapsed={true}
      >
        <div className={styles.menuContainer}>
          <div>
            <Menu
              menuItemStyles={{
                SubMenuExpandIcon: { color: "#4270A7" },
              }}
            >
              <SubMenu
                icon={<ProjectsIcon />}
                label={"Projects"}
                className={styles.submenu}
              >
                <MenuItem icon={<AddNewProjectIcon />}>
                  <div className={styles.submenuIcons}>New project</div>
                </MenuItem>
                <MenuItem icon={<FileCreateIcon />}>
                  <div className={styles.submenuIcons}>New project</div>
                </MenuItem>
                <MenuItem icon={<FileCreateIcon />}>
                  <div className={styles.submenuIcons}>New project</div>
                </MenuItem>
                <MenuItem icon={<FileCreateIcon />}>
                  <div className={styles.submenuIcons}>New project</div>
                </MenuItem>
              </SubMenu>

              <MenuItem icon={<PaymentsIcon />}>
                <div className={styles.icons}>Payments</div>
              </MenuItem>
              <MenuItem icon={<ChatsIcon />}>
                <div className={styles.icons}>Chats</div>
              </MenuItem>
              <MenuItem icon={<LibraryIcon />}>
                <div className={styles.icons}>Library</div>
              </MenuItem>
              <MenuItem icon={<NotificationsIcon />}>
                <div className={styles.icons}>Notifications</div>
              </MenuItem>
            </Menu>
          </div>
          <div className={styles.containerButton}>
            <Button
              onClick={() => collapseSidebar()}
              title={collapsed ? <OpenMenuIcon /> : <TransformIcon />}
              type={ButtonTypes.IconButton}
              className={styles.button}
            />
            <div className={styles.icons}>Close</div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default UserMenu;
