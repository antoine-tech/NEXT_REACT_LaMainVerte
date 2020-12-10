import API from "../sevices/index";

const getTestimonies = async () => {
  const response = await API.find("/testimonies", false).then((res) =>
    res.json()
  );

  return response;
};

export { getTestimonies };
