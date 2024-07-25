import React, { useEffect, useRef, useState } from "react";
import { Box,  } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import styled from "@emotion/styled";
import { uploadfile } from "./uploadfile.js"
import { useAuthContext } from "../../context/AuthContext.jsx";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;
const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
  margin-top:1px;
`;


const Icon = ({setResult}) => {

  // const [file, setFile] = useState("");

  const {file, setFile} = useAuthContext()
 


  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };


  useEffect(() => {
    const getimg = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let res = await uploadfile(data);
        setResult(res.path);
      }
    };

    getimg();
  }, [file]);


  return (
    <>
      <div className='margin-top: 100px;'>
        <ClipIcon onClick={onUploadClick} className='margin-top: 100px;'/>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* <h2>hiii</h2> */}
      </div>
  
    </>

  );
};

export default Icon;
