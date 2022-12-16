import React from "react";
import styles from "./Menu.module.css";

import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

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
      <div style={{ display: 'flex', height: '100vh'}}>
         <Sidebar className={styles.menuContainer}>

            <Menu>
               <MenuItem> <div className={styles.icons}><ProjectsIcon /> <div>Projects</div></div></MenuItem>
               <MenuItem> <div className={styles.icons}><PaymentsIcon /> <div>Payments</div></div></MenuItem>
               <MenuItem> <div className={styles.icons}><ChatsIcon /> <div>Chats</div></div></MenuItem>
               <MenuItem> <div className={styles.icons}><LibraryIcon /> <div>Library</div></div></MenuItem>
               <MenuItem> <div className={styles.icons}><NotificationsIcon /> <div>Notifications</div></div></MenuItem>
            </Menu>

            <Button onClick={() => collapseSidebar()} title={<OpenMenuIcon />} type={ButtonTypes.IconButton}/>

         </Sidebar>
      </div>
   );
}

export default UserMenu;