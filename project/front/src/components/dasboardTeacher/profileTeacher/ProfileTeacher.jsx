import React from "react";
import CreateClass from "./CreateClass";
import AddStudentToClass from "./AddStudentToClass";
import GetClassStudent from "./GetClassStudent";
import AddQuizToClass from "./AddQuizToClass";
import Sidebar from "../../../assestComponent/Sidebar";
import TeacherQuizzes from "./TeacherQuizzes ";
function ProfileTeacher(){
    return(
      <>
      <Sidebar/>
      <GetClassStudent/>
      {/* <AddQuizToClass/> */}
      <CreateClass/>
      <AddStudentToClass/>
      <TeacherQuizzes/>
      
      </>
    );

}
export default ProfileTeacher;

// هاد الفايل المفروض ينحذف 