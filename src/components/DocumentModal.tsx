import React, { useRef, useEffect, useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FileType } from "../types/main.types";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

interface DocumentModalProps {
  open: boolean;
  onClose: () => void;
  document: FileType;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  open,
  onClose,
  document,
}) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
        console.log("Document in modal:", document);
  }, [document]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            animation: "fadeIn 0.3s ease-in-out",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            zIndex: 1,
            animation: "slideInFromTop 0.4s ease-out",
            "@keyframes slideInFromTop": {
              from: {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <IoClose size={32} />
        </IconButton>

        {/* pdf viewer */}
        {document && (
          <Box component={"div"}>
            <Document
              file={document.streamUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default DocumentModal;
