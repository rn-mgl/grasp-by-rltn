import React from "react";
import axios from "axios";

// single class components
import ClassAdditionalInfo from "../../COMPONENTS/SINGLE CLASS COMPONENTS/ClassAdditionalInfo";
import SingleClassNavbar from "../../COMPONENTS/SINGLE CLASS COMPONENTS/SingleClassNavbar";
import ClassHeader from "../../COMPONENTS/SINGLE CLASS COMPONENTS/ClassHeader";
import UpcomingActivities from "../../COMPONENTS/SINGLE CLASS COMPONENTS/UpcomingActivities";
import Post from "../../COMPONENTS/GLOBAL COMPONENTS/Post";

// utils components
import Loading from "../../COMPONENTS/GLOBAL COMPONENTS/Loading";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import MessagePop from "./IN-FILE COMPONENTS/MessagePop";

// global function components
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import { useGlobalContext } from "../../context";
import PeopleNav from "./IN-FILE COMPONENTS/PeopleNav";

export default function SingleClass() {
  const [classData, setClassData] = React.useState({});
  const [activityPreview, setActivityPreview] = React.useState([]);
  const [visibleClassInfo, setVisibleClassInfo] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });
  const [messagePop, setMessagePop] = React.useState({ active: false, message: "" });

  const { class_id } = useParams();
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");
  const classImage = classData?.class_image
    ? `${Buffer.from(classData?.class_image).toString()}`
    : undefined;

  // get class info and 3 preview upcoming tasks
  const fetchClass = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setClassData(data.class_data);
        setActivityPreview(data.upcoming_tasks_data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
    setLoading(false);
  }, [class_id, token, url]);

  // message pop
  const handleMessagePop = (message) => {
    setMessagePop((prev) =>
      prev.active ? { active: false, message: "" } : { active: true, message: message }
    );
  };

  // copy class code
  const handleCopyClassCode = (code) => {
    navigator?.clipboard?.writeText(code);
  };

  // class additional info toggle
  const handleAdditionalClassInfo = () => {
    setVisibleClassInfo((prev) => !prev);
  };

  // get class data
  React.useEffect(() => {
    fetchClass();
  }, [fetchClass]);

  //get class post

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center mt-10 w-full mx-auto gap-6">
      <DropDownError error={error} setError={setError} />

      <MessagePop messagePop={messagePop} setMessagePop={setMessagePop} />

      <SingleClassNavbar class_id={class_id} class_handler={classData.class_handler} />

      <ClassHeader
        classData={classData}
        handleAdditionalClassInfo={handleAdditionalClassInfo}
        classImage={classImage}
      />

      {visibleClassInfo && (
        <ClassAdditionalInfo
          handleMessagePop={handleMessagePop}
          handleCopyClassCode={handleCopyClassCode}
          classData={classData}
        />
      )}

      <div
        className="flex flex-col w-11/12 gap-6
                  laptop-s:flex-row
                  laptop-l:w-9/12"
      >
        <div
          className="w-full custom-flex gap-3 justify-start flex-col
                    laptop-s:w-3/12"
        >
          <UpcomingActivities activityPreview={activityPreview} class_id={class_id} />

          <PeopleNav class_id={class_id} />
        </div>

        <div
          className="flex flex-col w-full gap-6 mb-10
                  laptop-l:w-9/12"
        >
          <Post
            loading={loading}
            classData={classData}
            postType={"class"}
            writePostType={"class"}
            class_id={class_id}
          />
        </div>
      </div>
    </div>
  );
}
