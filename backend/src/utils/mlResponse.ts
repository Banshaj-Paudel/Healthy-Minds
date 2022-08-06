import axios from "axios";
import { API_URL } from "../config";

interface MlDiagnosticResponse {
  risk: string;
  probability: number;
  name: DiagnosticTypes;
}

export const getDiagnosticData = async (
  base64String: string
): Promise<MlDiagnosticResponse> => {
  const response = await axios.post(
    `${API_URL}/api/v1/predict`,
    {
      base64str: base64String,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = response.data;
  return {
    risk: data.message,
    probability: data.probability,
    name: DiagnosticTypes.ALZHEIMER,
  };
};
