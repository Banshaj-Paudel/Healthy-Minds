import axios from "axios";
import { FILE_STORE_URL } from "../config";

export const getB64Bytes = async (file_id: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${FILE_STORE_URL}/api/GetFile/${file_id}`
    );
    return response.data["base64string"];
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const uploadB64Bytes = async (b64Bytes: string): Promise<string> => {
  try {
    const response = await axios.post(`${FILE_STORE_URL}/api/Create`, {
      base64String: b64Bytes,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
