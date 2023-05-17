import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import ReactDOMServer from 'react-dom/server';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import './EditorHtml.css';
import B from '../../../../Assets/Editor/B';
import I from '../../../../Assets/Editor/I';
import U from '../../../../Assets/Editor/U';
import Link from '../../../../Assets/Editor/Link';
import ImageAdd from '../../../../Assets/Editor/ImageAdd';
import S from '../../../../Assets/Editor/S';
import fileUpImg from '../../../../Assets/Editor/FileUp.svg';

const icons = ReactQuill.Quill.import('ui/icons');
icons['bold'] = ReactDOMServer.renderToString(<B />);
icons['italic'] = ReactDOMServer.renderToString(<I />);
icons['underline'] = ReactDOMServer.renderToString(<U />);
icons['strike'] = ReactDOMServer.renderToString(<S />);
icons['link'] = ReactDOMServer.renderToString(<Link />);
icons['image'] = ReactDOMServer.renderToString(<ImageAdd />);

type EditorHtmlType = {
  valueEditor: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

export const EditorHtml: React.FC<EditorHtmlType> = ({ valueEditor, onChange }) => {
  const refText = useRef(null);
  const handleSubmitOnClick = async () => {
    //   const capture = document.querySelector('.modal');
    //   html2canvas(capture).then((canvas) => {
    //     const imgData = canvas.toDataURL('img/png');
    //     const doc = new jsPDF('p', 'mm', 'a4');
    //     const componentWidth = doc.internal.pageSize.getWidth();
    //     const componentHeight = doc.internal.pageSize.getHeight();
    //     doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    //     doc.save('receipt.pdf');
    //   });
  };
  //Подумать над реализацией

  return (
    <>
      <ReactQuill
        placeholder={'Write'}
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'video',
          'align'
        ]}
        modules={{
          toolbar: [['italic', 'bold', 'underline', 'strike'], [{ header: [] }], [{ align: [] }], ['link', 'image']]
        }}
        theme="snow"
        value={valueEditor}
        onChange={onChange}
      />
      <button onClick={handleSubmitOnClick} className="fileUp">
        <img src={fileUpImg} alt="icon" />
        Export PDF
      </button>
    </>
  );
};

export default EditorHtml;
