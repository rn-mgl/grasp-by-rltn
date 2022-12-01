import React from "react";
import axios from "axios";

// single class people components
import NavBack from "./IN-FILE COMPONENTS/NavBack";
import SingleClassNavbar from "../../COMPONENTS/SINGLE CLASS COMPONENTS/SingleClassNavbar";
import PeopleBarPreview from "../../COMPONENTS/PEOPLE COMPONENTS/PeopleBarPreview";

// utils and global function components
import { useGlobalContext } from "../../context";
import DropDownError from "../../COMPONENTS/ERROR COMPONENTS/DropDownError";
import MessagePage from "../../COMPONENTS/ERROR COMPONENTS/MessagePage";

export default function ClassPeople() {
  const [people, setPeople] = React.useState([]);
  const [error, setError] = React.useState({ active: false, message: "" });

  const class_id = window.location.pathname.split("/")[2];
  const { url } = useGlobalContext();
  const token = localStorage.getItem("token");

  // get people
  const fetchPeople = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/classes/${class_id}/students`, {
        headers: { Authorization: token },
      });
      if (data) {
        setPeople(data.students);
      }
    } catch (error) {
      console.log(error);
      setError({ active: true, message: error.response.data.msg });
    }
  }, [class_id, token, url]);

  React.useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  return (
    <div className="flex flex-col items-center mt-10 w-full mx-auto gap-6">
      <DropDownError error={error} setError={setError} />
      <NavBack class_id={class_id} />
      <SingleClassNavbar
        class_id={class_id}
        class_handler={people[0] ? people[0].class_handler : -1}
      />
      {people?.length > 0 ? (
        <PeopleBarPreview class_id={class_id} people={people} />
      ) : (
        <MessagePage
          header={"No Class Posts"}
          body={"your class posts will be displayed here"}
          fetch={fetchPeople}
          footer={"Try To Get Posts"}
        />
      )}
    </div>
  );
}
