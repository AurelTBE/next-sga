import React, {useState} from 'react';
import { PDFDownloadLink, Document, Page, pdfjs } from "react-pdf";

// Style
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import withWidth from '@material-ui/core/withWidth';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFdoc(props) {
    const [numPages, setNumPages] = useState('');
    const [pages, setPages] = useState('');
    
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages({ numPages });
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
        {Array.from(Array(numPages).keys()).map((page, index) => (
          <Page
          key={`page_${page + 1}`}
          pageNumber={page + 1}
          width={containerWidth(props.width)}
          />
        ))          
        }
        {console.log(pages)}
      </Document>
    );
  }

  const DLPdf = props => (
    <div>
      <PDFDownloadLink document={<PDFdoc pdf={props.pdf} />} fileName="resultats.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Chargement du document...' : 'Télécharger')}
      </PDFDownloadLink>
    </div>
  )

  
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

export default withWidth()(PDFview)