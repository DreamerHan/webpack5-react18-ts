import React, { useState, useRef } from "react";
import './index.less'

import PDF_FILE from '@src/assets/中国电力行业年度发展报告2021 副本（已优化）.pdf';

import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = 'https://s0.ssl.qhres2.com/static/45b44cbb1e53b112.js'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'


export const ReactPdf = () => {
    const [pdfPages, setPdfPages] = useState(0);
    const count = useRef(0)

    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log(`PDF文档共：${numPages} 页`)
        setPdfPages(numPages);
        console.time('PDF加载时间：')
    }

    const handleOnRenderSuccess = () => {
        count.current++;

        if( count.current === 40 ) {
            console.timeEnd('PDF加载时间：')
        }
    }

    return <div className="react-pdf__page">
        <div className="react-pdf__page-outline">
            <Document file={PDF_FILE} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: pdfPages }, (i) => i).map((page, index) => (
                    <Page key={index} pageIndex={index} width={150} renderTextLayer={false} />
                ))}
            </Document>
        </div>
        <div className="react-pdf__page-main">
            <Document file={PDF_FILE} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: pdfPages }, (i) => i).map((page, index) => (
                    <Page key={index} pageIndex={index} onRenderSuccess={handleOnRenderSuccess} renderTextLayer={false} />
                ))}
            </Document>
        </div>
    </div>
}