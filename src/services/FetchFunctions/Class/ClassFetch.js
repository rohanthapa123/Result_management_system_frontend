import axiosInstance from "../../axiosInstance";

export const getClassAssignedToTeacher = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_SERVER_URL}/api/classbyteacher`,
      {
        withCredentials: true,
      }
    );
    //console.log(response.data)
    return response.data.data;
  } catch (error) {
    //console.log(error)
  }
};
