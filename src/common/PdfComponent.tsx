import { baseImgUrl } from "@/routes";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PdfComponent = ({ src }: { src: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (pageNumber < numPages!) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  return (
    <div className="relative border-[2px] border-gray-200 w-fit h-fit border-dashed flex items-center group">
      <Document
        file={`${baseImgUrl}/${src}`}
        onLoadSuccess={onDocumentLoadSuccess}
        className={"w-fit h-fit"}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <button
        className="hidden w-12 h-12 rounded-full bg-gray-100 hover:cursor-pointer shadow-inner text-white py-2 px-4 absolute -left-0 group-hover:flex items-center justify-center"
        onClick={prevPage}
        disabled={pageNumber === 1}
      >
        <GrPrevious size={30} color="black" />
      </button>
      <button
        className="hidden w-12 h-12 rounded-full bg-gray-100 hover:cursor-pointer shadow-inner text-white py-2 px-4 absolute right-0 group-hover:flex items-center justify-center"
        onClick={nextPage}
        disabled={pageNumber === numPages}
      >
        <GrNext size={30} color="black" />
      </button>
      {numPages && (
        <p className="absolute bottom-0 bg-white text-gray-600 p-2">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
};
