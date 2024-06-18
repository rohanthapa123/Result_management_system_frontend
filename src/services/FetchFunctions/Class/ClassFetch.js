import axios from "axios";

export const getClassAssignedToTeacher = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/classbyteacher`, {
      withCredentials: true,
    });
    console.log(response.data)
    return response.data.data;
  } catch (error) {
    console.log(error)
  }
};
