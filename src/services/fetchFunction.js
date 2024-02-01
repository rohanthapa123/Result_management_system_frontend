import axios from "axios";

export const getNotices = async () => {
    const response = await axios.get("http://localhost:8080/api/notice", {
        withCredentials: true,
    })
    console.log(response.data.data)
    return response.data.data;
}

export const getClass = async () => {

    try {
        const response = await axios.get("http://localhost:8080/api/class", {
            withCredentials: true,
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}

export const getStudents = async () =>{
    try {
        const response = await axios.get("http://localhost:8080/api/students",{
            withCredentials: true,
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}
export const getTeachers = async () =>{
    try {
        const response = await axios.get("http://localhost:8080/api/teachers",{
            withCredentials: true,
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}
export const getSectionByClass = async (id) =>{
    try {
        const response = await axios.get(`http://localhost:8080/api/section/${id}`,{
            withCredentials: true,
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log("Error fetching sections:", error);
        throw error;
    }
}


export const deleteUser = async (id) =>{
    try {
        await axios.delete(`http://localhost:8080/api/users/${id}`,{
            withCredentials: true,
          });
    } catch (error) {
        console.log(error);
    }
}
export const deleteClass = async (id) =>{
    try {
        await axios.delete(`http://localhost:8080/api/class/${id}`,{
            withCredentials: true,
          });
    } catch (error) {
        console.log(error);
    }
}

// export const getSubjects = async () =>{
//     try {
//         const response = await axios.get('http://localhost:8080/api/subjects')
//     } catch (error) {
//         console.log(error)
//     }
// }