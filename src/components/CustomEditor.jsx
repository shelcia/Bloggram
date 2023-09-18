import React, { useContext } from "react";
import SunEditor from "suneditor-react";
import { ThemeContext } from "../context/ThemeContext";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const CustomEditor = ({ handleChange, defaultValue = "" }) => {
  const [darkTheme] = useContext(ThemeContext);
  return (
    <React.Fragment>
      <div
        className={
          darkTheme
            ? `sun-editor-wrappper sun-editor-dark`
            : `sun-editor-wrappper sun-editor-light`
        }
      >
        <SunEditor
          onChange={handleChange}
          setDefaultStyle="font-size: 14px; font-weight: 500;"
          defaultValue={defaultValue}
          setOptions={{
            minHeight: "80vh",
            textTags: {
              bold: "b",
              underline: "u",
              italic: "i",
              strike: "s",
            },
            mode: "balloon-always",
            // rtl: false,
            katex: "window.katex",
            formats: ["p", "blockquote", "h1", "h2", "h3", "pre"],
            imageWidth: "",
            imageHeight: "",
            imageUploadUrl: "",
            imageAccept: ".jpg, .png",
            imageGalleryUrl:
              "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
            videoFileInput: false,
            youtubeQuery: "",
            videoUploadUrl: "",
            audioUrlInput: false,
            tabDisable: false,
            placeholder: "This blog will be about ...",
            mediaAutoSelect: false,
            buttonList: [
              [
                "undo",
                "redo",
                "formatBlock",
                "blockquote",
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "removeFormat",
                "outdent",
                "indent",
                "align",
                "horizontalRule",
                "list",
                "table",
                "link",
                "image",
                "video",
                "audio",
              ],
            ],
            "lang(In nodejs)": "en",
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default CustomEditor;
