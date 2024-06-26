import axiosInstance from "../../axiosInstance";

export const getAllMarksOfClassByExam = async (class_id, term) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/viewmark/?class_id=${class_id}&term=${term}`,
      {
        withCredentials: true,
      }
    );
    // //console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    //console.log(error);
  }
};
