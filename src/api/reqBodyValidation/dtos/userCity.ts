const yup = require("yup");

const packageNetworkDto = yup.object().shape({
  packageId: yup.number().required(),
  networkId: yup.number().required(),
});

export default packageNetworkDto;
