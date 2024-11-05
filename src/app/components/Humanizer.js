"use client";
import React, { useState,useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../components/dashboard.module.css';
import formatContent from '@/utils/FormatContent';

const Humanizer = () => {

  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [humanWordCount, sethumanWordCount] = useState(0);
  const [humanCharCount, sethumanCharCount] = useState(0);
  const [fineData, setFineData] = useState('')
  const [copySuccess, setCopySuccess] = useState('');
  const [showHumanizerSection, setShowHumanizerSection] = useState(false);
  const [showHumanizerContent, setShowHumanizerContent] = useState('');
  

  // Handle text input
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    setCharCount(inputText.length);
    setWordCount(inputText.trim().split(/\s+/).length);
  };

  const humanContent = (e)=>{
     handlehumanTextChange();
     setShowHumanizerContent(fineData)

  }
  useEffect(()=>{
    handlehumanTextChange()
  },[fineData])




  const handlehumanTextChange = (e) => {
    sethumanCharCount(fineData.length);
    sethumanWordCount(fineData.trim().split(/\s+/).length);
    console.log("humanized content",showHumanizerContent)
  };

  // Handle "Paste Text" button click
  const handlePasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setCharCount(clipboardText.length);
      setWordCount(clipboardText.trim().split(/\s+/).length);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileText = event.target.result;
      setText(fileText);
      setCharCount(fileText.length);
      setWordCount(fileText.trim().split(/\s+/).length);
    };

    if (file) {
      if (file.type === 'text/plain' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        reader.readAsText(file);
      } else {
        alert('Please upload a valid .txt or .docx file');
      }
    }
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
   
    console.log("i got this in response", { text })
    try {
      const response = await fetch('http://54.91.35.194/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: text, word_count: 200 }), // Send text and wordCount to API


      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      const finalData = formatContent(result);
      setFineData(result.content)
      console.log('Data submitted successfully:', result);
      console.log('final data:', finalData);
      // You can handle any response or success notification here
    } catch (error) {
      console.error('Error submitting data:', error);
      // You can handle any error notification here
    }
  };




  // Copy text to clipboard
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(showHumanizerContent);
      setCopySuccess('Text copied to clipboard!');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setCopySuccess('');
      }, 3000);

    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopySuccess('Failed to copy text');

      // Hide error message after 3 seconds
      setTimeout(() => {
        setCopySuccess('');
      }, 3000);
    }
  };

  


  // Toggle Humanizer Section
  const toggleHumanizerSection = () => {
    setShowHumanizerSection(true);
  };

  // Reset everything when clicking Delete
  const handleDelete = () => {
    setText('');
    setCharCount(0);
    setWordCount(0);
    setShowHumanizerSection(false);
    setCopySuccess('');
  };


  useEffect(() => {
    if (fineData ) {
      setShowHumanizerContent(fineData);
      console.log("this human content 1", fineData)
      console.log("this human content 2", showHumanizerContent)
    }
  }, [fineData,humanWordCount,humanCharCount]); // Only depend on fineData



  return (
    <div className='turnitDashOvervBg'>
      <div className={styles.turnitDashOvervCont}>
        <div className={styles.turnitDashOvervContLink}>
          <Link href="#">
            Home <svg xmlns="http://www.w3.org/2000/svg" width="5" height="7" viewBox="0 0 5 7" fill="none">
              <path d="M1 0.5L4 3.5L1 6.5" stroke="#3B3DEB" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="#" className={styles.turnitDashOvervContLinkActive}>
            Humanizer
          </Link>
        </div>

        <div className={styles.starttextAreaContainer}>
          <div className={styles.textAreaContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.textAreaContainerBorderLine}>
                <div className='row'>
                  <div className={showHumanizerSection ? 'col-lg-6' : 'col-lg-12'}>
                    <textarea
                      placeholder="Enter your text here..."
                      value={text}
                      onChange={handleTextChange}
                    />

                    <div className={styles.actionButtonsWrapAllBg}>
                      <div className={styles.actionButtonsWrap}>
                        <div className={styles.actionButtons}>
                          <div className={styles.buttonsGroup}>
                            {!showHumanizerSection && (
                              <>
                                <button className={styles.actionButton} onClick={handlePasteText}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_346_14891)">
                                      <path d="M2.25 17.8049V2.96244C2.25 2.7854 2.32033 2.61562 2.44551 2.49044C2.57069 2.36526 2.74047 2.29494 2.9175 2.29494H13.2825C13.4595 2.29494 13.6293 2.36526 13.7545 2.49044C13.8797 2.61562 13.95 2.7854 13.95 2.96244V3.38244H15.45V2.96244C15.45 2.38758 15.2216 1.83627 14.8152 1.42978C14.4087 1.0233 13.8574 0.794935 13.2825 0.794935H2.925C2.63973 0.793948 2.35707 0.849283 2.09323 0.957768C1.82939 1.06625 1.58956 1.22575 1.3875 1.42712C1.18543 1.62849 1.0251 1.86777 0.915706 2.13123C0.80631 2.3947 0.749998 2.67716 0.75 2.96244V17.8049C0.749998 18.0902 0.80631 18.3727 0.915706 18.6361C1.0251 18.8996 1.18543 19.1389 1.3875 19.3402C1.58956 19.5416 1.82939 19.7011 2.09323 19.8096C2.35707 19.9181 2.63973 19.9734 2.925 19.9724H7.875V18.4724H2.925C2.83671 18.4734 2.74911 18.4569 2.66725 18.4238C2.5854 18.3907 2.51093 18.3417 2.44815 18.2796C2.38537 18.2175 2.33553 18.1436 2.30152 18.0621C2.26751 17.9806 2.24999 17.8932 2.25 17.8049Z" fill="black" />
                                      <path d="M23.0552 10.2376L18.0527 4.0801C17.9471 3.91317 17.7801 3.79459 17.5877 3.7501C17.5255 3.74118 17.4623 3.74118 17.4002 3.7501H10.3952C10.1065 3.75691 9.82211 3.82052 9.5581 3.9373C9.29409 4.05408 9.05567 4.22173 8.85648 4.43068C8.65728 4.63963 8.5012 4.88578 8.39717 5.15506C8.29313 5.42435 8.24318 5.7115 8.25015 6.0001V21.0001C8.24318 21.2887 8.29313 21.5758 8.39717 21.8451C8.5012 22.1144 8.65728 22.3606 8.85648 22.5695C9.05567 22.7785 9.29409 22.9461 9.5581 23.0629C9.82211 23.1797 10.1065 23.2433 10.3952 23.2501H21.1052C21.3938 23.2433 21.6782 23.1797 21.9422 23.0629C22.2062 22.9461 22.4446 22.7785 22.6438 22.5695C22.843 22.3606 22.9991 22.1144 23.1031 21.8451C23.2072 21.5758 23.2571 21.2887 23.2502 21.0001V10.7476C23.2515 10.5591 23.1819 10.3771 23.0552 10.2376ZM18.1877 6.6226L20.9252 9.9976H18.8327C18.6482 9.98227 18.4772 9.89503 18.3565 9.75471C18.2359 9.61439 18.1752 9.43225 18.1877 9.2476V6.6226ZM21.7502 21.0001C21.7626 21.1848 21.7019 21.3669 21.5813 21.5072C21.4606 21.6475 21.2896 21.7348 21.1052 21.7501H10.3952C10.2107 21.7348 10.0397 21.6475 9.91904 21.5072C9.79836 21.3669 9.7377 21.1848 9.75015 21.0001V6.0001C9.7377 5.81545 9.79836 5.63331 9.91904 5.49299C10.0397 5.35267 10.2107 5.26543 10.3952 5.2501H16.6877V9.2401C16.6807 9.5287 16.7306 9.81585 16.8347 10.0851C16.9387 10.3544 17.0948 10.6006 17.294 10.8095C17.4932 11.0185 17.7316 11.1861 17.9956 11.3029C18.2596 11.4197 18.544 11.4833 18.8327 11.4901H21.7502V21.0001Z" fill="black" />
                                      <path d="M11.3101 13.5C11.3101 13.6989 11.3891 13.8897 11.5297 14.0303C11.6704 14.171 11.8611 14.25 12.0601 14.25H19.4326C19.6315 14.25 19.8222 14.171 19.9629 14.0303C20.1035 13.8897 20.1826 13.6989 20.1826 13.5C20.1826 13.3011 20.1035 13.1103 19.9629 12.9697C19.8222 12.829 19.6315 12.75 19.4326 12.75H12.0601C11.8611 12.75 11.6704 12.829 11.5297 12.9697C11.3891 13.1103 11.3101 13.3011 11.3101 13.5Z" fill="black" />
                                      <path d="M19.4401 16.0649H12.0601C11.8611 16.0649 11.6704 16.144 11.5297 16.2846C11.3891 16.4253 11.3101 16.616 11.3101 16.8149C11.3101 17.0139 11.3891 17.2046 11.5297 17.3453C11.6704 17.4859 11.8611 17.5649 12.0601 17.5649H19.4326C19.6315 17.5649 19.8222 17.4859 19.9629 17.3453C20.1035 17.2046 20.1826 17.0139 20.1826 16.8149C20.1826 16.616 20.1035 16.4253 19.9629 16.2846C19.8222 16.144 19.6315 16.0649 19.4326 16.0649H19.4401Z" fill="black" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_346_14891">
                                        <rect width="24" height="24" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  Paste text
                                </button>
                                <button className={styles.actionButton}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_346_14899)">
                                      <path d="M15.4651 0.137879C15.355 0.0219728 15.2041 -0.0476074 15.0478 -0.0476074H5.68537C3.95777 -0.0476074 2.53174 1.37274 2.53174 3.10016V20.8045C2.53174 22.5321 3.95777 23.9524 5.68537 23.9524H18.3925C20.1202 23.9524 21.5462 22.5321 21.5462 20.8045V6.74653C21.5462 6.59584 21.4766 6.451 21.3781 6.34077L15.4651 0.137879ZM15.6331 1.99878L19.5926 6.15529H17.0187C16.2535 6.15529 15.6331 5.54078 15.6331 4.77558V1.99878ZM18.3925 22.793H5.68537C4.60138 22.793 3.69116 21.8945 3.69116 20.8045V3.10016C3.69116 2.01618 4.59552 1.11182 5.68537 1.11182H14.4737V4.77558C14.4737 6.18422 15.6101 7.31471 17.0187 7.31471H20.3868V20.8045C20.3868 21.8945 19.4824 22.793 18.3925 22.793Z" fill="black" />
                                      <path d="M16.8102 18.7932H7.26819C6.9494 18.7932 6.68848 19.054 6.68848 19.3729C6.68848 19.6917 6.9494 19.9526 7.26819 19.9526H16.8161C17.1348 19.9526 17.3958 19.6917 17.3958 19.3729C17.3958 19.054 17.1348 18.7932 16.8102 18.7932Z" fill="black" />
                                      <path d="M9.07098 12.5551L11.4594 9.98688V16.3174C11.4594 16.6362 11.7203 16.8971 12.0391 16.8971C12.3581 16.8971 12.6188 16.6362 12.6188 16.3174V9.98688L15.0073 12.5551C15.1232 12.6767 15.2741 12.7406 15.4304 12.7406C15.5696 12.7406 15.7146 12.6884 15.8247 12.5841C16.0567 12.3638 16.074 11.9985 15.8538 11.7667L12.4566 8.1203C12.3464 8.00439 12.1957 7.93481 12.0334 7.93481C11.871 7.93481 11.7203 8.00439 11.6103 8.1203L8.21313 11.7667C7.99285 11.9985 8.01025 12.3695 8.24206 12.5841C8.48559 12.8043 8.8507 12.7869 9.07098 12.5551Z" fill="black" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_346_14899">
                                        <rect width="24" height="24" fill="white" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  Upload doc
                                  <input
                                    type="file"
                                    accept=".txt,.docx"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                  />
                                </button>
                              </>
                            )}
                            {showHumanizerSection && (
                              <button
                                className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                                onClick={handleDelete}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <g clipPath="url(#clip0_346_13263)">
                                    <path d="M15.3106 8.69507C15.0001 8.69507 14.7485 8.94668 14.7485 9.25713V19.88C14.7485 20.1903 15.0001 20.4421 15.3106 20.4421C15.621 20.4421 15.8727 20.1903 15.8727 19.88V9.25713C15.8727 8.94668 15.621 8.69507 15.3106 8.69507Z" fill="black" />
                                    <path d="M8.67827 8.69507C8.36782 8.69507 8.11621 8.94668 8.11621 9.25713V19.88C8.11621 20.1903 8.36782 20.4421 8.67827 20.4421C8.98872 20.4421 9.24033 20.1903 9.24033 19.88V9.25713C9.24033 8.94668 8.98872 8.69507 8.67827 8.69507Z" fill="black" />
                                    <path d="M3.84439 7.14479V20.9927C3.84439 21.8112 4.14452 22.5799 4.66881 23.1314C5.19069 23.6845 5.91698 23.9984 6.67708 23.9998H17.3114C18.0717 23.9984 18.798 23.6845 19.3197 23.1314C19.844 22.5799 20.1441 21.8112 20.1441 20.9927V7.14479C21.1863 6.86815 21.8617 5.86127 21.7223 4.79182C21.5826 3.72259 20.6717 2.92276 19.5932 2.92254H16.7155V2.21996C16.7188 1.62914 16.4852 1.06181 16.067 0.644441C15.6487 0.227288 15.0805 -0.00500049 14.4897 -0.000170291H9.49879C8.90797 -0.00500049 8.33976 0.227288 7.92151 0.644441C7.50326 1.06181 7.26965 1.62914 7.27295 2.21996V2.92254H4.39525C3.3168 2.92276 2.40587 3.72259 2.26623 4.79182C2.12681 5.86127 2.80216 6.86815 3.84439 7.14479ZM17.3114 22.8756H6.67708C5.71609 22.8756 4.9685 22.0501 4.9685 20.9927V7.19419H19.02V20.9927C19.02 22.0501 18.2724 22.8756 17.3114 22.8756ZM8.39707 2.21996C8.39333 1.9273 8.50838 1.64561 8.71608 1.43901C8.92356 1.23241 9.2059 1.1189 9.49879 1.12395H14.4897C14.7826 1.1189 15.0649 1.23241 15.2724 1.43901C15.4801 1.64539 15.5952 1.9273 15.5914 2.21996V2.92254H8.39707V2.21996ZM4.39525 4.04666H19.5932C20.152 4.04666 20.6049 4.4996 20.6049 5.05836C20.6049 5.61713 20.152 6.07007 19.5932 6.07007H4.39525C3.83648 6.07007 3.38354 5.61713 3.38354 5.05836C3.38354 4.4996 3.83648 4.04666 4.39525 4.04666Z" fill="black" />
                                    <path d="M11.9942 8.69507C11.6837 8.69507 11.4321 8.94668 11.4321 9.25713V19.88C11.4321 20.1903 11.6837 20.4421 11.9942 20.4421C12.3046 20.4421 12.5562 20.1903 12.5562 19.88V9.25713C12.5562 8.94668 12.3046 8.69507 11.9942 8.69507Z" fill="black" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_346_13263">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                        <div className={styles.textInfo}>
                          {charCount} characters | {wordCount} words
                        </div>
                      </div>
                      <div className={styles.detectorSection}>
                        <button className={styles.aiDetector} onClick={toggleHumanizerSection}>
                          Humanizer
                        </button>
                        <span className={styles.creditsRequired}>15 Credits Required</span>
                      </div>
                    </div>
                  </div>

                  {/* Humanizer output section, shown when "Humanizer" button is clicked */}
                  {showHumanizerSection && (
                    <div className={`col-lg-6 ${styles.clickBordButtonsWrapAllBg}`}>
                      <div className="clickactionButtonsWrapAllBg">
                        <textarea
                          placeholder="Enter text first..."
                          value={showHumanizerContent}
                          onChange={humanContent} // Update as you type
                          className="styledTextArea"
                        />

                        <div className={styles.buttonsGroupslash}>

                          <div className={styles.buttonsGroup}>
                            <button className={styles.actionButton}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8.7 7.69941L11 5.39941V14.9994C11 15.5994 11.4 15.9994 12 15.9994C12.6 15.9994 13 15.5994 13 14.9994V5.39941L15.3 7.69941C15.7 8.09941 16.3 8.09941 16.7 7.69941C17.1 7.29941 17.1 6.69941 16.7 6.29941L12.7 2.29941C12.6 2.19941 12.5 2.09941 12.4 2.09941C12.2 1.99941 11.9 1.99941 11.6 2.09941C11.5 2.09941 11.4 2.19941 11.3 2.29941L7.3 6.29941C6.9 6.69941 6.9 7.29941 7.3 7.69941C7.7 8.09941 8.3 8.09941 8.7 7.69941ZM21 13.9994C20.4 13.9994 20 14.3994 20 14.9994V18.9994C20 19.5994 19.6 19.9994 19 19.9994H5C4.4 19.9994 4 19.5994 4 18.9994V14.9994C4 14.3994 3.6 13.9994 3 13.9994C2.4 13.9994 2 14.3994 2 14.9994V18.9994C2 20.6994 3.3 21.9994 5 21.9994H19C20.7 21.9994 22 20.6994 22 18.9994V14.9994C22 14.3994 21.6 13.9994 21 13.9994Z" fill="black" />
                              </svg>
                              Export</button>
                            <button className={styles.actionButton} onClick={handleCopyText}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16.5 23.999H3.5C2.122 23.999 1 22.877 1 21.499V7.49902C1 6.12102 2.122 4.99902 3.5 4.99902H4.5C4.776 4.99902 5 5.22302 5 5.49902C5 5.77502 4.776 5.99902 4.5 5.99902H3.5C2.673 5.99902 2 6.67202 2 7.49902V21.499C2 22.326 2.673 22.999 3.5 22.999H16.5C17.327 22.999 18 22.326 18 21.499V20.499C18 20.223 18.224 19.999 18.5 19.999C18.776 19.999 19 20.223 19 20.499V21.499C19 22.877 17.878 23.999 16.5 23.999Z" fill="black" />
                                <path d="M20.5 18H9.5C8.122 18 7 16.878 7 15.5V2.5C7 1.122 8.122 0 9.5 0H20.5C21.878 0 23 1.122 23 2.5V15.5C23 16.878 21.878 18 20.5 18ZM9.5 1C8.673 1 8 1.673 8 2.5V15.5C8 16.327 8.673 17 9.5 17H20.5C21.327 17 22 16.327 22 15.5V2.5C22 1.673 21.327 1 20.5 1H9.5Z" fill="black" />
                              </svg>
                              Copy Text</button>
                          </div>
                          <div className={styles.textInfo}>
                            {humanCharCount} characters | {humanWordCount} words
                          </div>
                          {copySuccess && <p className="copySuccessMessage">{copySuccess}</p>}
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Humanizer;
