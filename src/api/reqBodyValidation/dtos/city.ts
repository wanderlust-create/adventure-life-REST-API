import * as yup from "yup";

const cityDto = yup.object().shape({
  name: yup.string().trim().required(),
  country: yup.string().trim().required(),
});

export default cityDto;
