import * as yup from "yup";

const userDto = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
});

export default userDto;
