import axiosInstance from "../../axiosInstance";

export const getTeacherSubject = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/getteachersubject`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTeacherClass = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/getteacherclass`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
