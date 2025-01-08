import { Button, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type ForgotPasswordProps = {
  logo: string;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ logo }) => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
  };

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div>
        <h1 className="text-green-500 text-4xl font-bold">{logo}</h1>
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit} className="pt-3">
          <Stack gap="4" width={300}>
            <Input
              placeholder="Email"
              variant="subtle"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="bg-green-500" rounded={20}>
              Send Intruction
            </Button>
          </Stack>
          <p className="text-sm">
            Already have account?
            <Link to="/login" className="text-green-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
