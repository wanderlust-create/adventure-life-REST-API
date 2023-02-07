import * as yup from "yup";

const eventDto = yup.object().shape({
  cityId: yup.number().required(),
  title: yup.string().required(),
});

export default eventDto;
