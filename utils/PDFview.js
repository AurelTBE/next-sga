import React, {useState} from 'react';
import { PDFDownloadLink, Document, Page } from "react-pdf";

// Style
import Grid from '@material-ui/core/Grid';

// Media Query
import withWidth from '@material-ui/core/withWidth';

function PDFdoc(props) {
    const [pages, setPages] = useState('');
    
    const onDocumentLoadSuccess = ({ numPages }) => {
        setPages(Array.from(Array(numPages).keys()))
    };

    function containerWidth(width) {
      switch(width) {
        case 'xl':
          return 1400;
        case 'lg':
          return 1000;
        case 'md':
          return 800;
        case 'sm':
          return 500;
        case 'xs':
          return 300;
        default:
          return 600;
      }
    }

    return (                   
      <Document
          file={props.pdf}
          onLoadSuccess={onDocumentLoadSuccess}
      >
        {Object.keys(pages).map(page => (
          <Page
          key={`page_${pages[page] + 1}`}
          pageNumber={pages[page] + 1}
          width={containerWidth(props.width)}
          />
        ))          
        }
      </Document>
    );
  }

  function PDFirstpage(props) {

    function containerWidth(width) {
      switch(width) {
        case 'xl':
          return 1400;
        case 'lg':
          return 1000;
        case 'md':
          return 800;
        case 'sm':
          return 500;
        case 'xs':
          return 300;
        default:
          return 600;
      }
    }

    return (                   
      <Document
          file={props.pdf}
      >
        <Page
        pageNumber={1}
        width={containerWidth(props.width)}
        />
      </Document>
    );
  }
  
function PDFview(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={1} direction="column" alignItems="center">
                    <PDFdoc pdf={props.pdf} width={props.width} />
                </Grid>
            </Grid>
        </Grid>
      )
}

export const DLPdf = props => (
  <div>
    <PDFDownloadLink document={<PDFdoc pdf={props.pdf} />} fileName="resultats.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Chargement du document...' : 'Télécharger')}
    </PDFDownloadLink>
  </div>
)

export function PDFviewFP(props) {
  return (
      <Grid container spacing={3}>
          <Grid item xs={12}>
              <Grid container spacing={1} direction="column" alignItems="center">
                  <PDFirstpage pdf={props.pdf} width={props.width} />
              </Grid>
          </Grid>
      </Grid>
    )
}

export default withWidth()(PDFview)