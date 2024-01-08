import { Spinner } from "@/common";
import Buttons from "@/common/Button";
import NameMark from "@/common/NameMark";
import {
  fetchDashboardData,
  setSelectedItem,
} from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { baseImgUrl, baseVideoUrl } from "@/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewVideo = () => {
  const { token } = useAppSelector((state: RootState) => state.signin);
  const { data, loading } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDashboardData({ api: "story/restaurant", token: token! }));
  }, [dispatch, token]);
  const hanldeUpdate = () => {
    const [firstItem] = data;

    dispatch(setSelectedItem(firstItem));
    navigate(`/dashboard/video/myvideo/edit/${firstItem?._id}`);
  };
  return (
    <div className="mt-16">
      <NameMark label="MY VIDEO" variant="secondary" />
      <Buttons type="button" onClick={hanldeUpdate} className="float-right">
        Update Video
      </Buttons>
      {loading ? (
        <Spinner />
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="my-6">
          <h1 className="font-bold">Uploaded Video</h1>
          <video
            src={`${baseVideoUrl}/${data[0]?.video}`}
            width={600}
            height={400}
            controls
            autoPlay
          />
          <div className="mt-8">
            <h2>Thumbnail Image</h2>
            <img
              src={`${baseImgUrl}/${data[0]?.thumbnail}`}
              alt="thumbnail"
              className="object-cover h-56"
              width={600}
              height={100}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ViewVideo;
