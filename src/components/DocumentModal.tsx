import React, { useRef, useEffect, useState } from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
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
    // Reset to page 1 when a new document is opened
    if (document) {
      setPageNumber(1);
    }
  }, [document]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleClose = () => {
    onClose();
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
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
          <Box 
            component={"div"}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '96vh',
              overflow: 'auto',
            }}
          >
            <Document
              file={document.streamUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Box>
        )}
        
        {/* Pagination Controls - Fixed at bottom */}
        {document && numPages && numPages > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '10px 20px',
              borderRadius: '8px',
              zIndex: 2,
              animation: "slideInFromBottom 0.4s ease-out",
              "@keyframes slideInFromBottom": {
                from: {
                  opacity: 0,
                  transform: "translateX(-50%) translateY(20px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateX(-50%) translateY(0)",
                },
              },
            }}
          >
            <IconButton
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              sx={{
                color: 'white',
                '&:disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <MdNavigateBefore size={28} />
            </IconButton>
            
            <Box
              sx={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 500,
                minWidth: '120px',
                textAlign: 'center',
              }}
            >
              Page {pageNumber} of {numPages}
            </Box>
            
            <IconButton
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1)}
              sx={{
                color: 'white',
                '&:disabled': {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <MdNavigateNext size={28} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default DocumentModal;
