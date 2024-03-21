import clsx from "clsx";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import FormLabel from "../FormLabel";
import { storage } from "../../../config/FirebaseConfig";
import Progress from "../../Progress";

interface FormDropZoneProps extends React.ComponentPropsWithoutRef<"div"> {
    id?: string | undefined
    title?: string | undefined
    defaultText?: any | undefined
    onDragText?: any | undefined
    icon?: string | undefined
    userId?: string | undefined
    reftext?: string | undefined
    onUploadDone?: React.EventHandler<any> | undefined
} 

const FormDropZone = (props: FormDropZoneProps) => {

  const inputFileRef = useRef<string | any>()
  const [dragActive, setDragActive] = useState(false)
  const [pickedFile, setPickedFile] = useState<File>()
  const [filePath, setFilePath] = useState<ArrayBuffer | any | string>(null)
  const [percent, setPercent] = useState(0)
  const [uploading, setUpdloading] =  useState<boolean>(false)

   // handle drag events
   const handleDrag = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
    } else if (e.type === "dragleave") {
    setDragActive(false);
    }
}

const getBase64 = (e:any) => {
    var file = e
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFilePath(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
}

const handleUpload = (pick: File) => {
  if (!pick) alert("Please upload an image first!");

  setPercent(0)
  setUpdloading(true)

  const storageRef = ref(storage, `/users/${props.userId}/identities/${props.reftext}.png`);

  // progress can be paused and resumed. It also exposes progress updates.
  // Receives the storage reference and the file to upload.
  const uploadTask = uploadBytesResumable(storageRef, pick);

  uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              props.onUploadDone!(url)
              setUpdloading(false)
          });
      }
  );
}

const handleDrop = (e:any)=> {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setPickedFile(e.dataTransfer.files[0])
        getBase64(e.dataTransfer.files[0])
    }
}

  return (
    <div
      {...props}
      className={twMerge([
        "flex flex-col h-[220px]",
        !uploading && "cursor-pointer",
        uploading && "pointer-events-none select-none",
        props.className
      ])} onClick={(e:any)=> inputFileRef.current.click()} onDragEnter={handleDrag} onDrop={handleDrop} onDragLeave={handleDrag} onDragOver={handleDrag}>
        <input type={'file'} className='hidden' ref={inputFileRef} onChange={(e)=> {
            if (e.target.files && e.target.files[0].size <= 2097152) {
                setPickedFile(e.target.files[0])
                getBase64(e.target.files[0])
                handleUpload(e.target.files[0])
            } else {
                alert('Limit image size is 2mb !')
            }
        }} accept="image/*"/>
      <FormLabel htmlFor={props.id} className="!text-[13px] flex">
        { props.title }
      </FormLabel>

      <div className={clsx([
        "flex flex-col justify-center items-center flex-1 border-dashed border border-[2px] h-[220px] overflow-hidden rounded-xl shadow-sm",
        dragActive && "border-primary",
        !pickedFile && "px-20 py-8",
        pickedFile && "p-1"
      ])}>
            {
                pickedFile ? (
                    <img src={filePath} className='h-full w-full object-cover rounded-lg' />
                ):(
                    <>
                    <i className={clsx([
                        "fi text-3xl opacity-[50%]",
                        props.icon
                    ])}></i>
                    {
                        dragActive ? props.onDragText: props.defaultText
                    }
                    </>
                )
            }
      </div>
      { uploading &&(<span className="font-bold bg-white bg-opacity-90 text-xl flex flex-col items-center justify-center h-[220px] w-full text-center text-primary absolute pointer-events-none z-[1]">
        { percent }%
        <FormLabel htmlFor={"gg"} className="!text-[13px] text-slate-700 flex">
        Uploading...
      </FormLabel>

      <Progress className="h-2 w-28 !rounded-full">
        <Progress.Bar
          className="h-2 !rounded-full bg-primary"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        ></Progress.Bar>
      </Progress>
      </span>)}
      
    </div>
  );
}

export default FormDropZone