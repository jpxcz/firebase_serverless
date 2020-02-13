import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons'

const styles = {
  navBar: {
    borderBottom: '1px solid #aaa',
    padding: '10px 15px',

  },
  link: {
    color: '#555',
    textDecoration: 'none'
  }

}

export default class NavBar extends React.Component {
  public render() {
    return (
      <div style={styles.navBar}>
        <Link to="/app/newsfeed" style={styles.link}><FontAwesomeIcon icon={faNewspaper} />Instacool</Link>
        <div style={{ float: 'right' }}>
          <Link to="/app/profile" style={styles.link}><FontAwesomeIcon icon={faUser} />Perfil</Link>
        </div>
      </div>
    )
  }
}