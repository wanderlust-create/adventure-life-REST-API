import setupDb from "../loaders/dbSetup";

module.exports = async () => {
  await setupDb.destroy();
};
