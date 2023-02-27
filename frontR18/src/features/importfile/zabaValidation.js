import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	kategorija: yup.string().required(),
});
