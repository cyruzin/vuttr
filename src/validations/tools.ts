import * as yup from 'yup';

export const toolsSchema = yup.object().shape({
  title: yup.string().min(5).required(),
  link: yup.string().required(),
  description: yup.string().min(10).required(),
  tags: yup.string().required(),
});
