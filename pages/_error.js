import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon } from '@fortawesome/free-solid-svg-icons';

function Error({ statusCode }) {
  return (
    <>
        <FontAwesomeIcon icon={faDragon} className={classes.icons} />
        <p>Oops
            {statusCode
                ? ` une erreur ${statusCode} est survenue sur le serveur`
                : ' une erreur est survenue dans votre navigateur'}
        </p>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error