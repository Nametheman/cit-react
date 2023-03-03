import { Axios } from "../axios/Axios";
import { BASE_URL } from "../config/config";

export const userLogin = async (body) => {
  const { data } = await Axios.post(`${BASE_URL}/account/login/`, body);
  return data;
};

export const axiosDashboard = async ()=> {
  const { data } = await Axios.get(`${BASE_URL}/api?bank_id=${1}`);
  return data;
}
// export const axiosDashboard = async (body) => {
//     const {data} = await Ac
// }
