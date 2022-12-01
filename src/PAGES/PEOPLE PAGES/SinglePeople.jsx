import axios from "axios";
import React from "react";

// single people components
import NavBack from "./IN-FILE COMPONENTS/NavBack";
import SinglePeopleTaskBase from "./IN-FILE COMPONENTS/SinglePeopleTaskBase";
import SingleClassNavbar from "../../COMPONENTS/SINGLE CLASS COMPONENTS/SingleClassNavbar";
import PeopleHeader from "../../COMPONENTS/PEOPLE COMPONENTS/PeopleHeader";
import CountCard from "../../COMPONENTS/GLOBAL COMPONENTS/CountCard";

// global function components
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";

// utils components
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";

export default function SinglePeople() {
  const [peopleData, setPeopleData] = React.useState({});
  const [ongoingTask, setOngoingTask] = React.useState([]);
  const [missingTask, setMissingTask] = React.useState([]);
  const [doneTask, setDoneTask] = React.useState([]);
  const [error, setError] = React.useState({ active: false, message: "" });

  const class_id = window.location.pathname.split("/")[2];
  const { people_id } = useParams();
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  const fetchPeopleInfo = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/students/${people_id}`, {
        headers: { Authorization: token },
      });

      if (data) {
        setPeopleData(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [class_id, people_id, token, url]);

  const fetchOngoingTasks = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/students/${people_id}/ongoing`, {
        headers: { Authorization: token },
      });

      if (data) {
        setOngoingTask(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [class_id, people_id, token, url]);

  const fetchMissingTasks = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/students/${people_id}/missing`, {
        headers: { Authorization: token },
      });

      if (data) {
        setMissingTask(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [class_id, people_id, token, url]);

  const fetchDoneTasks = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/students/${people_id}/done`, {
        headers: { Authorization: token },
      });
      if (data) {
        setDoneTask(data);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [class_id, people_id, token, url]);

  React.useEffect(() => {
    fetchPeopleInfo();
  }, [fetchPeopleInfo]);

  React.useEffect(() => {
    fetchOngoingTasks();
  }, [fetchOngoingTasks]);

  React.useEffect(() => {
    fetchMissingTasks();
  }, [fetchMissingTasks]);

  React.useEffect(() => {
    fetchDoneTasks();
  }, [fetchDoneTasks]);

  return (
    <div
      className="custom-flex gap-10 flex-col w-full my-10 
                laptop-s:gap-20"
    >
      <DropDownError error={error} setError={setError} />
      <SingleClassNavbar class_id={class_id} />
      <NavBack class_id={class_id} />
      <div
        className="w-11/12 custom-flex flex-col gap-5
                  laptop-l:flex-row laptop-l:w-10/12"
      >
        <PeopleHeader peopleData={peopleData} />

        <div
          className="w-full custom-flex flex-col gap-5
                    tablet:flex-row
                    laptop-s:w-11/12
                    laptop-l:h-[13.8rem]"
        >
          <CountCard count={ongoingTask.length} label="ONGOING" bgColor="from-pr-grn to-pr-ylw" />
          <CountCard count={missingTask.length} label="LATE" bgColor="from-pr-red to-pr-orng" />
          <CountCard count={doneTask.length} label="DONE" bgColor="from-pr-blu to-pr-grn" />
        </div>
      </div>
      <div
        className="w-11/12 custom-flex flex-col gap-10
                  laptop-s:w-10/12"
      >
        <SinglePeopleTaskBase
          fromColor="grn"
          toColor="ylw"
          label={"ongoing"}
          ongoingTask={ongoingTask}
          class_id={class_id}
          fetchTask={fetchOngoingTasks}
        />
        <SinglePeopleTaskBase
          fromColor="red"
          toColor="orng"
          label={"missing"}
          ongoingTask={missingTask}
          class_id={class_id}
          fetchTask={fetchMissingTasks}
        />
        <SinglePeopleTaskBase
          fromColor="blu"
          toColor="grn"
          label={"done"}
          ongoingTask={doneTask}
          class_id={class_id}
          fetchTask={fetchDoneTasks}
        />
      </div>
    </div>
  );
}
