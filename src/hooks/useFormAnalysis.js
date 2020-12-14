import { useState } from "react";

const useFormAnalysis = (formDataObj, alertMessages) => {
  const [datas, setDatas] = useState(formDataObj);

  const [alerts, setAlerts] = useState(formDataObj);

  const handleInput = (val) => {
    let { value, id } = val;
    const newDatas = { ...datas };
    newDatas[id] = value;
    setDatas({ ...newDatas });

    if (datas.password !== datas.password_confirmation) {
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

  const handleBlur = (val) => {
    let { value, id } = val;
    const newAlerts = { ...alerts };

    value === ""
      ? (newAlerts[id] = alertMessages.isEmpty)
      : (newAlerts[id] = "");

    setAlerts(newAlerts);
  };

  return {
    datas,
    alerts,
    handleInput: (datas) => handleInput(datas),
    handleBlur: (datas) => handleBlur(datas),
  };
};

export default useFormAnalysis;
