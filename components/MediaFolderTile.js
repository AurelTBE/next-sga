import React from 'react'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

export default function MediaFolderTile(props) {
    return (
        <GridListTile>
              <img src={props.mediafolder.couverture} alt={props.mediafolder.title} />
              <GridListTileBar title={props.mediafolder.title} />
        </GridListTile>
    )
}
