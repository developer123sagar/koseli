/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner, ToastMsg, Upload } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import { RootState, useAppSelector } from "@/redux/store";
import { url } from "@/routes";
import { MessageType } from "@/types";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const { token } = useAppSelector((state: RootState) => state.signin);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    video: "",
    thumbnail: "",
  });

  const UploadVideo = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${url}/story`, form, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status === 200) {
        setMessages([
          {
            id: Date.now().toString(),
            msg: "successfull uploaded the video",
            theme: "success",
          },
        ]);
        setTimeout(() => {
          navigate("/dashboard/video/myvideo");
        }, 1200);
      }
    } catch (err: any) {
      setMessages([
        {
          id: Date.now().toString(),
          msg: err.response.data.message || "Error during uploading video",
          theme: "fail",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  const isAuthorized = localStorage.getItem("authorized") === "true" || false;
  const navigate = useNavigate();

  return (
    <div className="mt-12">
      {isAuthorized ? (
        <>
          <NameMark label="Upload Video" variant="primary" />
          <ToastMsg messages={messages} setMessages={setMessages} />
          <div className="flex gap-2 justify-between">
            <div className="mt-6">
              <h1>Upload Video</h1>
              <Upload
                fieldName="video"
                imgTitle="video"
                setForm={setForm}
                accept=".mp4,.mpeg"
                isVideo
                showImage={false}
                form={form}
              />
            </div>
            <div className="mt-6">
              <h1>Upload Thumbnail</h1>
              <Upload
                fieldName="thumbnail"
                imgTitle="video_thumbnail"
                setForm={setForm}
                accept=".jpg,.jpeg,.svg,.png"
              />
            </div>
          </div>
          <Buttons
            type="button"
            className="mt-16 float-right flex items-center justify-center"
            onClick={UploadVideo}
          >
            {loading ? <Spinner btn /> : "Upload"}
          </Buttons>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <h1>
            Please Subscribe to get our features <br />
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/dashboard/subscription/pay")}
            >
              click here
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default AddVideo;
