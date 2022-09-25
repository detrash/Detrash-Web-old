import classNames from 'classnames';
import { Form, FormikProps } from 'formik';
import * as R from 'ramda';
import { USER_ROLE_TYPES } from 'src/utils/constants';
import { UserRegistrationSchema } from 'src/utils/YupSchema';
import Input from '../Input';
import Radio from '../Radio';

interface RegisterUserProps extends FormikProps<UserRegistrationSchema> {
  isCreatingUser: boolean;
}

const RegisterUser: React.FC<RegisterUserProps> = ({
  errors,
  isCreatingUser,
  values,
  setFieldValue,
}) => {
  return (
    <Form className="flex flex-col flex-1 gap-4 sm:gap-12">
      <section className="mb-3 sm:m-0">
        <h2 className="text-2xl sm:text-3xl mb-1 text-gray-800 font-bold antialiased leading-relaxed">
          Complete your profile information
        </h2>
        <p className="text-sm text-gray-600">
          In order to use DeTrash App, please fill the data below.
        </p>
      </section>

      <section className="grid grid-cols-6 gap-3">
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="Preferred Name"
            name="name"
            placeholder="Type your name"
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="Phone Number"
            name="phoneNumber"
            placeholder="Type your phone number"
            required
          />
        </div>
      </section>

      <section>
        <h2 className="text-sm pb-1 uppercase font-bold mb-4 border-b-[1px]">
          Select your profile type:
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {USER_ROLE_TYPES.map((userType) => (
            <Radio
              key={userType.key}
              id={userType.key}
              setValue={(value) => setFieldValue('profileType', value)}
              value={userType.value}
              isActive={userType.key === values.profileType}
            />
          ))}
        </div>
      </section>

      <div className="flex items-end justify-center mt-auto">
        <button
          type="submit"
          disabled={!R.isEmpty(errors)}
          className={classNames(
            'btn btn-primary text-white no-animation w-full sm:w-auto',
            {
              'loading btn-disabled': isCreatingUser,
            }
          )}
        >
          {isCreatingUser ? 'Creating user... ' : 'Confirm'}
        </button>
      </div>
    </Form>
  );
};

export default RegisterUser;
