import React, { useContext } from "react";
import SunEditor from "suneditor-react";
import { ThemeContext } from "../context/ThemeContext";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const CustomEditor = ({ handleChange, defaultValue = "" }) => {
  const [darkTheme] = useContext(ThemeContext);
  // const BUTTONLIST = [
  //     ["undo", "redo"],
  //     [/*"font",*/ "fontSize", "formatBlock"],
  //     ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  //     ["removeFormat"],
  //     // "/",
  //     ["fontColor", "hiliteColor"],
  //     ["outdent", "indent"],
  //     ["align", "horizontalRule", "list", "table"],
  //     ["link", "image", "video"],
  //     // ["fullScreen", "showBlocks" /*, 'codeView'*/],
  //     // ["preview", "print"],
  //     // ["save", "template"],
  //   ];
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
          // setOptions={{
          //   height: "80vh",
          //   buttonList: BUTTONLIST,
          // }}
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
                // "font",
                // "fontSize",
                "formatBlock",
                // "paragraphStyle",
                "blockquote",
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                // "fontColor",
                // "hiliteColor",
                // "textStyle",
                "removeFormat",
                "outdent",
                "indent",
                "align",
                "horizontalRule",
                "list",
                // "lineHeight",
                "table",
                "link",
                "image",
                "video",
                "audio",
                // "math",
                //   "imageGallery",
                // "fullScreen",
                // "showBlocks",
                // "codeView",
                // "preview",
                // "print",
                // "save",
                // "template",
              ],
            ],
            // "lang": SUNEDITOR_LANG.en,
            "lang(In nodejs)": "en",
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default CustomEditor;
