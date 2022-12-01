import React from "react";
import axios from "axios";

// class card component
import SingleClassCard from "../../COMPONENTS/CLASSES COMPONENTS/SingleClassCard";

// form components
import AddClassForm from "../../COMPONENTS/CLASSES COMPONENTS/AddClassForm";
import JoinClassForm from "../../COMPONENTS/CLASSES COMPONENTS/JoinClassForm";

// global functions
import * as head_fns from "../../FUNCTIONS/headerFunction";
import { useGlobalContext } from "../../context";

// utils components
import Loading from "../../COMPONENTS/GLOBAL COMPONENTS/Loading";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import MessagePage from "../../COMPONENTS/ERROR COMPONENTS/MessagePage";

// in-file components
import CompiledClassButtons from "./IN-FILE COMPONENTS/CompiledClassButtons";

export default function Classes() {
  const [classes, setClasses] = React.useState([]);
  const [canAddClass, setCanAddClass] = React.useState(false);
  const [canJoinClass, setCanJoinClass] = React.useState(false);
  const [canEditClass, setCanEditClass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });
  const [activeHeader, setActiveHeader] = React.useState(-1);

  const token = localStorage.getItem("token");
  const { url } = useGlobalContext();

  // get classes
  const fetchClasses = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/classes`, { headers: { Authorization: token } });
      if (data) {
        setClasses(data.classes);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
    setLoading(false);
  }, [token, url]);

  // unenroll function
  const handleUnenroll = async (class_id) => {
    try {
      const { data } = await axios.delete(`${url}/classes/${class_id}/students`, {
        headers: { Authorization: token },
      });
      if (data) {
        fetchClasses();
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  };

  // archive function
  const archiveClass = async (class_id) => {
    try {
      const data = await axios.patch(
        `${url}/classes/${class_id}`,
        { class_is_ongoing: 0 },
        { headers: { Authorization: token } }
      );
      if (data) {
        fetchClasses();
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  };

  //edit form toggle function
  const handleEditClass = () => {
    setCanEditClass((prev) => !prev);
  };

  //add form toggle function
  const handleCanAddClass = () => {
    setCanAddClass((prev) => !prev);
  };

  //join form toggle function
  const handleCanJoinClass = () => {
    setCanJoinClass((prev) => !prev);
  };

  React.useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full my-10">
      <DropDownError error={error} setError={setError} />

      {/* add or join class buttons */}
      <CompiledClassButtons
        handleCanAddClass={handleCanAddClass}
        handleCanJoinClass={handleCanJoinClass}
      />

      {/* add class form  */}
      {canAddClass && (
        <AddClassForm
          handleCanAddClass={handleCanAddClass}
          fetchClasses={fetchClasses}
          setCanAddClass={setCanAddClass}
        />
      )}

      {/* join class form  */}
      {canJoinClass && <JoinClassForm handleCanJoinClass={handleCanJoinClass} />}

      {/* render class cards or message if none */}
      <div
        className="flex auto-rows-auto mt-10 flex-col mx-auto gap-3 w-11/12 flex-wrap 
                  tablet:flex-row
                  laptop-s:gap-6
                  4k:gap-12"
      >
        {classes?.length > 0 ? (
          classes.map((data) => {
            return (
              <SingleClassCard
                key={data.class_id}
                data={data}
                isArchived={false}
                fetchClasses={fetchClasses}
                activeHeader={activeHeader}
                archiveClass={archiveClass}
                canEditClass={canEditClass}
                handleUnenroll={handleUnenroll}
                handleEditClass={handleEditClass}
                handleActiveHeader={() =>
                  head_fns.handleActiveHeader(data.class_id, setActiveHeader)
                }
              />
            );
          })
        ) : (
          <MessagePage
            header={"No Classes"}
            body={"your classes will be displayed here"}
            fetch={fetchClasses}
            footer={"Try To Get Classes"}
          />
        )}
      </div>
    </div>
  );
}
