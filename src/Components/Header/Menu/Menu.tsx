import React from "react";
import styles from "./Menu.module.css";

import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';

import { ProjectsIcon } from "../../../Assets/icons/ProjectsIcon";
import { PaymentsIcon } from "../../../Assets/icons/PaymentsIcon";
import { ChatsIcon } from "../../../Assets/icons/ChatsIcon";
import { LibraryIcon } from "../../../Assets/icons/LibraryIcon";
import { NotificationsIcon } from "../../../Assets/icons/NotificationsIcon";
import { OpenMenuIcon } from "../../../Assets/icons/OpenMenuIcon";
import Button, {ButtonTypes} from "../../Button";

const UserMenu = () => {
   const { collapseSidebar } = useProSidebar();

   return (
      <div style={{ display: 'flex', height: '100%', width:"244px"}}>
         <Sidebar collapsedWidth="80px"  backgroundColor="white">
         <div className={styles.menuContainer}>
            <div>
               <Menu>
               <MenuItem icon={<ProjectsIcon />}><div className={styles.icons}> Projects</div></MenuItem>
               <MenuItem icon={<PaymentsIcon />}><div className={styles.icons}>Payments</div></MenuItem>
               <MenuItem icon={<ChatsIcon />}><div className={styles.icons}>Chats</div></MenuItem>
               <MenuItem icon={<LibraryIcon />}><div className={styles.icons}>Library</div></MenuItem>
               <MenuItem icon={<NotificationsIcon />}><div className={styles.icons}>Notifications</div></MenuItem>
            </Menu>
            </div>

            <div className={styles.containerButton}>
            <Button onClick={() => collapseSidebar()} title={<OpenMenuIcon />} type={ButtonTypes.IconButton} className={styles.button}/>
            </div>
            </div>

         </Sidebar>
      </div>
   );
}

export default UserMenu;