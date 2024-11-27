import { useState } from 'react';
import { Document, Page } from 'react-pdf';

const ReactPdf = () => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const goToPrevPage = () => setPageNumber((prevPage) => prevPage - 1);
	const goToNextPage = () => setPageNumber((prevPage) => prevPage + 1);

	return (
		<div>
			<nav>
				<button onClick={goToPrevPage}>Prev</button>
				<button onClick={goToNextPage}>Next</button>
			</nav>

			<div style={{ width: 600 }}>
				<Document
					file="https://codemonkpptgen.blob.core.windows.net/cmpptgencontainerv1/Slide_text_395_1732708731767.pdf"
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page pageNumber={pageNumber} width={600} />
				</Document>
			</div>

			<p>
				Page {pageNumber} of {numPages}
			</p>
		</div>
	);
};

export default ReactPdf;