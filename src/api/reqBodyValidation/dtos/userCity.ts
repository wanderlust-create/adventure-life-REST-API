import * as yup from "yup";

const userCityDto = yup.object().shape({
  userId: yup.string().required(),
  cityId: yup.string().required(),
});

export default userCityDto;
