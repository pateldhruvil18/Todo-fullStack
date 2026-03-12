import api from "../lib/axios";

export const registerUser = async (data : any) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const verifyOtp = async(data:any)=>{
 const res = await api.post("/auth/verify-otp",data)
 return res.data
}

export const loginUser = async (data : any) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
}