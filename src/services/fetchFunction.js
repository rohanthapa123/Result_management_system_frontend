import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const getNotices = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/notice`
    );
    //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getNoticeById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/notice/${id}`
    );
    //console.log("response of getNotice by ID", response.data);
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getClassNotice = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/classnotice`
    );
    //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};

export const getClass = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/class`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};

export const getClassById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/class/${id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};

export const getExams = async (id) => {
  try {
    if (id) {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}/api/exam/?class_id=${id}`
      );
      // //console.log(response.data.data)
      return response.data.data;
    } else {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}/api/exam`
      );
      // //console.log(response.data.data)
      return response.data.data;
    }
  } catch (error) {
    //console.log(error);
  }
};
export const getMarksOfClassByExam = async (class_id, exam_id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/studentMark`,
      {
        params: { class_id: class_id, exam_id: exam_id },
        withCredentials: true,
      }
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getExamForTeacher = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/examforteacher`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getExamByClass = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/exambyclass/${id}`
    );
    //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getExamById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/exam/${id}`
    );
    // //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getSubjects = async (id, limit, offset) => {
  try {
    if (id) {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}/api/subject/?class_id=${id}&limit=${limit}&offset=${offset}`
      );
      //console.log(response.data);
      return response.data;
    } else {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}/api/subject/?limit=${limit}&offset=${offset}`
      );
      // //console.log(response.data)
      return response.data;
    }
  } catch (error) {
    //console.log(error);
  }
};
export const getSubjectsByClassId = async (class_id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/subjectbyclass/${class_id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getSubjectsById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/subject/${id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getStudents = async (id, searchText) => {
  try {
    if (id && !searchText) {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}/api/students/?class_id=${id}`
      );
      // //console.log(response.data.data)
      return response.data.data;
    } else {
      if (searchText) {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_SERVER_URL}/api/students/?search=${searchText}`
        );
        // //console.log(response.data.data)
        return response.data.data;
      }
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}/api/students`
      );
      // //console.log(response.data.data)
      return response.data.data;
    }
  } catch (error) {
    //console.log(error);
  }
};
export const getStudentById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/students/${id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getAdmins = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/admins`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getAdminById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/admin/${id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getTeachers = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/teachers`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getTeacherById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/teachers/${id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getSectionByClass = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/sectionbyclass/${id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log("Error fetching sections:", error);
    throw error;
  }
};
export const getSectionByID = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/section/${id}`
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log("Error fetching sections:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    //console.log("deleting user id is" + id);
    await axiosInstance
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`)
      .then((response) => {
        //console.log(response);
      });
  } catch (error) {
    if (error.response.data.code === "1434") {
      toast.error("You are the last here ! Dont vanish yourself");
    }
    //console.log(error);
    throw error;
  }
};
export const deleteClass = async (id) => {
  try {
    await axiosInstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/class/${id}`
    );
  } catch (error) {
    //console.log(error);
  }
};
export const deleteSection = async (id) => {
  try {
    await axiosInstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/section/${id}`
    );
  } catch (error) {
    //console.log(error);
  }
};
export const deleteExams = async (id) => {
  try {
    await axiosInstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/exam/${id}`
    );
  } catch (error) {
    //console.log(error);
  }
};
export const deleteSubject = async (id) => {
  try {
    await axiosInstance.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/subject/${id}`
    );

    toast.warning("Subject Deleted Successfully");
  } catch (error) {
    if (error.response.data.error.sqlState === "23000") {
      toast.error("This subject cannot be deleted");
    }
    return error;
    // //console.log(error);
  }
};

export const getMyDetails = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/myprofile`
    );
    //console.log(response);
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};

export const getComplains = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/complain`
    );
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const solveComplain = async (id) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.REACT_APP_SERVER_URL}/api/complain/${id}`,
      null
    );
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
export const getMyComplains = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/mycomplain`
    );
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};

// export const getSubjects = async () =>{
//     try {
//         const response = await .get('${process.env.REACT_APP_SERVER_URL}/api/subjects')
//     } catch (error) {
//         //console.log(error)
//     }
// }
