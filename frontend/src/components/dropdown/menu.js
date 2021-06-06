import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const logOut =()=>{
    window.localStorage.removeItem('state')
    window.location.reload(false);
  }

  return (
    <div className="User-line ml-3">
    <Dropdown  isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="bg-info" >
        Menu
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Amine Ouallam</DropdownItem>
        <DropdownItem>Nouveau post</DropdownItem>
        <DropdownItem>Paramètres</DropdownItem>
        <DropdownItem className="text-danger" onClick={logOut} >Déconnexion</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </div>
  );
}

export default Example;