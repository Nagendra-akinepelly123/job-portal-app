export const testpost = (req, res) => {
  const { name: userName, role = " Web Developer" } = req.body;
  res
    .status(200)
    .send(
      `Hi!${userName} welcome to Job Portal , Recommend jobs for you ${role}`
    );
};
