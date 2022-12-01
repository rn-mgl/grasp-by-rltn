import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import Navbar from "./COMPONENTS/GLOBAL COMPONENTS/Navbar";
import Landing from "./PAGES/Landing";
import Login from "./PAGES/AUTH PAGES/Login";
import Signup from "./PAGES/AUTH PAGES/Signup";
import Classes from "./PAGES/CLASS PAGES/Classes";
import SingleClass from "./PAGES/CLASS PAGES/SingleClass";
import Ongoing from "./PAGES/TASK PAGES/Ongoing";
import Missing from "./PAGES/TASK PAGES/Missing";
import Done from "./PAGES/TASK PAGES/Done";
import SingleTask from "./PAGES/TASK PAGES/SingleTask";
import SingleClassPeople from "./PAGES/PEOPLE PAGES/SingleClassPeople";
import ClassTasks from "./PAGES/CLASS PAGES/ClassTasks";
import AddTaskForm from "./COMPONENTS/SINGLE TASK COMPONENTS/AddTaskForm";
import EditTaskForm from "./COMPONENTS/SINGLE TASK COMPONENTS/EditTaskForm";
import SinglePeople from "./PAGES/PEOPLE PAGES/SinglePeople";
import Profile from "./PAGES/PEOPLE PAGES/Profile";
import ArchivedClasses from "./PAGES/CLASS PAGES/ArchivedClasses";
import ArchivedTasks from "./PAGES/TASK PAGES/ArchivedTasks";
import ArchivedSingleTask from "./PAGES/TASK PAGES/ArchivedSingleTask";
import EditClassForm from "./COMPONENTS/CLASSES COMPONENTS/EditClassForm";
import EditComment from "./COMPONENTS/COMMENT COMPONENTS/EditComment";
import StudentsTasksToGrade from "./PAGES/TO GRADE/StudentsTasksToGrade";
import ProtectedRoute from "./COMPONENTS/GLOBAL COMPONENTS/ProtectedRoute";
import UnknownPage from "./PAGES/ERROR/UnknownPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* base path */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route index element={<Landing />} />
        <Route path="/" element={<Navbar />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comments/edit"
            element={
              <ProtectedRoute>
                <EditComment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/archived-classes"
            element={
              <ProtectedRoute>
                <ArchivedClasses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:user_id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* class path */}
          <Route
            index
            path="/class/:class_id"
            element={
              <ProtectedRoute>
                <SingleClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/edit"
            element={
              <ProtectedRoute>
                <EditClassForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/tasks"
            element={
              <ProtectedRoute>
                <ClassTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/to-grade/:task_id"
            element={
              <ProtectedRoute>
                <StudentsTasksToGrade />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/archived-tasks"
            element={
              <ProtectedRoute>
                <ArchivedTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/archived-tasks/:task_id"
            element={
              <ProtectedRoute>
                <ArchivedSingleTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/tasks/create"
            element={
              <ProtectedRoute>
                <AddTaskForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/tasks/:task_id"
            element={
              <ProtectedRoute>
                <SingleTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/tasks/:task_id/edit"
            element={
              <ProtectedRoute>
                <EditTaskForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/people"
            element={
              <ProtectedRoute>
                <SingleClassPeople />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/:class_id/people/:people_id"
            element={
              <ProtectedRoute>
                <SinglePeople />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* tasks path */}
        <Route path="tasks" element={<Navbar />}>
          <Route
            index
            path="ongoing"
            element={
              <ProtectedRoute>
                <Ongoing />
              </ProtectedRoute>
            }
          />
          <Route
            path="missing"
            element={
              <ProtectedRoute>
                <Missing />
              </ProtectedRoute>
            }
          />
          <Route
            path="done"
            element={
              <ProtectedRoute>
                <Done />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<UnknownPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
