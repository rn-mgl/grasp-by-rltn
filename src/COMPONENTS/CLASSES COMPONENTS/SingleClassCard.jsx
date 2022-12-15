import React from "react";
import { Buffer } from "buffer";
import { AiOutlineMore } from "react-icons/ai";

// card components
import ClassCardInfo from "./ClassCardInfo";
import EditClassForm from "./EditClassForm";
import SingleClassCardHeader from "./IN-FILE COMPONENTS/SingleClassCardHeader";
import axios from "axios";

// global function components
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context";

export default function SingleClassCard(props) {
  const [activityPreview, setActivityPreview] = React.useState([]);
  const { url } = useGlobalContext();
  const color = props.isArchived ? "bg-pr-blu" : "bg-pr-grn";
  const token = localStorage.getItem("token");
  const handlerImage = props.data?.user_image
    ? Buffer.from(props.data.user_image).toString()
    : undefined;

  const fetchTasksPreview = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${props.data.class_id}`, {
        headers: { Authorization: token },
      });
      if (data) {
        setActivityPreview(data.upcoming_tasks_data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.data.class_id, token, url]);

  React.useEffect(() => {
    fetchTasksPreview();
  }, [fetchTasksPreview]);

  return (
    <>
      {/* show edit class form */}
      {props.canEditClass && props.activeHeader === props.data.class_id && (
        <EditClassForm
          fetchClasses={props.fetchClasses}
          handleEditClass={props.handleEditClass}
          classId={props.data.class_id}
        />
      )}

      <div
        className="flex relative z-0 flex-col w-full bg-white rounded-lg drop-shadow-md
          tablet:w-60
          laptop-s:w-80
          4k:w-[32rem]"
      >
        <div
          className={`p-4 ${color}  flex rounded-tl-lg rounded-tr-lg
            mobile-s:rounded-lg
            tablet:rounded-bl-none tablet:rounded-br-none
            4k:p-8`}
        >
          <SingleClassCardHeader handlerImage={handlerImage} data={props.data} />

          <div>
            {/* "more" button for class card */}
            <AiOutlineMore
              className="cursor-pointer scale-125"
              onClick={props.handleActiveHeader}
              color={"white"}
            />

            {/* more button return pop up */}
            {props.activeHeader === props.data.class_id && (
              <ClassCardInfo
                archiveClass={() => props.archiveClass(props.data.class_id)}
                restoreClass={() => props.restoreClass(props.data.class_id)}
                classHandler={props.data.class_handler}
                classData={props.data}
                handleUnenroll={props.handleUnenroll}
                handleEditClass={props.handleEditClass}
                handleDeleteClass={props.handleDeleteClass}
                isArchived={props.isArchived}
              />
            )}
          </div>
        </div>

        {/* white box */}
        <div
          className="p-4 h-32 flex flex-col gap-0
            mobile-s:hidden
            tablet:flex
            laptop-s:h-40
            laptop-l:h-52
            4k:h-72"
        >
          {activityPreview.map((act) => {
            return (
              <div
                className="mobile-s:hidden text-sm
                      tablet:flex
                      laptop-s:text-base"
                key={act.task_id}
              >
                <NavLink
                  className="font-Work hover:text-pr-grn"
                  to={`/class/${props.data.class_id}/tasks/${act.task_id}`}
                >
                  {act.task_main_topic}
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
