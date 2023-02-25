import React from "react";
import axios from "axios";

// functions/global components
import * as head_fns from "../../FUNCTIONS/headerFunction";
import { useGlobalContext } from "../../context";

// error components
import MessagePage from "../../COMPONENTS/ERROR COMPONENTS/MessagePage";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";

// class card component
import SingleClassCard from "../../COMPONENTS/CLASSES COMPONENTS/SingleClassCard";

export default function ArchivedClasses() {
  const [classes, setClasses] = React.useState([]);
  const [activeHeader, setActiveHeader] = React.useState(-1);
  const [canEditClass, setCanEditClass] = React.useState(false);
  const [error, setError] = React.useState({ active: false, message: "" });

  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  // get archived classes
  const fetchArchivedClasses = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/archived-classes`, {
        headers: { Authorization: token },
      });
      if (data) {
        setClasses(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  }, [token, url]);

  // restore selected class
  const restoreClass = async (class_id) => {
    try {
      const { data } = await axios.patch(
        `${url}/archived-classes/${class_id}`,
        { class_is_ongoing: 1 },
        { headers: { Authorization: token } }
      );

      if (data) {
        fetchArchivedClasses();
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  };

  // delete archived class
  const handleDeleteClass = async (class_id) => {
    try {
      const { data } = await axios.delete(`${url}/archived-classes/${class_id}`, {
        headers: { Authorization: token },
      });

      const { file_name } = data;

      if (file_name) {
        const resource_type = "image";
        try {
          await axios.delete(`${url}/grasp-by-rltn/file-upload`, {
            headers: { Authorization: token },
            data: { public_id: file_name, resource_type },
          });
        } catch (error) {
          console.log(error);
          setError({ active: true, message: error });
        }
      }
      if (data) {
        fetchArchivedClasses();
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error });
    }
  };

  // toggle edit archived class
  const handleEditClass = () => {
    setCanEditClass((prev) => !prev);
  };

  React.useEffect(() => {
    fetchArchivedClasses();
  }, [fetchArchivedClasses]);

  return (
    <div
      className="flex auto-rows-auto mt-10 flex-col mx-auto gap-3 w-11/12 flex-wrap 
            tablet:flex-row
            laptop-s:gap-6
            4k:gap-12"
    >
      <DropDownError error={error} setError={setError} />
      {classes?.length > 0 ? (
        classes.map((data) => {
          return (
            <SingleClassCard
              key={data.class_id}
              data={data}
              isArchived={true}
              activeHeader={activeHeader}
              restoreClass={restoreClass}
              fetchClasses={fetchArchivedClasses}
              canEditClass={canEditClass}
              handleDeleteClass={() => handleDeleteClass(data.class_id)}
              handleEditClass={handleEditClass}
              handleActiveHeader={() => head_fns.handleActiveHeader(data.class_id, setActiveHeader)}
            />
          );
        })
      ) : (
        <MessagePage
          header={"No Archived Classes"}
          body={"your archived classes will be displayed here"}
          fetch={fetchArchivedClasses}
          footer={"Try To Get Archived Classes"}
        />
      )}
    </div>
  );
}
