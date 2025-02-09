// import { useState, useRef } from "react";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud } from "react-icons/fi";

// export default function Upload({ label, viewData = null, editData = null }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   );
//   const inputRef = useRef(null);

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       previewFile(file);
//       setSelectedFile(file);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { "image/*": [".jpeg", ".jpg", ".png"] },
//     onDrop,
//   });

//   const previewFile = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setPreviewSource(reader.result);
//     };
//   };

//   // Trigger file input when clicking on the dropzone
//   const handleClick = () => {
//     inputRef.current.click();
//   };

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm font-medium text-[#999DAA]" htmlFor="fileInput">
//         {label} <sup className="text-pink-200">*</sup>
//       </label>
//       <div
//         className={`${
//           isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//         } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted ${
//           isDragActive ? "border-yellow-50" : "border-richblack-500"
//         }`}
//         {...getRootProps()}
//         onClick={handleClick} // Trigger the file input on click
//       >
//         <input
//           {...getInputProps()}
//           ref={inputRef}
//           className="hidden"
//           id="fileInput"
//         />
//         {previewSource ? (
//           <div className="flex w-full flex-col p-6">
//             <img
//               src={previewSource}
//               alt="Preview"
//               className="h-full w-full rounded-md object-cover"
//             />
//             <button
//               type="button"
//               onClick={() => {
//                 setPreviewSource("");
//                 setSelectedFile(null);
//               }}
//               className="mt-3 text-[#999DAA] underline"
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <div className="flex w-full flex-col items-center p-6">
//             <div className="grid aspect-square w-14 place-items-center rounded-full bg-[#171717]">
//               <FiUploadCloud className="text-2xl text-yellow-50" />
//             </div>
//             <p className="mt-2 max-w-[200px] text-center text-sm text-[#999DAA]">
//               Drag and drop an image, or click to{" "}
//               <span className="font-semibold text-yellow-50">Browse</span> a
//               file
//             </p>
//             <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-[#999DAA]">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>
//       {/* Optional error handling for image selection */}
//       {!previewSource && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  label,
  viewData = null,
  editData = null,
  onUpload,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      onUpload(file); // Pass the selected file to the parent component
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Trigger file input when clicking on the dropzone
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-[#999DAA]" htmlFor="fileInput">
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted ${
          isDragActive ? "border-yellow-50" : "border-richblack-500"
        }`}
        {...getRootProps()}
        onClick={handleClick} // Trigger the file input on click
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          className="hidden"
          id="fileInput"
        />
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setPreviewSource("");
                setSelectedFile(null);
              }}
              className="mt-3 text-[#999DAA] underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-[#171717]">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-[#999DAA]">
              Drag and drop an image, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-[#999DAA]">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {/* Optional error handling for image selection */}
      {!previewSource && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
