import * as yup from "yup";

const userCityDto = yup.object().shape({
  userId: yup.number().required(),
  cityId: yup.number().required(),
});

export default userCityDto;
