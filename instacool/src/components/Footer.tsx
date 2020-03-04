import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faRetweet } from '@fortawesome/free-solid-svg-icons'

const styles = {
  footer: {
    display: 'flex',
    backgroundColor: '#eee',
    marginLeft: '-15px',
    marginBottom: '-10px',
    width: 'calc(100% + 30px)'
  },
  button: {
    flex: 1,
    textAlign: 'center',
    padding: '10px 15px',
    cursor: 'pointer'
  }
}

interface IFooterProps {
  like: () => any,
  share: () => any,
}

export default class Footer extends React.Component<IFooterProps> {
  public render() {
    const { like, share } = this.props;

    return (
      <div style={styles.footer}>
        <div onClick={like} style={styles.button as React.CSSProperties}><FontAwesomeIcon icon={faThumbsUp} />Like</div>
        <div onClick={share} style={styles.button as React.CSSProperties}><FontAwesomeIcon icon={faRetweet} /> Compartir</div>
      </div>
    )
  }
}
