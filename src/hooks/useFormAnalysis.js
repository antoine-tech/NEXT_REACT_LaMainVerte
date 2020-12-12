import { useState } from "react";

const useFormAnalysis = () => {
  const alertMessages = {
    isEmpty: "Ce champ est obligatoire",
    passwordsAreDifferent: "Les mots de passes ne sont pas similaires",
  };

  const [userDatas, setUserdatas] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [alerts, setAlerts] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleInput = (datas) => {
    let { value, id } = datas;
    const newUserDatas = { ...userDatas };
    newUserDatas[id] = value;
    setUserdatas({ ...newUserDatas });

    if (userDatas.password !== userDatas.password_confirmation) {
      setAlerts({
        ...alerts,
        password_confirmation: alertMessages.passwordsAreDifferent,
      });
    } else {
      setAlerts({
        ...alerts,
        password_confirmation: "",
      });
    }
  };

  const handleBlur = (datas) => {
    let { value, id } = datas;
    const newAlerts = { ...alerts };

    value === ""
      ? (newAlerts[id] = alertMessages.isEmpty)
      : (newAlerts[id] = "");

    setAlerts(newAlerts);
  };

  return {
    userDatas,
    alerts,
    // setUserdatas,
    // setAlerts,
    handleInput: (datas) => handleInput(datas),
    handleBlur: (datas) => handleBlur(datas),
  };
};

export default useFormAnalysis;
