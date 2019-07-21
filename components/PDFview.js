import React, { Component } from "react";
import { PDFDownloadLink, Document, Page, pdfjs } from "react-pdf";

// Style
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFdoc extends Component {
    state = {
        numPages: null,
      }
    
    onDocumentLoadSuccess = (document) => {
        const { numPages } = document;
        this.setState({
          numPages,
        });
    };
  
    render(props) {
        const { numPages } = this.state;

        return (                    
        <Document
            file={this.props.pdf}
            onLoadSuccess={this.onDocumentLoadSuccess}
        >
            {Array.from(
                new Array(numPages),
                (el, index) => (
                    <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={800}
                    />
                ),
            )}
        </Document>
      );
    }
  }

  const DLPdf = props => (
    <div>
      <PDFDownloadLink document={<PDFdoc pdf={props.pdf} />} fileName="resultats.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Chargement du document...' : 'Télécharger')}
      </PDFDownloadLink>
    </div>
  )

  
export default function PDFview(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={1} direction="column" alignItems="center">
                    <PDFdoc pdf={props.pdf}/>
                </Grid>
            </Grid>
        </Grid>
      )
}