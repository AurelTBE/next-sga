import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PDFview extends Component {
    state = { numPages: null, pageNumber: 1 };
  
    onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
    };
  
    goToPrevPage = () =>
      this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
      this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
  
    render(props) {
      const { pageNumber, numPages } = this.state;
  
      return (
        <div>
          <nav>
            <button onClick={this.goToPrevPage}>Prev</button>
            <button onClick={this.goToNextPage}>Next</button>
          </nav>
  
          <div style={{ width: 800 }}>
            <Document
              file={this.props.pdf}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} width={800} />
            </Document>
          </div>
  
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      );
    }
  }